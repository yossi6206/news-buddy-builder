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
    <aside className="w-[320px] bg-card flex-shrink-0 hidden lg:block sticky top-20 h-fit border border-border rounded-xl">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-3 flex items-center gap-2 rounded-t-xl">
        <div className="bg-white text-primary rounded-lg p-1">
          <Clock className="h-4 w-4" />
        </div>
        <h2 className="text-base font-bold">איש הכתבים</h2>
      </div>

      {/* Updates List */}
      <div className="p-3 space-y-3 max-h-[600px] overflow-y-auto">
        {updates.map((update, index) => (
          <div
            key={index}
            className="border-b border-border pb-3 last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-primary">{update.author}</span>
                  {update.isLive && (
                    <span className="flex items-center gap-1 text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded-lg font-bold">
                      דוח חיוני
                    </span>
                  )}
                </div>
                <p className="text-xs leading-snug text-foreground">{update.title}</p>
                <span className="text-[10px] text-red-600 font-medium mt-1 inline-block">{update.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer Button */}
      <div className="p-3 border-t border-border">
        <button className="w-full bg-primary text-primary-foreground font-bold py-2 text-sm rounded-xl hover:bg-primary/90 transition-colors">
          לכל ההודעות
        </button>
      </div>
    </aside>
  );
};

export default UpdatesSidebar;
