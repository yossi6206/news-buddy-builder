import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { MessageCircle, Play } from "lucide-react";

interface NewsCardProps {
  title: string;
  subtitle?: string;
  image: string;
  category?: string;
  articleId?: string;
  id?: string;
  authorName?: string;
  publishedAt?: string;
  commentsCount?: number;
  isVideo?: boolean;
  className?: string;
}

const getCategoryBadgeColor = (category: string) => {
  const colors: Record<string, string> = {
    פוליטי: "bg-[#d32f2f]",
    ביטחוני: "bg-[#c62828]",
    בעולם: "bg-[#2e7d32]",
    כלכלה: "bg-[#7b1fa2]",
    מדעי: "bg-[#0097a7]",
    ספורט: "bg-[#f57c00]",
    טכנולוגיה: "bg-[#1976d2]",
  };
  return colors[category || ""] || "bg-[#d32f2f]";
};

const NewsCard = ({
  title,
  subtitle,
  image,
  category,
  articleId,
  id,
  authorName = "כתב ערוץ החדשות",
  publishedAt,
  commentsCount = 0,
  isVideo = false,
  className,
}: NewsCardProps) => {
  const finalId = articleId || id || "1";

  // Calculate time ago
  const getTimeAgo = (date: string | undefined) => {
    if (!date) return "22:10";

    const now = new Date();
    const publishDate = new Date(date);
    const diffInMinutes = Math.floor(
      (now.getTime() - publishDate.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) {
      return diffInMinutes <= 1 ? "לפני דקה" : `לפני ${diffInMinutes} דקות`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return publishDate.toLocaleTimeString("he-IL", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return diffInDays === 1 ? "אתמול" : `לפני ${diffInDays} ימים`;
  };

  return (
    <Link
      to={`/article/${finalId}`}
      className={cn("group cursor-pointer block", className)}
    >
      <article className="h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-xl">
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Category Badge */}
          {category && (
            <div className={cn(
              "absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold text-white rounded",
              getCategoryBadgeColor(category)
            )}>
              {category}
            </div>
          )}

          {/* Video Play Button Overlay */}
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-black/80 transition-all duration-300 group-hover:scale-110">
                <Play className="w-6 h-6 text-white fill-white mr-[-2px]" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col pt-4">
          {/* Title */}
          <h3 className="text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {title}
          </h3>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
              {subtitle}
            </p>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer Meta */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3 pt-3 border-t border-border/50">
            {commentsCount > 0 && (
              <>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{commentsCount}</span>
                </div>
                <span className="text-border">|</span>
              </>
            )}
            <span className="font-medium">{getTimeAgo(publishedAt)}</span>
            <span className="text-border">|</span>
            <span>{authorName}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NewsCard;
