import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface AdBannerProps {
  type?: "horizontal" | "vertical";
  size?: "small" | "medium" | "large";
  position?: string; // Filter by position: 'sidebar', 'top', 'bottom', 'content'
}

interface Ad {
  id: string;
  title: string;
  image_url: string;
  link_url: string | null;
  position: string;
  is_active: boolean;
  order_index: number;
}

const AdBanner = ({ type = "horizontal", size = "medium", position = "sidebar" }: AdBannerProps) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    fetchAds();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('ads_banner')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ads'
        },
        () => {
          fetchAds();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [position]);

  useEffect(() => {
    // Rotate ads every 10 seconds
    if (ads.length > 1) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % ads.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [ads.length]);

  const fetchAds = async () => {
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .eq('is_active', true)
      .eq('position', position)
      .order('order_index', { ascending: true });

    if (!error && data && data.length > 0) {
      setAds(data);
    }
  };

  const getHeight = () => {
    if (type === "vertical") return "h-[600px]";
    switch (size) {
      case "small":
        return "h-[100px]";
      case "large":
        return "h-[250px]";
      default:
        return "h-[150px]";
    }
  };

  if (ads.length === 0) {
    return null; // Don't show banner if no ads available
  }

  const currentAd = ads[currentAdIndex];

  const handleAdClick = () => {
    if (currentAd.link_url) {
      window.open(currentAd.link_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card 
      className={`${getHeight()} w-full overflow-hidden group hover:shadow-2xl transition-all duration-500 ${currentAd.link_url ? 'cursor-pointer' : ''} border-0 relative`}
      onClick={handleAdClick}
    >
      {/* Background Image */}
      <img 
        src={currentAd.image_url} 
        alt={currentAd.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      
      {/* Subtle Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      
      {/* Content */}
      <div className={`relative z-10 h-full ${type === "vertical" ? "flex flex-col justify-end p-8 space-y-4" : "flex items-center justify-between p-6"}`}>
        {type === "vertical" ? (
          <>
            <div className="space-y-3">
              <h3 className="text-white text-3xl font-bold leading-tight drop-shadow-lg">{currentAd.title}</h3>
            </div>
            {currentAd.link_url && (
              <Button 
                size="lg" 
                className="bg-white text-foreground hover:bg-white/95 font-bold w-full shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-[1.02]"
              >
                לפרטים נוספים
              </Button>
            )}
          </>
        ) : (
          <>
            <div className="flex-1 space-y-2">
              <h3 className="text-white text-xl font-bold leading-tight drop-shadow-lg">{currentAd.title}</h3>
            </div>
            {currentAd.link_url && (
              <Button 
                size={size === "large" ? "lg" : "default"}
                className="bg-white text-foreground hover:bg-white/95 font-bold shadow-2xl whitespace-nowrap hover:shadow-white/20 transition-all duration-300 hover:scale-[1.02]"
              >
                לפרטים נוספים
              </Button>
            )}
          </>
        )}
      </div>

      {/* Ad indicator dots if multiple ads */}
      {ads.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {ads.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentAdIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentAdIndex 
                  ? 'bg-white w-4' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`עבור לפרסומת ${index + 1}`}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default AdBanner;
