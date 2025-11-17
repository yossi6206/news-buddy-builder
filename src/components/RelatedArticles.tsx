import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import { he } from "date-fns/locale";

interface Article {
  id: string;
  title: string;
  subtitle?: string | null;
  image_url: string | null;
  category: string;
  author_name?: string;
  published_at?: string;
  created_at: string;
}

interface RelatedArticlesProps {
  articles: Article[];
  currentCategory: string;
}

export const RelatedArticles = ({ articles, currentCategory }: RelatedArticlesProps) => {
  if (articles.length === 0) return null;

  const getFormattedDate = (date: string) => {
    return format(new Date(date), "dd MMMM yyyy, HH:mm", { locale: he });
  };

  return (
    <section className="border-t border-border pt-12 mt-12 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">מאמרים קשורים</h2>
        <p className="text-muted-foreground">עוד כתבות מקטגוריית {currentCategory}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            {/* Article Image */}
            {article.image_url && (
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>

              {article.subtitle && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {article.subtitle}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{getFormattedDate(article.published_at || article.created_at)}</span>
                </div>
                {article.author_name && (
                  <span className="font-medium">{article.author_name}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
