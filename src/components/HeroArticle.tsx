interface HeroArticleProps {
  title: string;
  subtitle: string;
  image: string;
}

const HeroArticle = ({ title, subtitle, image }: HeroArticleProps) => {
  return (
    <article className="group cursor-pointer bg-card rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all">
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 right-0 left-0 p-6 text-white">
          <h1 className="text-4xl font-bold leading-tight mb-2 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-lg opacity-90 drop-shadow-md">{subtitle}</p>
        </div>
      </div>
    </article>
  );
};

export default HeroArticle;
