import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface FeaturedNewsItem {
  id: string;
  title: string;
  category: string;
  image: string;
  authorName?: string;
  publishedAt?: string;
}

interface FeaturedNewsGridProps {
  articles: FeaturedNewsItem[];
  className?: string;
}

const getCategoryBadgeColor = (category: string) => {
  const colors: Record<string, string> = {
    פוליטי: "bg-[#d32f2f]",
    ביטחוני: "bg-[#c62828]",
    בעולם: "bg-[#d32f2f]",
    כלכלה: "bg-[#d32f2f]",
    מדעי: "bg-[#d32f2f]",
    ספורט: "bg-[#d32f2f]",
    טכנולוגיה: "bg-[#d32f2f]",
    "תרבות ובידור": "bg-[#d32f2f]",
    בריאות: "bg-[#d32f2f]",
  };
  return colors[category || ""] || "bg-[#d32f2f]";
};

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
    return `לפני ${diffInHours} שעות`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return diffInDays === 1 ? "אתמול" : `לפני ${diffInDays} ימים`;
};

const FeaturedNewsGrid = ({ articles, className }: FeaturedNewsGridProps) => {
  // Take only 6 articles for the grid
  const displayArticles = articles.slice(0, 6);

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayArticles.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className="group relative block overflow-hidden rounded-lg aspect-[16/10]"
          >
            {/* Background Image */}
            <img
              src={article.image}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Category Badge */}
            <div className={cn(
              "absolute top-3 right-3 px-3 py-1 text-xs font-bold text-white rounded",
              getCategoryBadgeColor(article.category)
            )}>
              {article.category}
            </div>
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 right-0 left-0 p-4 text-right">
              {/* Title */}
              <h3 className="text-white text-lg font-bold leading-tight mb-2 line-clamp-2 group-hover:text-red-300 transition-colors">
                {article.title}
              </h3>
              
              {/* Meta */}
              <div className="flex items-center justify-end gap-2 text-white/80 text-xs">
                <span>{getTimeAgo(article.publishedAt)}</span>
                {article.authorName && (
                  <>
                    <span className="text-white/50">|</span>
                    <span>{article.authorName}</span>
                  </>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Red Bottom Border */}
      <div className="w-full h-1 bg-[#d32f2f] mt-6" />
    </div>
  );
};

export default FeaturedNewsGrid;
