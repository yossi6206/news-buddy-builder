import { Clock } from "lucide-react";

const UpdatesSidebar = () => {
  const updates = [
    {
      author: "אלי לוי",
      title: "ראש הממשלה בהודעה חריגה: 'נמשיך בלחימה עד ניצחון מוחלט'",
      time: "15:23",
      isLive: true,
    },
    {
      author: "שרה כהן",
      title: "דיווח: ארצות הברית שולחת נושאת מטוסים נוספת לאזור",
      time: "14:45",
      isLive: false,
    },
    {
      author: "דוד מזרחי",
      title: "עסקת השבויים: פריצת דרך צפויה בימים הקרובים",
      time: "13:30",
      isLive: false,
    },
    {
      author: "רחל אברהם",
      title: "שוק ההון: מדד תל אביב 35 עולה ב-2.3%",
      time: "12:15",
      isLive: false,
    },
  ];

  return (
    <aside className="w-80 gradient-primary text-updates-foreground p-6 flex-shrink-0 hidden lg:block sticky top-20 h-fit">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="h-6 w-6" />
        <h2 className="text-2xl font-bold">עדכונים שוטפים</h2>
      </div>
      <div className="space-y-4">
        {updates.map((update, index) => (
          <div
            key={index}
            className="bg-updates-item-bg text-foreground p-4 rounded-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-r-4 border-primary animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary">{update.author}</span>
                {update.isLive && (
                  <span className="flex items-center gap-1 text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse-slow">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    LIVE
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{update.time}</span>
            </div>
            <p className="text-sm leading-relaxed font-medium">{update.title}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-white/20">
        <button className="w-full bg-white text-primary font-bold py-3 rounded-lg hover:bg-white/90 transition-colors">
          צפה בכל העדכונים
        </button>
      </div>
    </aside>
  );
};

export default UpdatesSidebar;
