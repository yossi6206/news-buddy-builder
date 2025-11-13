import { useParams, Link } from "react-router-dom";
import { ArrowRight, Share2, Bookmark, Clock, User } from "lucide-react";
import NewsHeader from "@/components/NewsHeader";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import NewsArticle from "@/components/NewsArticle";
import NewsFooter from "@/components/NewsFooter";
import CommentsSection from "@/components/CommentsSection";
import heroImage from "@/assets/hero-news.jpg";
import politicsImage from "@/assets/politics-news.jpg";
import breakingImage from "@/assets/breaking-news.jpg";
import internationalImage from "@/assets/international-news.jpg";
import economyImage from "@/assets/economy-news.jpg";
import techImage from "@/assets/tech-news.jpg";

const Article = () => {
  const { id } = useParams();

  const allArticles = [
    {
      id: "1",
      title: " נכון גדולה לישראל: הנחת התדמיתי החדש אחרי מלחמת עזה  ",
      subtitle: "הצבא מדווח על הצלחות מבצעיות אך המחיר האנושי עדיין כבד",
      image: heroImage,
      category: "ביטחוני",
      author: "אלי לוי",
      date: "13 נובמבר 2025, 15:30",
      views: "15.2K",
      comments: 234,
      tags: ["עזה", "צהל"],
    },
    {
      id: "2",
      title: "פגישת ראש הממשלה עם שרי הממשלה בנושא המצב הביטחוני",
      image: politicsImage,
      category: "פוליטי",
      author: "שרה כהן",
      date: "13 נובמבר 2025, 14:20",
      views: "8.5K",
      comments: 156,
      tags: ["ממשלה", "ביטחון", "נתניהו"],
    },
    {
      id: "3",
      title: "דיווח חדש: מכה גדולה לישראל - חמאס מסרב לשחרר חטופים נוספים",
      image: breakingImage,
      category: "ביטחוני",
      author: "דני רביב",
      date: "13 נובמבר 2025, 13:00",
      views: "12.3K",
      comments: 189,
      tags: ["חטופים", "עזה", "דחוף"],
    },
    {
      id: "4",
      title: "הנשיא האמריקאי דן עם מנהיגי העולם על המצב במזרח התיכון",
      image: internationalImage,
      category: "בעולם",
      author: "מיכל גולן",
      date: "13 נובמבר 2025, 12:45",
      views: "9.7K",
      comments: 145,
      tags: ['ארה"ב', "דיפלומטיה", "עולם"],
    },
    {
      id: "5",
      title: "שוק ההון בתנודות חדות: המשקיעים חוששים ממיתון כלכלי",
      image: economyImage,
      category: "כלכלה",
      author: "יוסי שטרן",
      date: "13 נובמבר 2025, 11:30",
      views: "7.8K",
      comments: 98,
      tags: ["בורסה", "כלכלה", "שוק"],
    },
    {
      id: "6",
      title: "חדשנות ישראלית: סטארט-אפ מקומי מפתח טכנולוגיה פורצת דרך",
      image: techImage,
      category: "מדעי",
      author: "רונית אבני",
      date: "13 נובמבר 2025, 10:15",
      views: "6.5K",
      comments: 76,
      tags: ["סטארטאפ", "טכנולוגיה", "חדשנות"],
    },
    {
      id: "7",
      title: "מפעל אינטל בקריית גת מרחיב פעילות: 2,000 משרות חדשות",
      image: techImage,
      category: "כלכלה",
      author: "אבי נחמיאס",
      date: "13 נובמבר 2025, 09:45",
      views: "8.9K",
      comments: 112,
      tags: ["תעסוקה", "הייטק", "קריית גת"],
    },
    {
      id: "8",
      title: "משרד החינוך מכריז על רפורמה חדשה בבתי הספר התיכוניים",
      image: politicsImage,
      category: "פוליטי",
      author: "דנה לוי",
      date: "13 נובמבר 2025, 08:30",
      views: "5.6K",
      comments: 87,
      tags: ["חינוך", "רפורמה", "בתי ספר"],
    },
    {
      id: "9",
      title: "נבחרת ישראל בכדורסל עלתה לגמר אליפות אירופה",
      image: breakingImage,
      category: "ספורט",
      author: "עמוס ברק",
      date: "13 נובמבר 2025, 22:00",
      views: "18.4K",
      comments: 267,
      tags: ["כדורסל", "ספורט", "אליפות"],
    },
    {
      id: "10",
      title: "משבר דיפלומטי: ישראל מזמנת את שגריר צרפת להבהרות",
      image: internationalImage,
      category: "בעולם",
      author: "תמר גל",
      date: "13 נובמבר 2025, 16:20",
      views: "11.2K",
      comments: 178,
      tags: ["דיפלומטיה", "צרפת", "משבר"],
    },
    {
      id: "11",
      title: "מחקר חדש: תרופה ישראלית מוכיחה יעילות בטיפול בסרטן",
      image: techImage,
      category: "מדעי",
      author: "פרופ' שרון כהן",
      date: "13 נובמבר 2025, 14:00",
      views: "13.7K",
      comments: 201,
      tags: ["רפואה", "מחקר", "סרטן"],
    },
    {
      id: "12",
      title: "המחאה ממשיכה: אלפים מפגינים מול הכנסת נגד הרפורמה המשפטית",
      image: politicsImage,
      category: "פוליטי",
      author: "גל אברהם",
      date: "13 נובמבר 2025, 19:30",
      views: "16.8K",
      comments: 289,
      tags: ["מחאה", "רפורמה", "דמוקרטיה"],
    },
    {
      id: "13",
      title: "מזג האויר: גל חום קיצוני צפוי במרכז הארץ בסוף השבוע",
      image: economyImage,
      category: "בעולם",
      author: "אורי זמיר",
      date: "13 נובמבר 2025, 07:00",
      views: "4.2K",
      comments: 45,
      tags: ["מזג אוויר", "חום", "קיץ"],
    },
    {
      id: "14",
      title: "משרד האוצר מציג תוכנית חדשה להקלות במס לעסקים קטנים",
      image: economyImage,
      category: "כלכלה",
      author: "רחל שפירא",
      date: "13 נובמבר 2025, 10:45",
      views: "6.3K",
      comments: 72,
      tags: ["מיסים", "עסקים", "אוצר"],
    },
    {
      id: "15",
      title: "רכבת ישראל משיקה קו חדש: תל אביב-אילת תוך 3 שעות",
      image: techImage,
      category: "מדעי",
      author: "יעקב רון",
      date: "13 נובמבר 2025, 11:15",
      views: "9.1K",
      comments: 134,
      tags: ["תחבורה", "רכבת", "אילת"],
    },
    {
      id: "16",
      title: "ביקורת המדינה: ליקויים חמורים בניהול משבר הקורונה",
      image: politicsImage,
      category: "פוליטי",
      author: "נועה ברק",
      date: "13 נובמבר 2025, 13:40",
      views: "10.5K",
      comments: 156,
      tags: ["ביקורת", "קורונה", "ממשלה"],
    },
    {
      id: "17",
      title: "גל התייקרות: מחירי הדלק עלו ב-8% החודש",
      image: economyImage,
      category: "כלכלה",
      author: "משה לביא",
      date: "13 נובמבר 2025, 08:00",
      views: "7.9K",
      comments: 103,
      tags: ["מחירים", "דלק", "התייקרות"],
    },
    {
      id: "18",
      title: 'האו"ם דן היום בהצעה ישראלית לסיום המלחמה בעזה',
      image: internationalImage,
      category: "בעולם",
      author: "ליאור כץ",
      date: "13 נובמבר 2025, 15:15",
      views: "14.6K",
      comments: 223,
      tags: ["אום", "עזה", "מלחמה"],
    },
    {
      id: "19",
      title: "מכבי תל אביב מנצחת את ריאל מדריד במשחק מרגש",
      image: breakingImage,
      category: "ספורט",
      author: "יוסי בניזרי",
      date: "13 נובמבר 2025, 21:30",
      views: "22.1K",
      comments: 341,
      tags: ["כדורסל", "מכבי תל אביב", "יורוליג"],
    },
    {
      id: "20",
      title: "הפועל ירושלים עולה למקום הראשון בליגה",
      image: politicsImage,
      category: "ספורט",
      author: "דני רוזן",
      date: "13 נובמבר 2025, 23:15",
      views: "17.3K",
      comments: 198,
      tags: ["כדורגל", "הפועל ירושלים", "ליגה"],
    },
    {
      id: "21",
      title: "נבחרת הנוער זוכה בגביע אליפות אסיה",
      image: techImage,
      category: "ספורט",
      author: "מיכאל בן דוד",
      date: "13 נובמבר 2025, 20:00",
      views: "19.8K",
      comments: 256,
      tags: ["נבחרת נוער", "כדורגל", "אסיה"],
    },
  ];

  const article = allArticles.find((a) => a.id === id) || allArticles[0];

  // Filter related articles by the same category as the current article
  const relatedArticles = allArticles.filter((a) => a.id !== id && a.category === article.category).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <NewsHeader />
      <BreakingNewsTicker />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6 group"
        >
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          <span className="font-medium">חזרה לעמוד הראשי</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article Content */}
          <article className="lg:col-span-2">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-primary text-primary-foreground px-4 py-1 text-sm font-bold rounded">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4 animate-fade-in">{article.title}</h1>

            {/* Subtitle */}
            {article.subtitle && (
              <p className="text-xl text-muted-foreground mb-6 animate-fade-in">{article.subtitle}</p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b pb-4 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium text-foreground">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                👁 <span>{article.views} צפיים</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Share2 className="h-4 w-4" />
                שתף
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                <Bookmark className="h-4 w-4" />
                שמור לקריאה
              </button>
            </div>

            {/* Article Image */}
            <div className="relative mb-8 rounded-lg overflow-hidden animate-fade-in">
              <img src={article.image} alt={article.title} className="w-full h-[400px] object-cover" />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                <strong className="font-bold">ירושלים -</strong> במהלך השעות האחרונות חלו התפתחויות דרמטיות במצב
                הביטחוני במדינה. גורמים בכירים במערכת הביטחון מדווחים על שינוי משמעותי בתמונת המצב, המצריך התייחסות
                דחופה ומקיפה.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                על פי הדיווחים, ההתפתחויות האחרונות משקפות מציאות מורכבת ומאתגרת, הדורשת תגובה מדודה ואסטרטגית. גורמים
                ביטחוניים מדגישים כי המצב נמצא תחת מעקב צמוד, ומערכת הביטחון פועלת בכל הזמנים בכדי להבטיח את ביטחון
                האזרחים.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">תגובות בזירה הבינלאומית</h2>

              <p className="text-lg leading-relaxed mb-6">
                בינתיים, הזירה הבינלאומית גם היא מגיבה להתפתחויות. ארצות הברית והמעצמות האירופיות עוקבות מקרוב אחר
                המתרחש, ומנסות לקדם פתרונות דיפלומטיים לצד התמיכה בצעדי הביטחון הנדרשים.
              </p>

              <blockquote className="border-r-4 border-primary pr-4 my-8 italic text-xl text-muted-foreground">
                "המצב הביטחוני הנוכחי מצריך אחריות מרבית ותיאום פעולה הדוק בין כל הגורמים הרלוונטיים"
              </blockquote>

              <h2 className="text-2xl font-bold mt-8 mb-4">השלכות כלכליות ותעשייתיות</h2>

              <p className="text-lg leading-relaxed mb-6">
                המצב המורכב משפיע גם על הזירה הכלכלית. בורסת תל אביב הגיבה בתנודתיות למצב, כאשר משקיעים מנסים להעריך את
                ההשלכות האפשריות על המשק הישראלי.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                מומחי כלכלה מעריכים כי למרות המורכבות, המשק הישראלי ממשיך להפגין חוסן ויכולת התמודדות עם אתגרים. החברות
                הטכנולוגיות ממשיכות לפעול כסדרן, והיצוא הישראלי שומר על יציבותו.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">מה צפוי בימים הקרובים?</h2>

              <p className="text-lg leading-relaxed mb-6">
                במבט קדימה, הערכות הגורמים המקצועיים מצביעות על כך שהימים הקרובים יהיו קריטיים. ההנהגה הביטחונית
                והפוליטית תידרש לקבל החלטות אסטרטגיות חשובות, שיעצבו את המציאות לטווח הארוך.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                הציבור הישראלי ממשיך לעקוב אחר ההתפתחויות בדריכות, תוך הפגנת החוסן והאחדות המאפיינים את החברה הישראלית
                בתקופות של אתגר. מערכת הביטחון מדגישה כי תמשיך לעשות כל הנדרש להגנה על אזרחי ישראל.
              </p>
            </div>

            {/* Comments Section */}
            <CommentsSection articleId={id || "1"} />
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Related Articles */}
            <div className="sticky top-24">
              <h3 className="text-xl font-bold mb-4">כתבות קשורות</h3>
              <div className="space-y-4">
                {relatedArticles.map((related, index) => (
                  <NewsArticle
                    key={index}
                    title={related.title}
                    image={related.image}
                    category={related.category}
                    tags={related.tags}
                  />
                ))}
              </div>

              {/* Newsletter */}
              <div className="mt-8 bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20">
                <h3 className="text-lg font-bold mb-2">הירשם לניוזלטר</h3>
                <p className="text-sm text-muted-foreground mb-4">קבל את החדשות החשובות ישירות למייל</p>
                <input
                  type="email"
                  placeholder="המייל שלך"
                  className="w-full px-4 py-2 rounded-lg border mb-3 text-sm"
                />
                <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors">
                  הרשם עכשיו
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <NewsFooter />
    </div>
  );
};

export default Article;
