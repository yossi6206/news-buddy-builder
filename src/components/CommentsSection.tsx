import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Trash2, User as UserIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { he } from "date-fns/locale";
import type { User } from "@supabase/supabase-js";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

interface CommentsSectionProps {
  articleId: string;
}

const CommentsSection = ({ articleId }: CommentsSectionProps) => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Get current user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    // Setup auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchComments();

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`comments-${articleId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `article_id=eq.${articleId}`,
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [articleId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .eq('article_id', articleId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error: any) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "נדרשת התחברות",
        description: "עליך להתחבר כדי להגיב",
      });
      return;
    }

    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          article_id: articleId,
          user_id: user.id,
          content: newComment.trim(),
        });

      if (error) throw error;

      setNewComment("");
      toast({
        title: "התגובה נוספה!",
        description: "התגובה שלך פורסמה בהצלחה",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "שגיאה",
        description: error.message || "לא ניתן להוסיף תגובה",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      toast({
        title: "התגובה נמחקה",
        description: "התגובה הוסרה בהצלחה",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "שגיאה",
        description: error.message || "לא ניתן למחוק תגובה",
      });
    }
  };

  return (
    <div className="mt-12 pt-8 border-t">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageCircle className="h-6 w-6" />
        תגובות ({comments.length})
      </h3>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="כתוב תגובה..."
            className="mb-3 min-h-[100px]"
            disabled={submitting}
          />
          <Button type="submit" disabled={submitting || !newComment.trim()}>
            {submitting ? "מפרסם..." : "פרסם תגובה"}
          </Button>
        </form>
      ) : (
        <div className="bg-muted rounded-xl p-6 mb-8 text-center">
          <p className="mb-4">התחבר כדי להגיב על הכתבה</p>
          <Button onClick={() => window.location.href = '/auth'}>
            התחבר או הרשם
          </Button>
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <div className="text-center py-8 text-muted-foreground">טוען תגובות...</div>
      ) : comments.length === 0 ? (
        <div className="bg-muted rounded-xl p-6 text-center text-muted-foreground">
          <p>אין תגובות עדיין. היה הראשון להגיב!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-card border rounded-xl p-4 animate-fade-in">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {comment.profiles?.avatar_url ? (
                      <img
                        src={comment.profiles.avatar_url}
                        alt={comment.profiles.full_name || "User"}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <UserIcon className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {comment.profiles?.full_name || "משתמש אנונימי"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.created_at), {
                        addSuffix: true,
                        locale: he,
                      })}
                    </p>
                  </div>
                </div>
                {user && user.id === comment.user_id && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(comment.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
