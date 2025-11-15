import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface BreakingNewsItem {
  id: string;
  content: string;
  is_active: boolean;
  order_index: number;
}

const BreakingNewsManager = () => {
  const { toast } = useToast();
  const [breakingNews, setBreakingNews] = useState<BreakingNewsItem[]>([]);
  const [newContent, setNewContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBreakingNews();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('breaking_news_admin')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'breaking_news'
        },
        () => {
          fetchBreakingNews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBreakingNews = async () => {
    const { data, error } = await supabase
      .from('breaking_news')
      .select('*')
      .order('order_index', { ascending: true });

    if (!error && data) {
      setBreakingNews(data);
    }
  };

  const addBreakingNews = async () => {
    if (!newContent.trim()) {
      toast({
        title: 'שגיאה',
        description: 'יש להזין תוכן',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    const maxOrder = Math.max(...breakingNews.map(item => item.order_index), -1);
    
    const { error } = await supabase
      .from('breaking_news')
      .insert({
        content: newContent.trim(),
        is_active: true,
        order_index: maxOrder + 1,
      });

    if (error) {
      toast({
        title: 'שגיאה',
        description: 'שגיאה בהוספת חדשה שוברת',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'הצלחה',
        description: 'חדשה שוברת נוספה בהצלחה',
      });
      setNewContent('');
    }
    
    setLoading(false);
  };

  const deleteBreakingNews = async (id: string) => {
    const { error } = await supabase
      .from('breaking_news')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'שגיאה',
        description: 'שגיאה במחיקת חדשה',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'הצלחה',
        description: 'חדשה נמחקה בהצלחה',
      });
    }
  };

  const toggleActive = async (id: string, currentState: boolean) => {
    const { error } = await supabase
      .from('breaking_news')
      .update({ is_active: !currentState })
      .eq('id', id);

    if (error) {
      toast({
        title: 'שגיאה',
        description: 'שגיאה בעדכון סטטוס',
        variant: 'destructive',
      });
    }
  };

  const moveItem = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = breakingNews.findIndex(item => item.id === id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= breakingNews.length) return;

    const currentItem = breakingNews[currentIndex];
    const targetItem = breakingNews[targetIndex];

    // Swap order_index
    await supabase
      .from('breaking_news')
      .update({ order_index: targetItem.order_index })
      .eq('id', currentItem.id);

    await supabase
      .from('breaking_news')
      .update({ order_index: currentItem.order_index })
      .eq('id', targetItem.id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ניהול חדשות שוברות</CardTitle>
        <CardDescription>הוסף, ערוך ומחק חדשות שוברות המופיעות ברצועה העליונה</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="הזן תוכן חדשה שוברת..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addBreakingNews();
              }
            }}
          />
          <Button onClick={addBreakingNews} disabled={loading}>
            <Plus className="ml-2 h-4 w-4" />
            הוסף
          </Button>
        </div>

        <div className="space-y-2">
          {breakingNews.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-center gap-2 p-3 rounded-lg border ${
                item.is_active ? 'bg-background' : 'bg-muted opacity-60'
              }`}
            >
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveItem(item.id, 'up')}
                  disabled={index === 0}
                  className="h-6 w-6 p-0"
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveItem(item.id, 'down')}
                  disabled={index === breakingNews.length - 1}
                  className="h-6 w-6 p-0"
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
              </div>
              <p className="flex-1 text-sm">{item.content}</p>
              <Button
                variant={item.is_active ? 'outline' : 'default'}
                size="sm"
                onClick={() => toggleActive(item.id, item.is_active)}
              >
                {item.is_active ? 'השבת' : 'הפעל'}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteBreakingNews(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {breakingNews.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              אין חדשות שוברות כרגע
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BreakingNewsManager;
