import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ReporterUpdate {
  id: string;
  author_name: string;
  title: string;
  time: string;
  is_live: boolean;
  avatar_url: string | null;
}

const UpdatesSidebar = () => {
  const [updates, setUpdates] = useState<ReporterUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpdates();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('reporter_updates_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reporter_updates',
        },
        () => {
          fetchUpdates();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchUpdates = async () => {
    try {
      const { data, error } = await supabase
        .from('reporter_updates')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true })
        .limit(10);

      if (error) throw error;
      setUpdates((data as any) || []);
    } catch (error) {
      console.error('Error fetching updates:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <aside className="w-[320px] bg-card flex-shrink-0 hidden lg:block sticky top-20 h-fit border border-border rounded-xl">
        <div className="p-6 text-center text-muted-foreground">טוען...</div>
      </aside>
    );
  }

  return (
    <aside className="w-[320px] bg-card flex-shrink-0 hidden lg:block sticky top-20 h-fit border border-border rounded-xl">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-3 flex items-center gap-2 rounded-t-xl">
        <div className="bg-white text-primary rounded-lg p-1">
          <Clock className="h-4 w-4" />
        </div>
        <h2 className="text-base font-bold">איש הכתבים</h2>
      </div>

      {/* Updates List */}
      <div className="p-3 space-y-3 max-h-[600px] overflow-y-auto">
        {updates.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm p-4">
            אין עדכונים זמינים
          </div>
        ) : (
          updates.map((update) => (
            <div
              key={update.id}
              className="border-b border-border pb-3 last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0 overflow-hidden">
                  {update.avatar_url ? (
                    <img 
                      src={update.avatar_url} 
                      alt={update.author_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary">{update.author_name}</span>
                    {update.is_live && (
                      <span className="flex items-center gap-1 text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded-lg font-bold">
                        דוח חיוני
                      </span>
                    )}
                  </div>
                  <p className="text-xs leading-snug text-foreground">{update.title}</p>
                  <span className="text-[10px] text-red-600 font-medium mt-1 inline-block">{update.time}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Footer Button */}
      <div className="p-3 border-t border-border">
        <button className="w-full bg-primary text-primary-foreground font-bold py-2 text-sm rounded-xl hover:bg-primary/90 transition-colors">
          לכל ההודעות
        </button>
      </div>
    </aside>
  );
};

export default UpdatesSidebar;
