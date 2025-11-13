import { PlayCircle, Radio } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const LiveVideoSection = () => {
  return (
    <Card className="overflow-hidden bg-card">
      <div className="relative h-64 bg-gradient-to-br from-red-900 to-red-950 flex items-center justify-center">
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full animate-pulse">
          <Radio className="h-4 w-4" />
          <span className="text-sm font-bold">שידור חי</span>
        </div>
        <PlayCircle className="h-20 w-20 text-white/90 hover:text-white hover:scale-110 transition-all cursor-pointer" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white font-bold text-lg mb-1">חדשות הערב עם דני קושמרו</h3>
          <p className="text-white/80 text-sm">מהדורה מרכזית | 20:00</p>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-bold mb-3 text-foreground">תוכניות מומלצות</h4>
        <div className="space-y-2">
          {[
            { title: "אולפן מרכזי", time: "17:00" },
            { title: "פגוש את העיתונות", time: "18:30" },
            { title: "סיכום היום", time: "23:00" },
          ].map((show, index) => (
            <div className="flex items-center justify-between p-2 hover:bg-muted rounded-xl transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{show.title}</span>
              </div>
              <Badge variant="outline" className="text-xs">{show.time}</Badge>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default LiveVideoSection;
