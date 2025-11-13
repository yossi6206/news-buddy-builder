import NewsHeader from "@/components/NewsHeader";
import UpdatesSidebar from "@/components/UpdatesSidebar";
import HeroArticle from "@/components/HeroArticle";
import NewsArticle from "@/components/NewsArticle";
import heroImage from "@/assets/hero-news.jpg";
import politicsImage from "@/assets/politics-news.jpg";
import breakingImage from "@/assets/breaking-news.jpg";
import internationalImage from "@/assets/international-news.jpg";
import economyImage from "@/assets/economy-news.jpg";
import techImage from "@/assets/tech-news.jpg";

const Index = () => {
  const articles = [
    {
      title: "פגישת ראש הממשלה עם שרי הממשלה בנושא המצב הביטחוני",
      image: politicsImage,
      category: "פוליטי",
    },
    {
      title: "דיווח חדש: מכה גדולה לישראל - חמאס מסרב לשחרר חטופים נוספים",
      image: breakingImage,
      category: "ביטחוני",
    },
    {
      title: "הנשיא האמריקאי דן עם מנהיגי העולם על המצב במזרח התיכון",
      image: internationalImage,
      category: "בעולם",
    },
    {
      title: "שוק ההון בתנודות חדות: המשקיעים חוששים ממיתון כלכלי",
      image: economyImage,
      category: "כלכלה",
    },
    {
      title: "חדשנות ישראלית: סטארט-אפ מקומי מפתח טכנולוגיה פורצת דרך",
      image: techImage,
      category: "מדעי",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NewsHeader />
      
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-6">
          {/* Hero Article */}
          <div className="mb-8">
            <HeroArticle
              title="מכה גדולה לישראל: הנחת התדמיתי החדש אחרי מלחמת עזה"
              subtitle="הצבא מדווח על הצלחות מבצעיות אך המחיר האנושי עדיין כבד"
              image={heroImage}
            />
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <NewsArticle
                key={index}
                title={article.title}
                image={article.image}
                category={article.category}
              />
            ))}
          </div>

          {/* Additional Articles Row */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <NewsArticle
              title="ראש הממשלה: 'נמשיך במאמצים להחזרת כל החטופים הביתה'"
              image={politicsImage}
              className="md:col-span-2"
            />
          </div>
        </main>

        {/* Updates Sidebar */}
        <UpdatesSidebar />
      </div>
    </div>
  );
};

export default Index;
