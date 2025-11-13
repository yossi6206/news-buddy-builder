import { TrendingUp } from "lucide-react";

interface HeroArticleProps {
  title: string;
  subtitle: string;
  image: string;
}

const HeroArticle = ({ title, subtitle, image }: HeroArticleProps) => {
  return (
    <article className="group cursor-pointer bg-card rounded-lg overflow-hidden article-hover animate-fade-in">
      <div className="relative h-[500px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="absolute top-6 right-6 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-bold">חדשות בולטות</span>
        </div>

        <div className="absolute bottom-0 right-0 left-0 p-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold leading-tight mb-4 text-white text-shadow drop-shadow-2xl animate-slide-up">
              {title}
            </h1>
            <p className="text-xl text-white/90 drop-shadow-lg mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {subtitle}
            </p>
            <div className="flex items-center gap-4 text-white/80 text-sm animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <span>לפני 30 דקות</span>
              <span>•</span>
              <span>👁 15.2K צופים</span>
              <span>•</span>
              <span>💬 234 תגובות</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default HeroArticle;
