import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroArticleProps {
  title: string;
  subtitle: string;
  image: string;
  articleId?: string;
  authorName?: string;
  publishedAt?: string;
  commentsCount?: number;
}

const HeroArticle = ({ title, subtitle, image, articleId = "1", authorName = "כתב ערוץ החדשות", publishedAt, commentsCount = 0 }: HeroArticleProps) => {
  return (
    <Link to={`/article/${articleId}`} className="group cursor-pointer bg-card overflow-hidden block relative rounded-xl">
      <div className="relative h-[450px] overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/40 to-black/80" />

        <div className="absolute bottom-0 right-0 left-0 p-8">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white drop-shadow-lg max-w-[70%]">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 drop-shadow-md mb-4 max-w-[65%] leading-relaxed">
            {subtitle}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-white font-medium text-base">{authorName}</span>
            {commentsCount > 0 && (
              <div className="bg-[#d32f2f] text-white text-sm font-bold px-2 py-0.5 rounded min-w-[28px] text-center">
                {commentsCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HeroArticle;
