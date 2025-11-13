import { Link } from "react-router-dom";
import NewsArticle from "./NewsArticle";
import { ChevronLeft } from "lucide-react";

interface Article {
  id: string;
  title: string;
  subtitle?: string;
  image_url?: string;
  category: string;
  is_featured: boolean;
  published_at: string;
  author_name?: string;
}

interface CategoryNewsSectionProps {
  category: string;
  articles: Article[];
  getImageUrl: (article: Article) => string;
  maxArticles?: number;
}

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  'פוליטי': { bg: 'bg-blue-500/10', border: 'border-blue-500', text: 'text-blue-600' },
  'ביטחוני': { bg: 'bg-red-500/10', border: 'border-red-500', text: 'text-red-600' },
  'בעולם': { bg: 'bg-purple-500/10', border: 'border-purple-500', text: 'text-purple-600' },
  'כלכלה': { bg: 'bg-green-500/10', border: 'border-green-500', text: 'text-green-600' },
  'מדעי': { bg: 'bg-cyan-500/10', border: 'border-cyan-500', text: 'text-cyan-600' },
  'ספורט': { bg: 'bg-orange-500/10', border: 'border-orange-500', text: 'text-orange-600' },
};

const CategoryNewsSection = ({ category, articles, getImageUrl, maxArticles = 4 }: CategoryNewsSectionProps) => {
  if (articles.length === 0) return null;

  const displayArticles = articles.slice(0, maxArticles);
  const colors = categoryColors[category] || { bg: 'bg-primary/10', border: 'border-primary', text: 'text-primary' };

  return (
    <section className="mb-12">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className={`text-2xl font-bold ${colors.text} flex items-center gap-2`}>
            <span className={`w-1 h-8 ${colors.bg} ${colors.border} border-r-4 rounded`}></span>
            {category}
          </h2>
        </div>
        {articles.length > maxArticles && (
          <Link 
            to={`/category/${category}`}
            className={`flex items-center gap-1 ${colors.text} hover:underline text-sm font-medium`}
          >
            צפה בכל הכתבות
            <ChevronLeft className="h-4 w-4" />
          </Link>
        )}
      </div>

      {/* Articles Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-lg ${colors.bg} border ${colors.border}/20`}>
        {displayArticles.map((article) => (
          <NewsArticle
            key={article.id}
            title={article.title}
            image={getImageUrl(article)}
            category={article.category}
            tags={[]}
            articleId={article.id}
            style="compact"
            authorName={article.author_name}
            publishedAt={article.published_at}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryNewsSection;
