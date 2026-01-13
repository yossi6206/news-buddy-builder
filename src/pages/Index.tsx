import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import NewsHeader from "@/components/NewsHeader";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import UpdatesSidebar from "@/components/UpdatesSidebar";
import HeroArticle from "@/components/HeroArticle";
import NewsCard from "@/components/NewsCard";
import NewsFooter from "@/components/NewsFooter";
import WeatherWidget from "@/components/WeatherWidget";
import StockMarketWidget from "@/components/StockMarketWidget";
import LiveVideoSection from "@/components/LiveVideoSection";
import CategorySection from "@/components/CategorySection";
import TrendingTopics from "@/components/TrendingTopics";
import AdBanner from "@/components/AdBanner";
import { Shield, Users, Globe, TrendingUp, Microscope, Trophy } from "lucide-react";
import heroImage from "@/assets/hero-news.jpg";
import politicsImage from "@/assets/politics-news.jpg";
import breakingImage from "@/assets/breaking-news.jpg";
import internationalImage from "@/assets/international-news.jpg";
import economyImage from "@/assets/economy-news.jpg";
import techImage from "@/assets/tech-news.jpg";

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

const Index = () => {
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  

  // Category styling configuration
  const categoryConfig: Record<string, { icon: any; color: string; bgColor: string }> = {
    'ביטחוני': { icon: Shield, color: 'text-red-600', bgColor: 'bg-red-50 dark:bg-red-950/20' },
    'פוליטי': { icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-950/20' },
    'בעולם': { icon: Globe, color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-950/20' },
    'כלכלה': { icon: TrendingUp, color: 'text-purple-600', bgColor: 'bg-purple-50 dark:bg-purple-950/20' },
    'מדעי': { icon: Microscope, color: 'text-cyan-600', bgColor: 'bg-cyan-50 dark:bg-cyan-950/20' },
    'ספורט': { icon: Trophy, color: 'text-orange-600', bgColor: 'bg-orange-50 dark:bg-orange-950/20' },
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Fetch featured article
        const { data: featured } = await supabase
          .from('articles' as any)
          .select('*')
          .eq('is_featured', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (featured) {
          setFeaturedArticle(featured as any);
        }

        // Fetch regular articles
        const { data: regularArticles } = await supabase
          .from('articles' as any)
          .select('*')
          .eq('is_featured', false)
          .order('created_at', { ascending: false })
          .limit(20);

        if (regularArticles) {
          setArticles(regularArticles as any);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Fallback static articles for when there's no data
  const fallbackArticles = [
    {
      id: "2",
      title: "פגישת ראש הממשלה עם שרי הממשלה בנושא המצב הביטחוני",
      subtitle: "דיון מעמיק על האתגרים הביטחוניים והצעדים הנדרשים לשמירה על ביטחון האזרחים",
      image: politicsImage,
      category: "פוליטי",
      tags: ["ממשלה", "ביטחון", "נתניהו"],
      author_name: "עמית סגל",
      published_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      is_featured: false,
    },
    {
      id: "3",
      title: "דיווח חדש: מכה גדולה לישראל - חמאס מסרב לשחרר חטופים נוספים",
      subtitle: "צפו בפרק השני של סדרת הדוקו המטלטלת",
      image: breakingImage,
      category: "ביטחוני",
      tags: ["חטופים", "עזה", "דחוף"],
      author_name: "רון בן ישי",
      published_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      is_featured: false,
    },
    {
      id: "4",
      title: "הנשיא האמריקאי דן עם מנהיגי העולם על המצב במזרח התיכון",
      subtitle: "במאות אלפי שקלים - מסעדות, קייטרינג ואירועי רווחה לשופטים",
      image: internationalImage,
      category: "בעולם",
      tags: ['ארה"ב', "דיפלומטיה", "עולם"],
      author_name: "אורלי וילנאי",
      published_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      is_featured: false,
    },
    {
      id: "5",
      title: "שוק ההון בתנודות חדות: המשקיעים חוששים ממיתון כלכלי",
      subtitle: "חקירות מורכבות נמשכות זמן, נעדכן כשיגיע הזמן",
      image: economyImage,
      category: "כלכלה",
      tags: ["בורסה", "כלכלה", "שוק"],
      author_name: "שי גולדן",
      published_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      is_featured: false,
    },
    {
      id: "6",
      title: "חדשנות ישראלית: סטארט-אפ מקומי מפתח טכנולוגיה פורצת דרך",
      subtitle: "המילה הנבחרת זכתה ל-25% מהקולות בהצבעת הציבור",
      image: techImage,
      category: "מדעי",
      tags: ["סטארטאפ", "טכנולוגיה", "חדשנות"],
      author_name: "טל שניידר",
      published_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      is_featured: false,
    },
    {
      id: "7",
      title: "מפעל אינטל בקריית גת מרחיב פעילות: 2,000 משרות חדשות",
      subtitle: "הודעה על גיוס עובדים חדשים למפעל הייטק המוביל",
      image: techImage,
      category: "כלכלה",
      tags: ["תעסוקה", "הייטק", "קריית גת"],
      author_name: "שי גולדן",
      published_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      is_featured: false,
    },
    {
      id: "8",
      title: "משרד החינוך מכריז על רפורמה חדשה בבתי הספר התיכוניים",
      subtitle: "שינויים מהותיים צפויים במערכת החינוך הישראלית",
      image: politicsImage,
      category: "פוליטי",
      tags: ["חינוך", "רפורמה", "בתי ספר"],
      author_name: "עמית סגל",
      published_at: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      is_featured: false,
    },
    {
      id: "9",
      title: "נבחרת ישראל בכדורסל עלתה לגמר אליפות אירופה",
      subtitle: "ניצחון מרגש על האלופה האירופית",
      image: breakingImage,
      category: "ספורט",
      tags: ["כדורסל", "ספורט", "אליפות"],
      author_name: "איתי לוי",
      published_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      is_featured: false,
    },
    {
      id: "10",
      title: "משבר דיפלומטי: ישראל מזמנת את שגריר צרפת להבהרות",
      subtitle: "מתח גובר ביחסים בין ירושלים לפריז",
      image: internationalImage,
      category: "בעולם",
      tags: ["דיפלומטיה", "צרפת", "משבר"],
      author_name: "אורלי וילנאי",
      published_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      is_featured: false,
    },
    {
      id: "11",
      title: "מחקר חדש: תרופה ישראלית מוכיחה יעילות בטיפול בסרטן",
      subtitle: "פריצת דרך מדעית ישראלית מעוררת תקווה",
      image: techImage,
      category: "מדעי",
      tags: ["רפואה", "מחקר", "סרטן"],
      author_name: "טל שניידר",
      published_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      is_featured: false,
    },
    {
      id: "12",
      title: "המחאה ממשיכה: אלפים מפגינים מול הכנסת נגד הרפורמה המשפטית",
      subtitle: "מחאה נרחבת בכל רחבי הארץ",
      image: politicsImage,
      category: "פוליטי",
      tags: ["מחאה", "רפורמה", "דמוקרטיה"],
      author_name: "עמית סגל",
      published_at: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
      is_featured: false,
    },
    {
      id: "13",
      title: "מזג האויר: גל חום קיצוני צפוי במרכז הארץ בסוף השבוע",
      subtitle: "טמפרטורות גבוהות מהרגיל צפויות ברחבי הארץ",
      image: economyImage,
      category: "בעולם",
      tags: ["מזג אוויר", "חום", "קיץ"],
      author_name: "אורלי וילנאי",
      published_at: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
      is_featured: false,
    },
    {
      id: "14",
      title: "משרד האוצר מציג תוכנית חדשה להקלות במס לעסקים קטנים",
      subtitle: "הקלות משמעותיות לבעלי עסקים קטנים ובינוניים",
      image: economyImage,
      category: "כלכלה",
      tags: ["מיסים", "עסקים", "אוצר"],
      author_name: "שי גולדן",
      published_at: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
      is_featured: false,
    },
    {
      id: "15",
      title: "רכבת ישראל משיקה קו חדש: תל אביב-אילת תוך 3 שעות",
      subtitle: "פרויקט תחבורה ענק שישנה את פני הנסיעות בישראל",
      image: techImage,
      category: "מדעי",
      tags: ["תחבורה", "רכבת", "אילת"],
      author_name: "טל שניידר",
      published_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      is_featured: false,
    },
    {
      id: "16",
      title: "ביקורת המדינה: ליקויים חמורים בניהול משבר הקורונה",
      subtitle: "דו״ח מפורט על כשלים בניהול המשבר הבריאותי",
      image: politicsImage,
      category: "פוליטי",
      tags: ["ביקורת", "קורונה", "ממשלה"],
      author_name: "עמית סגל",
      published_at: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
      is_featured: false,
    },
    {
      id: "17",
      title: "גל התייקרות: מחירי הדלק עלו ב-8% החודש",
      subtitle: "עליית מחירים משמעותית צפויה להשפיע על יוקר המחיה",
      image: economyImage,
      category: "כלכלה",
      tags: ["מחירים", "דלק", "התייקרות"],
      author_name: "שי גולדן",
      published_at: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
      is_featured: false,
    },
    {
      id: "18",
      title: 'האו"ם דן היום בהצעה ישראלית לסיום המלחמה בעזה',
      subtitle: "דיון בינלאומי על עתיד המזרח התיכון",
      image: internationalImage,
      category: "בעולם",
      tags: ["אום", "עזה", "מלחמה"],
      author_name: "אורלי וילנאי",
      published_at: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
      is_featured: false,
    },
    {
      id: "19",
      title: "מכבי תל אביב מנצחת את ריאל מדריד במשחק מרגש",
      subtitle: "ניצחון היסטורי בליגה האירופית",
      image: breakingImage,
      category: "ספורט",
      tags: ["כדורסל", "מכבי תל אביב", "יורוליג"],
      author_name: "איתי לוי",
      published_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      is_featured: false,
    },
    {
      id: "20",
      title: "הפועל ירושלים עולה למקום הראשון בליגה",
      subtitle: "הקבוצה מובילה אחרי סדרת ניצחונות",
      image: politicsImage,
      category: "ספורט",
      tags: ["כדורגל", "הפועל ירושלים", "ליגה"],
      author_name: "איתי לוי",
      published_at: new Date(Date.now() - 60 * 60 * 60 * 1000).toISOString(),
      is_featured: false,
    },
    {
      id: "21",
      title: "נבחרת הנוער זוכה בגביע אליפות אסיה",
      subtitle: "הנוער הישראלי מככב בזירה הבינלאומית",
      image: techImage,
      category: "ספורט",
      tags: ["נבחרת נוער", "כדורגל", "אסיה"],
      author_name: "איתי לוי",
      published_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
      is_featured: false,
    },
  ];

  const displayArticles = articles.length > 0 ? articles : fallbackArticles;
  const displayFeatured = featuredArticle || {
    id: '1',
    title: 'מלחמת חרבות ברזל: דיווחים על התקדמות משמעותית בדרום הרצועה',
    subtitle: 'כוחות צה"ל פועלים בעוצמה מול מחבלי חמאס בעזה',
    image_url: heroImage,
    category: 'ביטחוני',
    is_featured: true,
    published_at: new Date().toISOString(),
  };

  // Helper function to get image fallback
  const getImageUrl = (article: Article | typeof displayFeatured) => {
    if (article.image_url) return article.image_url;
    
    // Fallback images based on category
    const categoryImages: Record<string, string> = {
      'פוליטי': politicsImage,
      'ביטחוני': breakingImage,
      'בעולם': internationalImage,
      'כלכלה': economyImage,
      'מדעי': techImage,
      'ספורט': breakingImage,
    };
    
    return categoryImages[article.category] || heroImage;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NewsHeader />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <p className="text-muted-foreground">טוען...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NewsHeader />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Hero Article */}
          <div className="mb-6">
            {loading ? (
              <div className="h-[380px] bg-muted animate-pulse" />
            ) : (
              <HeroArticle
                title={displayFeatured.title}
                subtitle={displayFeatured.subtitle || ""}
                image={getImageUrl(displayFeatured)}
                articleId={displayFeatured.id}
                authorName={displayFeatured.author_name}
                publishedAt={displayFeatured.published_at}
              />
            )}
          </div>

          {/* Widgets Row - Weather, Stock Market, Trending */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <WeatherWidget />
            <StockMarketWidget />
            <TrendingTopics />
          </div>

          {/* Ad Banner after Widgets */}
          <div className="mb-6">
            <AdBanner type="horizontal" size="medium" position="content" />
          </div>

          {/* All Articles Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-72 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  title={article.title}
                  subtitle={article.subtitle}
                  image={getImageUrl(article)}
                  category={article.category}
                  articleId={article.id}
                  authorName={article.author_name}
                  publishedAt={article.published_at}
                  commentsCount={Math.floor(Math.random() * 50)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <NewsFooter />
    </div>
  );
};

export default Index;
