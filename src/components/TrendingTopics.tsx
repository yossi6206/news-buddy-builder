import { Hash, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const TrendingTopics = () => {
  const topics = [
    { tag: "בחירות_2025", count: "12.5K", trend: "+45%" },
    { tag: "מזג_אוויר", count: "8.2K", trend: "+32%" },
    { tag: "שוק_ההון", count: "6.7K", trend: "+28%" },
    { tag: "טכנולוגיה", count: "5.4K", trend: "+15%" },
    { tag: "ספורט", count: "4.8K", trend: "+12%" },
    { tag: "בריאות", count: "3.9K", trend: "+8%" },
  ];

  return (
    <Card className="p-4 bg-card">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        נושאים חמים
      </h3>
      <div className="space-y-3">
        {topics.map((topic, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full font-bold text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {index + 1}
              </div>
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{topic.tag}</span>
              </div>
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-foreground">{topic.count}</p>
              <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                {topic.trend}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TrendingTopics;
