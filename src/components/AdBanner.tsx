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
    <Card className={`${getHeight()} w-full overflow-hidden group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 relative`}>
      {/* Background Image */}
      <img 
        src={ad.image} 
        alt={ad.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      
      {/* Subtle Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      
      {/* Content */}
      <div className={`relative z-10 h-full ${type === "vertical" ? "flex flex-col justify-end p-8 space-y-4" : "flex items-center justify-between p-6"}`}>
        {type === "vertical" ? (
          <>
            <div className="space-y-3">
              <div className="text-white/95 text-sm font-semibold tracking-wide uppercase backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full w-fit">{ad.brand}</div>
              <h3 className="text-white text-3xl font-bold leading-tight drop-shadow-lg">{ad.title}</h3>
              <p className="text-white/95 text-lg drop-shadow-md">{ad.subtitle}</p>
            </div>
            <Button 
              size="lg" 
              className="bg-white text-foreground hover:bg-white/95 font-bold w-full shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-[1.02]"
            >
              {ad.cta}
            </Button>
          </>
        ) : (
          <>
            <div className="flex-1 space-y-2">
              <div className="text-white/95 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm bg-white/10 px-2.5 py-0.5 rounded-full w-fit">{ad.brand}</div>
              <h3 className="text-white text-xl font-bold leading-tight drop-shadow-lg">{ad.title}</h3>
              <p className="text-white/95 text-sm drop-shadow-md">{ad.subtitle}</p>
            </div>
            <Button 
              size={size === "large" ? "lg" : "default"}
              className="bg-white text-foreground hover:bg-white/95 font-bold shadow-2xl whitespace-nowrap hover:shadow-white/20 transition-all duration-300 hover:scale-[1.02]"
            >
              {ad.cta}
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default AdBanner;
