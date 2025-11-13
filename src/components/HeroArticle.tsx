import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroArticleProps {
  title: string;
  subtitle: string;
  image: string;
  articleId?: string;
}

const HeroArticle = ({ title, subtitle, image, articleId = "1" }: HeroArticleProps) => {
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
            <span className="bg-primary px-2 py-1 text-xs font-bold">ברנח טרגים</span>
            <span>|</span>
            <span>21:35</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HeroArticle;
