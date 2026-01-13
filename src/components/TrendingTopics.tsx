import { Hash, Flame } from "lucide-react";

const TrendingTopics = () => {
  const topics = [
    { tag: "בחירות_2025", count: "12.5K" },
    { tag: "מזג_אוויר", count: "8.2K" },
    { tag: "שוק_ההון", count: "6.7K" },
    { tag: "טכנולוגיה", count: "5.4K" },
    { tag: "ספורט", count: "4.8K" },
  ];

  return (
    <div className="bg-background border-b border-border py-4">
      <div className="flex items-center gap-6">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Flame className="h-4 w-4 text-orange-500" />
          נושאים חמים
        </h3>
        <div className="flex items-center gap-4 overflow-x-auto">
          {topics.map((topic, index) => (
            <button
              key={index}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors whitespace-nowrap"
            >
              <Hash className="h-3 w-3 text-muted-foreground" />
              <span className="font-medium text-foreground">{topic.tag}</span>
              <span className="text-xs text-muted-foreground">({topic.count})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingTopics;