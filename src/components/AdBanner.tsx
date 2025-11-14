import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      gradient: "from-blue-600 to-blue-400",
      icon: "💳"
    },
    {
      brand: "טסלה ישראל",
      title: "Model 3 החדשה",
      subtitle: "טכנולוגיה חשמלית מתקדמת",
      cta: "הזמינו נסיעת מבחן",
      gradient: "from-gray-800 to-gray-600",
      icon: "⚡"
    },
    {
      brand: "פרטנר",
      title: "חבילת אינטרנט אולטימט",
      subtitle: "1000MB ללא הגבלה",
      cta: "הצטרפו עכשיו",
      gradient: "from-orange-600 to-orange-400",
      icon: "📱"
    },
    {
      brand: "סופר-פארם",
      title: "מבצע שבועי",
      subtitle: "20% הנחה על מוצרי טיפוח",
      cta: "לחנות המקוונת",
      gradient: "from-green-600 to-green-400",
      icon: "🛍️"
    },
    {
      brand: "אל על",
      title: "טיסות לאירופה",
      subtitle: "החל מ-₪999 כולל מזוודה",
      cta: "הזמינו עכשיו",
      gradient: "from-blue-700 to-sky-500",
      icon: "✈️"
    },
    {
      brand: "איקאה",
      title: "קולקציית 2024",
      subtitle: "רהיטים חכמים לבית מודרני",
      cta: "גלו עכשיו",
      gradient: "from-yellow-600 to-yellow-400",
      icon: "🏠"
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
    <Card className={`${getHeight()} w-full overflow-hidden group hover:shadow-xl transition-all duration-500 cursor-pointer border-0`}>
      <div className={`h-full w-full bg-gradient-to-br ${ad.gradient} relative flex items-center justify-center p-6`}>
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content */}
        <div className={`relative z-10 ${type === "vertical" ? "text-center space-y-8" : "flex items-center justify-between w-full gap-6"}`}>
          {type === "vertical" ? (
            <>
              <div className="text-6xl mb-4 animate-pulse">{ad.icon}</div>
              <div className="space-y-4">
                <div className="text-white/90 text-sm font-medium tracking-wider">{ad.brand}</div>
                <h3 className="text-white text-3xl font-bold leading-tight">{ad.title}</h3>
                <p className="text-white/90 text-lg">{ad.subtitle}</p>
              </div>
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-white/90 font-bold px-8 py-6 text-lg mt-6 shadow-2xl"
              >
                {ad.cta}
              </Button>
              <div className="absolute top-3 left-3 text-white/60 text-xs">פרסומת</div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4 flex-1">
                <div className="text-5xl">{ad.icon}</div>
                <div className="space-y-1">
                  <div className="text-white/80 text-xs font-medium">{ad.brand}</div>
                  <h3 className="text-white text-2xl font-bold">{ad.title}</h3>
                  <p className="text-white/90 text-sm">{ad.subtitle}</p>
                </div>
              </div>
              <Button 
                size={size === "large" ? "lg" : "default"}
                className="bg-white text-gray-900 hover:bg-white/90 font-bold shadow-xl whitespace-nowrap"
              >
                {ad.cta}
              </Button>
              <div className="absolute top-2 left-2 text-white/50 text-[10px]">פרסומת</div>
            </>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
      </div>
    </Card>
  );
};

export default AdBanner;
