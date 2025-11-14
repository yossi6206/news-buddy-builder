import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import NewsHeader from "@/components/NewsHeader";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import UpdatesSidebar from "@/components/UpdatesSidebar";
import HeroArticle from "@/components/HeroArticle";
import NewsArticle from "@/components/NewsArticle";
import NewsFooter from "@/components/NewsFooter";
import WeatherWidget from "@/components/WeatherWidget";
import StockMarketWidget from "@/components/StockMarketWidget";
import LiveVideoSection from "@/components/LiveVideoSection";
import CategorySection from "@/components/CategorySection";
import TrendingTopics from "@/components/TrendingTopics";
import AdBanner from "@/components/AdBanner";
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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Fetch featured article
        const { data: featured } = await supabase
          .from('articles' as any)
          .select('*')
          .eq('is_featured', true)
          .order('published_at', { ascending: false })
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
          .order('published_at', { ascending: false })
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
      <BreakingNewsTicker />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Main Layout with Sidebar */}
          <div className="flex gap-6">
            {/* Main Content */}
            <div className="flex-1">
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

              {/* Ad Banner after Hero */}
              <div className="mb-6">
                <AdBanner type="horizontal" size="medium" />
              </div>

              {/* Articles Grid - 4 columns */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="h-72 bg-muted animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {displayArticles.slice(0, 8).map((article) => (
                    <NewsArticle
                      key={article.id}
                      title={article.title}
                      image={getImageUrl(article)}
                      category={article.category}
                      tags={[article.category]}
                      articleId={article.id}
                      style="compact"
                      authorName={article.author_name}
                      publishedAt={article.published_at}
                    />
                  ))}
                </div>
              )}

              {/* Ad Banner after first articles grid */}
              <div className="mb-8">
                <AdBanner type="horizontal" size="large" />
              </div>

              {/* More Articles Section */}
              {displayArticles.length > 8 && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-4 text-foreground">עוד כתבות</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayArticles.slice(8).map((article) => (
                      <NewsArticle
                        key={article.id}
                        title={article.title}
                        image={getImageUrl(article)}
                        category={article.category}
                        tags={[article.category]}
                        articleId={article.id}
                        authorName={article.author_name}
                        publishedAt={article.published_at}
                      />
                    ))}
                  </div>

                  {/* Ad Banner after more articles */}
                  <div className="mt-8">
                    <AdBanner type="horizontal" size="medium" />
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar with Ads */}
            <div className="hidden lg:flex lg:flex-col gap-6">
              {/* Ad Banner in sidebar */}
              <AdBanner type="vertical" size="large" />
              
              {/* Updates Sidebar - Right Side */}
              <UpdatesSidebar />
              
              {/* Another Ad Banner in sidebar */}
              <AdBanner type="vertical" size="medium" />
            </div>
          </div>
        </div>
      </main>

      <NewsFooter />
    </div>
  );
};

export default Index;
