import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import bankAd from "@/assets/ads/bank-ad.jpg";
import teslaAd from "@/assets/ads/tesla-ad.jpg";
import partnerAd from "@/assets/ads/partner-ad.jpg";
import superpharmAd from "@/assets/ads/superpharm-ad.jpg";
import elalAd from "@/assets/ads/elal-ad.jpg";
import ikeaAd from "@/assets/ads/ikea-ad.jpg";
import maxstockAd from "@/assets/ads/maxstock-ad.jpg";
import castroAd from "@/assets/ads/castro-ad.jpg";
import foxAd from "@/assets/ads/fox-ad.jpg";
import shufersalAd from "@/assets/ads/shufersal-ad.jpg";
import osheradAd from "@/assets/ads/osherad-ad.jpg";
import cellcomAd from "@/assets/ads/cellcom-ad.jpg";
import bezeqAd from "@/assets/ads/bezeq-ad.jpg";
import ramileviAd from "@/assets/ads/ramilevi-ad.jpg";
import leumiAd from "@/assets/ads/leumi-ad.jpg";
import renaultAd from "@/assets/ads/renault-ad.jpg";
import aromaAd from "@/assets/ads/aroma-ad.jpg";

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
    },
    {
      brand: "מקס סטוק",
      title: "חדש בחנויות",
      subtitle: "מבחר עצום של רהיטים במחירים מיוחדים",
      cta: "קנו עכשיו",
      image: maxstockAd
    },
    {
      brand: "קסטרו",
      title: "קולקציית חורף 2024",
      subtitle: "אופנה עכשווית לכל המשפחה",
      cta: "גלו את הקולקציה",
      image: castroAd
    },
    {
      brand: "פוקס",
      title: "סטייל חדש לעונה",
      subtitle: "מגמות האופנה החמות ביותר",
      cta: "לחנות המקוונת",
      image: foxAd
    },
    {
      brand: "שופרסל",
      title: "טרי מהמשק",
      subtitle: "פירות וירקות טריים במחירים הוגנים",
      cta: "קנו אונליין",
      image: shufersalAd
    },
    {
      brand: "אושר עד",
      title: "מבצעי סוף שבוע",
      subtitle: "חסכו עד 50% על מוצרים נבחרים",
      cta: "למבצעים",
      image: osheradAd
    },
    {
      brand: "סלקום",
      title: "רשת 5G מתקדמת",
      subtitle: "מהירות גלישה מירבית בכל מקום",
      cta: "הצטרפו היום",
      image: cellcomAd
    },
    {
      brand: "בזק",
      title: "אינטרנט סיבים אופטיים",
      subtitle: "מהירות עד 1GB לבית שלכם",
      cta: "להצעה מיוחדת",
      image: bezeqAd
    },
    {
      brand: "רמי לוי",
      title: "קניות חכמות",
      subtitle: "המחירים הטובים ביותר בשוק",
      cta: "לחנות המקוונת",
      image: ramileviAd
    },
    {
      brand: "בנק לאומי",
      title: "בנקאות דיגיטלית",
      subtitle: "נהל את הכסף שלך בקליק",
      cta: "פתח חשבון",
      image: leumiAd
    },
    {
      brand: "רנו ישראל",
      title: "דגמי 2024 החדשים",
      subtitle: "עיצוב מודרני וטכנולוגיה מתקדמת",
      cta: "הזמן נסיעת מבחן",
      image: renaultAd
    },
    {
      brand: "ארומה",
      title: "קפה איכותי",
      subtitle: "הקפה הטוב בישראל",
      cta: "למועדון לקוחות",
      image: aromaAd
    }
  ];

  // Select ad based on type and size with rotation
  const getAdIndex = () => {
    const now = Date.now();
    const rotationInterval = 5000; // Rotate every 5 seconds
    const rotationIndex = Math.floor(now / rotationInterval) % ads.length;
    
    if (type === "vertical") {
      return rotationIndex % ads.length;
    }
    if (size === "large") {
      return (rotationIndex + 1) % ads.length;
    }
    if (size === "small") {
      return (rotationIndex + 2) % ads.length;
    }
    return (rotationIndex + 3) % ads.length;
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
