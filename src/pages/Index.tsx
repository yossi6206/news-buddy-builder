import NewsHeader from "@/components/NewsHeader";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import UpdatesSidebar from "@/components/UpdatesSidebar";
import HeroArticle from "@/components/HeroArticle";
import NewsArticle from "@/components/NewsArticle";
import NewsFooter from "@/components/NewsFooter";
import heroImage from "@/assets/hero-news.jpg";
import politicsImage from "@/assets/politics-news.jpg";
import breakingImage from "@/assets/breaking-news.jpg";
import internationalImage from "@/assets/international-news.jpg";
import economyImage from "@/assets/economy-news.jpg";
import techImage from "@/assets/tech-news.jpg";

const Index = () => {
  const articles = [
    {
      id: "2",
      title: "פגישת ראש הממשלה עם שרי הממשלה בנושא המצב הביטחוני",
      image: politicsImage,
      category: "פוליטי",
      tags: ["ממשלה", "ביטחון", "נתניהו"],
    },
    {
      id: "3",
      title: "דיווח חדש: מכה גדולה לישראל - חמאס מסרב לשחרר חטופים נוספים",
      image: breakingImage,
      category: "ביטחוני",
      tags: ["חטופים", "עזה", "דחוף"],
    },
    {
      id: "4",
      title: "הנשיא האמריקאי דן עם מנהיגי העולם על המצב במזרח התיכון",
      image: internationalImage,
      category: "בעולם",
      tags: ['ארה"ב', "דיפלומטיה", "עולם"],
    },
    {
      id: "5",
      title: "שוק ההון בתנודות חדות: המשקיעים חוששים ממיתון כלכלי",
      image: economyImage,
      category: "כלכלה",
      tags: ["בורסה", "כלכלה", "שוק"],
    },
    {
      id: "6",
      title: "חדשנות ישראלית: סטארט-אפ מקומי מפתח טכנולוגיה פורצת דרך",
      image: techImage,
      category: "מדעי",
      tags: ["סטארטאפ", "טכנולוגיה", "חדשנות"],
    },
    {
      id: "7",
      title: "מפעל אינטל בקריית גת מרחיב פעילות: 2,000 משרות חדשות",
      image: techImage,
      category: "כלכלה",
      tags: ["תעסוקה", "הייטק", "קריית גת"],
    },
    {
      id: "8",
      title: "משרד החינוך מכריז על רפורמה חדשה בבתי הספר התיכוניים",
      image: politicsImage,
      category: "פוליטי",
      tags: ["חינוך", "רפורמה", "בתי ספר"],
    },
    {
      id: "9",
      title: "נבחרת ישראל בכדורסל עלתה לגמר אליפות אירופה",
      image: breakingImage,
      category: "ספורט",
      tags: ["כדורסל", "ספורט", "אליפות"],
    },
    {
      id: "10",
      title: "משבר דיפלומטי: ישראל מזמנת את שגריר צרפת להבהרות",
      image: internationalImage,
      category: "בעולם",
      tags: ["דיפלומטיה", "צרפת", "משבר"],
    },
    {
      id: "11",
      title: "מחקר חדש: תרופה ישראלית מוכיחה יעילות בטיפול בסרטן",
      image: techImage,
      category: "מדעי",
      tags: ["רפואה", "מחקר", "סרטן"],
    },
    {
      id: "12",
      title: "המחאה ממשיכה: אלפים מפגינים מול הכנסת נגד הרפורמה המשפטית",
      image: politicsImage,
      category: "פוליטי",
      tags: ["מחאה", "רפורמה", "דמוקרטיה"],
    },
    {
      id: "13",
      title: "מזג האויר: גל חום קיצוני צפוי במרכז הארץ בסוף השבוע",
      image: economyImage,
      category: "בעולם",
      tags: ["מזג אוויר", "חום", "קיץ"],
    },
    {
      id: "14",
      title: "משרד האוצר מציג תוכנית חדשה להקלות במס לעסקים קטנים",
      image: economyImage,
      category: "כלכלה",
      tags: ["מיסים", "עסקים", "אוצר"],
    },
    {
      id: "15",
      title: "רכבת ישראל משיקה קו חדש: תל אביב-אילת תוך 3 שעות",
      image: techImage,
      category: "מדעי",
      tags: ["תחבורה", "רכבת", "אילת"],
    },
    {
      id: "16",
      title: "ביקורת המדינה: ליקויים חמורים בניהול משבר הקורונה",
      image: politicsImage,
      category: "פוליטי",
      tags: ["ביקורת", "קורונה", "ממשלה"],
    },
    {
      id: "17",
      title: "גל התייקרות: מחירי הדלק עלו ב-8% החודש",
      image: economyImage,
      category: "כלכלה",
      tags: ["מחירים", "דלק", "התייקרות"],
    },
    {
      id: "18",
      title: 'האו"ם דן היום בהצעה ישראלית לסיום המלחמה בעזה',
      image: internationalImage,
      category: "בעולם",
      tags: ["אום", "עזה", "מלחמה"],
    },
    {
      id: "19",
      title: "מכבי תל אביב מנצחת את ריאל מדריד במשחק מרגש",
      image: breakingImage,
      category: "ספורט",
      tags: ["כדורסל", "מכבי תל אביב", "יורוליג"],
    },
    {
      id: "20",
      title: "הפועל ירושלים עולה למקום הראשון בליגה",
      image: politicsImage,
      category: "ספורט",
      tags: ["כדורגל", "הפועל ירושלים", "ליגה"],
    },
    {
      id: "21",
      title: "נבחרת הנוער זוכה בגביע אליפות אסיה",
      image: techImage,
      category: "ספורט",
      tags: ["נבחרת נוער", "כדורגל", "אסיה"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NewsHeader />
      <BreakingNewsTicker />

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-6">
          {/* Hero Article */}
          <div className="mb-8">
            <HeroArticle
              title="מכה גדולה לישראל: הנחת התדמיתי החדש אחרי מלחמת "
              subtitle="הצבא מדווח על הצלחות מבצעיות אך המחיר האנושי עדיין כבד"
              image={heronews.jpg}
              articleId="1"
            />
          </div>

          {/* Hot Section */}
          <div className="mb-8 p-4 bg-gradient-to-r from-primary/10 to-transparent rounded-lg border-r-4 border-primary">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">🔥 החמות ביותר כעת</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {articles.slice(0, 3).map((article, index) => (
                <NewsArticle
                  key={index}
                  title={article.title}
                  image={article.image}
                  category={article.category}
                  tags={article.tags}
                  articleId={article.id}
                />
              ))}
            </div>
          </div>

          {/* Article Grid */}
          <h2 className="text-2xl font-bold mb-6">כל החדשות</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <NewsArticle
                key={index}
                title={article.title}
                image={article.image}
                category={article.category}
                tags={article.tags}
                articleId={article.id}
              />
            ))}
          </div>

          {/* Additional Articles Row */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <NewsArticle
              title="ראש הממשלה: 'נמשיך במאמצים להחזרת כל החטופים הביתה'"
              image={politicsImage}
              category="פוליטי"
              tags={["נתניהו", "חטופים"]}
              articleId="2"
              className="md:col-span-2"
            />
          </div>
        </main>

        {/* Updates Sidebar */}
        <UpdatesSidebar />
      </div>

      <NewsFooter />
    </div>
  );
};

export default Index;
