import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "./ui/card";
import { Flame, Eye, TrendingUp, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";

const TrendingArticles = () => {
  const { data: trendingArticles, isLoading } = useQuery({
    queryKey: ["trending-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, category, views, image_url")
        .order("views", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <Card className="p-6 bg-gradient-to-br from-card via-card to-card/50 border-border/50 shadow-lg overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
          <div className="relative">
            <Flame className="h-6 w-6 text-red-500 animate-pulse" />
            <Sparkles className="h-3 w-3 text-orange-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            כתבות חמות
          </span>
        </h3>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-card via-card to-card/50 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative group/card">
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>
      
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
          <div className="relative">
            <Flame className="h-6 w-6 text-red-500 animate-pulse" />
            <Sparkles className="h-3 w-3 text-orange-400 absolute -top-1 -right-1 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            כתבות חמות
          </span>
          <TrendingUp className="h-4 w-4 text-orange-500 mr-auto animate-bounce" style={{ animationDelay: '1s' }} />
        </h3>
        
        <div className="space-y-2">
          {trendingArticles?.map((article, index) => {
            const isTopThree = index < 3;
            const rankColors = [
              "from-yellow-500 to-orange-600",
              "from-gray-400 to-gray-600", 
              "from-orange-600 to-orange-800"
            ];
            
            return (
              <Link key={article.id} to={`/article/${article.id}`}>
                <div className="flex items-start gap-3 p-4 hover:bg-muted/50 rounded-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden backdrop-blur-sm border border-transparent hover:border-primary/20 hover:shadow-md">
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Rank badge */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br ${isTopThree ? rankColors[index] : 'from-muted to-muted-foreground/20'} text-white rounded-xl font-bold text-sm shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      {index + 1}
                    </div>
                    {isTopThree && (
                      <div className="absolute -top-1 -right-1">
                        <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" style={{ animationDelay: `${index * 0.2}s` }} />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 relative z-10">
                    <h4 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors leading-tight">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge variant="outline" className="text-xs px-2 py-0.5 bg-primary/10 border-primary/20">
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                        <Eye className="h-3.5 w-3.5" />
                        <span className="font-medium">{article.views?.toLocaleString() || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default TrendingArticles;
