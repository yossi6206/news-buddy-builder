import { AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

const BreakingNewsTicker = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getFormattedTime = () => {
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const breakingNews = [
    "דיווח: ישראל ומצרים מנהלות מגעים אינטנסיביים לעסקת שחרור חטופים",
    "שוק ההון: מדד תל אביב 35 עולה ב-1.2% בפתיחת המסחר",
    "מזג האויר: התחזית לימים הקרובים - גשמים כבדים בצפון הארץ",
  ];

  return (
    <div className="bg-[hsl(var(--breaking-news))] text-white overflow-hidden">
      <div className="container mx-auto px-4 py-2 flex items-center gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-bold text-sm">{getFormattedTime()}</span>
          <span className="text-sm">|</span>
          <AlertCircle className="h-4 w-4 animate-pulse-slow" />
          <span className="font-bold text-sm">ברוח טרנס</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-8 animate-marquee">
            {breakingNews.map((news, index) => (
              <span key={index} className="text-sm whitespace-nowrap">
                • {news}
              </span>
            ))}
            {breakingNews.map((news, index) => (
              <span key={`dup-${index}`} className="text-sm whitespace-nowrap">
                • {news}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;
