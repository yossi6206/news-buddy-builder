import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import bankAd from "@/assets/ads/bank-ad.jpg";
import teslaAd from "@/assets/ads/tesla-ad.jpg";
import partnerAd from "@/assets/ads/partner-ad.jpg";
import superpharmAd from "@/assets/ads/superpharm-ad.jpg";
import elalAd from "@/assets/ads/elal-ad.jpg";
import ikeaAd from "@/assets/ads/ikea-ad.jpg";

interface AdBannerProps {
  type?: "horizontal" | "vertical";
  size?: "small" | "medium" | "large";
}

const AdBanner = ({ type = "horizontal", size = "medium" }: AdBannerProps) => {
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

  // Different ad content variations
  const ads = [
    {
      brand: "בנק הפועלים",
      title: "משכנתא חכמה",
      subtitle: "ריבית מיוחדת ל-3 שנים הראשונות",
      cta: "לפרטים נוספים",
      image: bankAd
    },
    {
      brand: "טסלה ישראל",
      title: "Model 3 החדשה",
      subtitle: "טכנולוגיה חשמלית מתקדמת",
      cta: "הזמינו נסיעת מבחן",
      image: teslaAd
    },
    {
      brand: "פרטנר",
      title: "חבילת אינטרנט אולטימט",
      subtitle: "1000MB ללא הגבלה",
      cta: "הצטרפו עכשיו",
      image: partnerAd
    },
    {
      brand: "סופר-פארם",
      title: "מבצע שבועי",
      subtitle: "20% הנחה על מוצרי טיפוח",
      cta: "לחנות המקוונת",
      image: superpharmAd
    },
    {
      brand: "אל על",
      title: "טיסות לאירופה",
      subtitle: "החל מ-₪999 כולל מזוודה",
      cta: "הזמינו עכשיו",
      image: elalAd
    },
    {
      brand: "איקאה",
      title: "קולקציית 2024",
      subtitle: "רהיטים חכמים לבית מודרני",
      cta: "גלו עכשיו",
      image: ikeaAd
    }
  ];

  // Select ad based on type and size
  const getAdIndex = () => {
    if (type === "vertical") return size === "large" ? 0 : 2;
    if (size === "large") return 1;
    if (size === "small") return 3;
    return 4;
  };

  const ad = ads[getAdIndex()];

  return (
    <Card className={`${getHeight()} w-full overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 relative`}>
      {/* Background Image */}
      <img 
        src={ad.image} 
        alt={ad.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      
      {/* Content */}
      <div className={`relative z-10 h-full ${type === "vertical" ? "flex flex-col justify-end p-6 space-y-4" : "flex items-center justify-between p-6"}`}>
        {type === "vertical" ? (
          <>
            <div className="space-y-3">
              <div className="text-white/90 text-xs font-medium tracking-wider uppercase">{ad.brand}</div>
              <h3 className="text-white text-2xl font-bold leading-tight">{ad.title}</h3>
              <p className="text-white/90 text-base">{ad.subtitle}</p>
            </div>
            <Button 
              size="lg" 
              className="bg-white text-foreground hover:bg-white/90 font-bold w-full shadow-lg"
            >
              {ad.cta}
            </Button>
            <div className="absolute top-3 right-3 bg-black/50 text-white/90 text-[10px] px-2 py-1 rounded">פרסומת</div>
          </>
        ) : (
          <>
            <div className="flex-1 space-y-1">
              <div className="text-white/80 text-[10px] font-medium uppercase tracking-wider">{ad.brand}</div>
              <h3 className="text-white text-xl font-bold leading-tight">{ad.title}</h3>
              <p className="text-white/90 text-sm">{ad.subtitle}</p>
            </div>
            <Button 
              size={size === "large" ? "lg" : "default"}
              className="bg-white text-foreground hover:bg-white/90 font-bold shadow-lg whitespace-nowrap"
            >
              {ad.cta}
            </Button>
            <div className="absolute top-2 right-2 bg-black/50 text-white/90 text-[9px] px-2 py-0.5 rounded">פרסומת</div>
          </>
        )}
      </div>
    </Card>
  );
};

export default AdBanner;
