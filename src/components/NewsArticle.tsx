import { cn } from "@/lib/utils";

interface NewsArticleProps {
  title: string;
  image: string;
  category?: string;
  className?: string;
}

const NewsArticle = ({ title, image, category, className }: NewsArticleProps) => {
  return (
    <article
      className={cn(
        "group cursor-pointer overflow-hidden bg-card rounded-sm transition-all hover:shadow-lg",
        className
      )}
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {category && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded">
            {category}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
      </div>
    </article>
  );
};

export default NewsArticle;
