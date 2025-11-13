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
  style = "default"
}: NewsArticleProps) => {
  const finalId = articleId || id || "1";
  const isCompact = style === "compact";
  
  if (isCompact) {
    return (
      <Link to={`/article/${articleId}`} className={cn("group cursor-pointer block", className)}>
        <div className="bg-card overflow-hidden hover:bg-muted/30 transition-colors">
          <div className="relative overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {category && (
              <span className={cn(
                getCategoryColor(category),
                "absolute bottom-2 right-2 text-white px-2 py-1 text-[10px] font-bold"
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
              <span className="text-red-600 font-medium">22:10</span>
              <span>|</span>
              <span>נדב משלבי</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  return (
    <Link to={`/article/${articleId}`} className={cn("group cursor-pointer animate-fade-in block", className)}>
      <div className="bg-card rounded-lg overflow-hidden article-hover" style={{ boxShadow: 'var(--shadow-article)' }}>
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {category && (
            <span className={cn(
              getCategoryColor(category),
              "absolute top-3 right-3 text-white px-3 py-1 text-xs font-bold rounded shadow-md"
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
                  className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between mt-3">
            <p className="text-article-time text-sm">לפני שעה</p>
            <span className="text-xs text-muted-foreground">👁 1.2K</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsArticle;
