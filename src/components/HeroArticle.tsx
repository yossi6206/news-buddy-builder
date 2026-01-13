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
    <Link to={`/article/${articleId}`} className="group cursor-pointer block">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl overflow-hidden bg-[#1a1f3c]">
        {/* Image Section */}
        <div className="relative h-[300px] md:h-[400px] overflow-hidden order-1 md:order-2">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <div className="relative h-[300px] md:h-[400px] flex flex-col justify-center p-8 order-2 md:order-1">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-white">
            {title}
          </h1>
          <p className="text-base md:text-lg text-white/80 mb-6 leading-relaxed">
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
