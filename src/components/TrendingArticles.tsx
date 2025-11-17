import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "./ui/card";
import { Flame, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

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
      <Card className="p-4 bg-card">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Flame className="h-5 w-5 text-red-500" />
          כתבות חמות
        </h3>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-card">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Flame className="h-5 w-5 text-red-500" />
        כתבות חמות
      </h3>
      <div className="space-y-3">
        {trendingArticles?.map((article, index) => (
          <Link key={article.id} to={`/article/${article.id}`}>
            <div className="flex items-start gap-3 p-3 hover:bg-muted rounded-xl transition-colors cursor-pointer group">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-full font-bold text-sm flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h4>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-muted-foreground">{article.category}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Eye className="h-3 w-3" />
                    <span>{article.views?.toLocaleString() || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default TrendingArticles;
