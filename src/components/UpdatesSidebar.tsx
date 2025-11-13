import { MessageSquare } from "lucide-react";

interface Update {
  author: string;
  title: string;
  time: string;
  hasIcon?: boolean;
}

const UpdatesSidebar = () => {
  const updates: Update[] = [
    {
      author: "אור ויבר",
      title: 'פרקליטות המחוזה ת"א המשטרה החליטה לבית המשפט תחתוני בחיפה כנגד אישום נגד קטין חשוד כפור קד...',
      time: "10:13",
    },
    {
      author: "מבזק 12",
      title: 'יו"ר הדמוקרטים, אילק (גנמיל) יאיר מנדל: "טרוריסטים יהודיים יוצאים לילה לילה, לפגוע ללהרוג...',
      time: "10:27",
      hasIcon: true,
    },
    {
      author: "נילי הופקו: 'עשרני חיינו להחזיור, החממשלה חיינות להחזרור - חויבנים לסמך בה...",
      title: "",
      time: "10:28",
    },
    {
      author: "אור ויבר",
      title: "מדובר ישראל נשרו בתמונה לקריסת הגב בתמונת הדדק בגברעת אולדה: לגרבית המחזה התמוקה...",
      time: "10:38",
    },
    {
      author: "ידעל יפה",
      title: "רון לובל: מ'יהי השוטר אשר קולת נעשה במטמון, כל האחרונ תחזור שזה הא...",
      time: "10:40",
    },
  ];

  return (
    <aside className="w-80 bg-card border-l flex-shrink-0">
      <div className="sticky top-[120px]">
        {/* Header */}
        <div className="bg-updates-bg text-updates-foreground p-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          <h2 className="text-lg font-bold">כל העדכונים</h2>
        </div>

        {/* Updates List */}
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          {updates.map((update, index) => (
            <div
              key={index}
              className="p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-primary">
                      {update.author}
                    </span>
                    {update.hasIcon && (
                      <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        12
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed line-clamp-3">
                    {update.title}
                  </p>
                  <span className="text-xs text-article-time mt-2 inline-block">
                    {update.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default UpdatesSidebar;
