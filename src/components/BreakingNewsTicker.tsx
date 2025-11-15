import { AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const BreakingNewsTicker = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [breakingNews, setBreakingNews] = useState<string[]>([]);

  // Fetch breaking news from database
  useEffect(() => {
    const fetchBreakingNews = async () => {
      const { data, error } = await supabase
        .from('breaking_news')
        .select('content')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (!error && data) {
        setBreakingNews(data.map(item => item.content));
      }
    };

    fetchBreakingNews();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('breaking_news_changes')
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

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getFormattedTime = () => {
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className="bg-[hsl(var(--breaking-news))] text-white overflow-hidden">
      <div className="container mx-auto px-4 py-2 flex items-center gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-bold text-sm">{getFormattedTime()}</span>
          <span className="text-sm">|</span>
          <AlertCircle className="h-4 w-4 animate-pulse-slow" />
          <span className="font-bold text-sm">ברוח טרנס</span>
        </div>
        <div className="flex-1 overflow-hidden">
          {breakingNews.length > 0 ? (
            <div className="flex gap-8 animate-marquee">
              {breakingNews.map((news, index) => (
                <span key={index} className="text-sm whitespace-nowrap">
                  • {news}
                </span>
              ))}
              {breakingNews.map((news, index) => (
                <span key={`dup-${index}`} className="text-sm whitespace-nowrap">
                  • {news}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-sm">אין חדשות שוברות כרגע</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;
