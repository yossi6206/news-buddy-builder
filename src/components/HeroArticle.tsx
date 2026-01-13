import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
    <Link to={`/article/${articleId}`} className="group cursor-pointer block">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl overflow-hidden bg-[#d32f2f]">
        {/* Image Section */}
        <div className="relative h-[350px] md:h-[450px] overflow-hidden order-1 md:order-1">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Breaking News Badge */}
          <div className="absolute top-4 right-4 bg-[#d32f2f] text-white px-3 py-1.5 rounded-md font-bold text-sm animate-pulse shadow-lg">
            חדשות מתפתחות
          </div>
        </div>

        {/* Content Section */}
        <div className="relative h-[350px] md:h-[450px] flex flex-col justify-center p-8 order-2 md:order-2">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-white animate-fade-in">
            {title}
          </h1>
          <p className="text-base md:text-lg text-white/80 mb-6 leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {subtitle}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-white font-medium text-base">{authorName}</span>
              {commentsCount > 0 && (
                <div className="bg-white/20 text-white text-sm font-bold px-2 py-0.5 rounded min-w-[28px] text-center">
                  {commentsCount}
                </div>
              )}
            </div>
            
            {/* Read More Button */}
            <div className="flex items-center gap-2 bg-white text-[#d32f2f] px-4 py-2 rounded-lg font-bold text-sm group-hover:bg-white/90 transition-all duration-300 group-hover:gap-3">
              <span>קרא עוד</span>
              <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HeroArticle;
