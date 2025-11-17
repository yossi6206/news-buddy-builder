import { useParams, Link } from "react-router-dom";
import { ArrowRight, Share2, Bookmark, Clock, User as UserIcon, Edit, Loader2 } from "lucide-react";
import NewsHeader from "@/components/NewsHeader";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import NewsArticle from "@/components/NewsArticle";
import NewsFooter from "@/components/NewsFooter";
import CommentsSection from "@/components/CommentsSection";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { User } from "@supabase/supabase-js";
import { format } from "date-fns";
import { he } from "date-fns/locale";

interface ArticleData {
  id: string;
  title: string;
  subtitle: string | null;
  content: string;
  image_url: string | null;
  category: string;
  author_id: string;
  author_name?: string;
  created_at: string;
  published_at?: string;
  is_featured: boolean;
  profiles?: {
    full_name: string | null;
  };
}

const Article = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const { canManageContent } = useUserRole(user);
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) return;

      try {
        setLoading(true);

        // Load the main article
        const { data: articleData, error: articleError } = await supabase
          .from('articles' as any)
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (articleError) throw articleError;
        
        if (articleData) {
          // Increment views count
          await supabase.rpc('increment_article_views', { _article_id: id });

          // Load author profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', (articleData as any).author_id)
            .maybeSingle();

          const articleWithProfile = {
            ...(articleData as any),
            profiles: profileData || undefined
          };
          setArticle(articleWithProfile);

          // Load related articles from the same category
          const { data: relatedData, error: relatedError } = await supabase
            .from('articles' as any)
            .select('*')
            .eq('category', (articleData as any).category)
            .neq('id', id)
            .order('created_at', { ascending: false })
            .limit(4);

          if (relatedError) throw relatedError;
          if (relatedData) setRelatedArticles(relatedData as any);
        }
      } catch (error) {
        console.error('Error loading article:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NewsHeader />
        <BreakingNewsTicker />
        <div className="container mx-auto px-4 py-20 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <NewsFooter />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <NewsHeader />
        <BreakingNewsTicker />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">הכתבה לא נמצאה</h1>
          <Link to="/" className="text-primary hover:underline">
            חזרה לעמוד הראשי
          </Link>
        </div>
        <NewsFooter />
      </div>
    );
  }

  const formattedDate = format(
    new Date(article.published_at || article.created_at), 
    "d MMMM yyyy, HH:mm", 
    { locale: he }
  );
  const authorName = article.author_name || article.profiles?.full_name || 'כתב ערוץ החדשות';

  return (
    <div className="min-h-screen bg-background">
      <NewsHeader />
      <BreakingNewsTicker />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6 group"
        >
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          <span className="font-medium">חזרה לעמוד הראשי</span>
        </Link>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-primary text-primary-foreground px-4 py-1 text-sm font-bold rounded">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4 animate-fade-in">{article.title}</h1>

            {/* Subtitle */}
            {article.subtitle && (
              <p className="text-xl text-muted-foreground mb-6 animate-fade-in">{article.subtitle}</p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b pb-4 mb-6">
              <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                <span className="font-medium text-foreground">{authorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Share2 className="h-4 w-4" />
                שתף
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                <Bookmark className="h-4 w-4" />
                שמור לקריאה
              </button>
              {canManageContent && (
                <Link to={`/admin/${id}`}>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    ערוך כתבה
                  </Button>
                </Link>
              )}
            </div>

            {/* Article Image */}
            {article.image_url && (
              <div className="relative mb-8 rounded-lg overflow-hidden animate-fade-in">
                <img src={article.image_url} alt={article.title} className="w-full h-[400px] object-cover" />
              </div>
            )}

            {/* Article Body */}
            <div className="prose prose-lg max-w-none mb-12 animate-fade-in">
              <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                {article.content}
              </div>
            </div>

            {/* Comments Section */}
            <CommentsSection articleId={id || ''} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-xl font-bold mb-4">כתבות קשורות</h3>
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <NewsArticle
                      key={relatedArticle.id}
                      articleId={relatedArticle.id}
                      title={relatedArticle.title}
                      image={relatedArticle.image_url || ''}
                      category={relatedArticle.category}
                      tags={[]}
                      authorName={relatedArticle.author_name}
                      publishedAt={relatedArticle.published_at || relatedArticle.created_at}
                      style="compact"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter Section */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 border border-primary/20">
              <h3 className="text-xl font-bold mb-2">הצטרפו לניוזלטר שלנו</h3>
              <p className="text-sm text-muted-foreground mb-4">קבלו עדכונים שבועיים על החדשות החמות ביותר</p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="כתובת אימייל"
                  className="w-full px-4 py-2 rounded-md border border-input bg-background"
                />
                <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors font-medium">
                  הרשמה
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>

      <NewsFooter />
    </div>
  );
};

export default Article;
