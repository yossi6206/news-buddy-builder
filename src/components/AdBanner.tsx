import { Card } from "@/components/ui/card";

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

  return (
    <Card className={`${getHeight()} w-full bg-muted/30 border-2 border-dashed border-muted-foreground/20 flex items-center justify-center relative overflow-hidden group hover:border-muted-foreground/40 transition-all duration-300`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="text-center space-y-2 z-10 px-4">
        <div className="text-xs font-medium text-muted-foreground/60 tracking-wider">
          פרסומת
        </div>
        <div className="text-sm text-muted-foreground/80 max-w-xs">
          מקום לפרסומת שלך
        </div>
        {type === "vertical" && (
          <div className="pt-4 text-xs text-muted-foreground/60">
            {size === "large" ? "300x600" : "160x600"}
          </div>
        )}
        {type === "horizontal" && (
          <div className="text-xs text-muted-foreground/60">
            {size === "large" ? "970x250" : size === "small" ? "728x90" : "728x90"}
          </div>
        )}
      </div>

      {/* Decorative corners */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-muted-foreground/20" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-muted-foreground/20" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-muted-foreground/20" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-muted-foreground/20" />
    </Card>
  );
};

export default AdBanner;
