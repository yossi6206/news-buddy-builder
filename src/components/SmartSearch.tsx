import { useState, useEffect } from "react";
import { Search, Clock, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  title: string;
  category: string;
  image_url: string | null;
  published_at: string | null;
}

export const SmartSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("recent-searches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      searchArticles(query);
    } else {
      setArticles([]);
    }
  }, [query]);

  const searchArticles = async (searchQuery: string) => {
    const { data, error } = await supabase
      .from("articles")
      .select("id, title, category, image_url, published_at")
      .or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`)
      .order("published_at", { ascending: false })
      .limit(8);

    if (!error && data) {
      setArticles(data);
    }
  };

  const handleSelect = (articleId: string, title: string) => {
    setOpen(false);
    navigate(`/article/${articleId}`);
    
    const updated = [title, ...recentSearches.filter(s => s !== title)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recent-searches", JSON.stringify(updated));
  };

  const getTimeAgo = (date: string | null) => {
    if (!date) return "";
    const now = new Date();
    const published = new Date(date);
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "עכשיו";
    if (diffInHours < 24) return `לפני ${diffInHours} שעות`;
    const diffInDays = Math.floor(diffInHours / 24);
    return diffInDays === 1 ? "אתמול" : `לפני ${diffInDays} ימים`;
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="text-white hover:bg-white/20 gap-2"
      >
        <Search className="h-4 w-4" />
        <span className="hidden md:inline text-xs text-white/70">Ctrl+K</span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="חפש מאמרים, נושאים או מילות מפתח..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>לא נמצאו תוצאות</CommandEmpty>

          {recentSearches.length > 0 && query.length === 0 && (
            <CommandGroup heading="חיפושים אחרונים">
              {recentSearches.map((search, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => setQuery(search)}
                  className="gap-2"
                >
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{search}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {articles.length > 0 && (
            <CommandGroup heading="מאמרים">
              {articles.map((article) => (
                <CommandItem
                  key={article.id}
                  onSelect={() => handleSelect(article.id, article.title)}
                  className="gap-3 py-3"
                >
                  {article.image_url && (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-primary font-medium">
                        {article.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {getTimeAgo(article.published_at)}
                      </span>
                    </div>
                    <div className="text-sm line-clamp-2">{article.title}</div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {query.length > 1 && articles.length === 0 && (
            <CommandGroup heading="המלצות">
              <CommandItem disabled className="gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  נסה לחפש לפי קטגוריה או מילת מפתח אחרת
                </span>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};
