import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface NewsArticleProps {
  title: string;
  image: string;
  category?: string;
  tags?: string[];
  className?: string;
  articleId?: string;
  id?: string;
  style?: "compact" | "default";
  authorName?: string;
  publishedAt?: string;
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    פוליטי: "bg-[hsl(var(--category-politics))]",
    ביטחוני: "bg-[hsl(var(--category-security))]",
    בעולם: "bg-[hsl(var(--category-world))]",
    כלכלה: "bg-[hsl(var(--category-economy))]",
    מדעי: "bg-[hsl(var(--category-tech))]",
    ספורט: "bg-[hsl(var(--category-sport))]",
  };
  return colors[category || ""] || "bg-primary";
};

const NewsArticle = ({ 
  title, 
  image, 
  category, 
  tags = [],
  className,
  articleId,
  id,
  style = "default",
  authorName = "כתב ערוץ החדשות",
  publishedAt
}: NewsArticleProps) => {
  const finalId = articleId || id || "1";
  const isCompact = style === "compact";
  
  // Calculate time ago
  const getTimeAgo = (date: string | undefined) => {
    if (!date) return "22:10";
    
    const now = new Date();
    const publishDate = new Date(date);
    const diffInMinutes = Math.floor((now.getTime() - publishDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return diffInMinutes <= 1 ? "לפני דקה" : `לפני ${diffInMinutes} דקות`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      // Show time in HH:MM format for today
      return publishDate.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    return diffInDays === 1 ? "אתמול" : `לפני ${diffInDays} ימים`;
  };
  
  if (isCompact) {
    return (
      <Link to={`/article/${articleId}`} className={cn("group cursor-pointer block", className)}>
        <div className="bg-card rounded-xl overflow-hidden hover:bg-muted/30 transition-colors">
          <div className="relative overflow-hidden rounded-t-xl">
            <img
              src={image}
              alt={title}
              className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {category && (
            <span className={cn(
              getCategoryColor(category),
              "absolute bottom-2 right-2 text-white px-2 py-1 text-[10px] font-bold rounded-lg"
            )}>
                {category}
              </span>
            )}
          </div>
          <div className="p-3">
            <h3 className="text-sm font-bold leading-tight group-hover:text-primary transition-colors line-clamp-3 mb-2">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="text-red-600 font-medium">{getTimeAgo(publishedAt)}</span>
              <span>|</span>
              <span>{authorName}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  return (
    <Link to={`/article/${articleId}`} className={cn("group cursor-pointer animate-fade-in block", className)}>
      <div className="bg-card rounded-xl overflow-hidden article-hover" style={{ boxShadow: 'var(--shadow-article)' }}>
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {category && (
            <span className={cn(
              getCategoryColor(category),
              "absolute top-3 right-3 text-white px-3 py-1 text-xs font-bold rounded-lg shadow-md"
            )}>
              {category}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-3">
            {title}
          </h3>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-red-600 font-medium">{getTimeAgo(publishedAt)}</span>
              <span>•</span>
              <span>{authorName}</span>
            </div>
            <span className="text-xs text-muted-foreground">👁 1.2K</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsArticle;
