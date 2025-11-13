import { cn } from "@/lib/utils";

interface NewsArticleProps {
  title: string;
  image: string;
  category?: string;
  tags?: string[];
  className?: string;
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
  className 
}: NewsArticleProps) => {
  return (
    <article className={cn("group cursor-pointer animate-fade-in", className)}>
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
    </article>
  );
};

export default NewsArticle;
