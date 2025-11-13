import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroArticleProps {
  title: string;
  subtitle: string;
  image: string;
  articleId?: string;
  authorName?: string;
  publishedAt?: string;
}

const HeroArticle = ({ title, subtitle, image, articleId = "1", authorName = "כתב ערוץ החדשות", publishedAt }: HeroArticleProps) => {
  const getTimeDisplay = (date: string | undefined) => {
    if (!date) return "22:10";
    const publishDate = new Date(date);
    return publishDate.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', hour12: false });
  };
  return (
    <Link to={`/article/${articleId}`} className="group cursor-pointer bg-card overflow-hidden block relative">
      <div className="relative h-[380px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-0 right-0 left-0 p-6">
          <h1 className="text-4xl font-bold leading-tight mb-3 text-white drop-shadow-lg">
            {title}
          </h1>
          <p className="text-lg text-white/90 drop-shadow-md mb-3 border-r-2 border-primary pr-3">
            {subtitle}
          </p>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <span className="font-medium">{authorName}</span>
            <span>|</span>
            <span>{getTimeDisplay(publishedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HeroArticle;
