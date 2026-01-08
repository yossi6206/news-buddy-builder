import { LogIn, LogOut, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/useUserRole";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { SmartSearch } from "./SmartSearch";
import { ThemeToggle } from "./ThemeToggle";

const NewsHeader = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const { canManageContent, loading: roleLoading } = useUserRole(user);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Listen for auth changes FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // THEN get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const navItems = [
    "LIVE",
    "כל החדשות",
    "ביטחוני",
    "מדעי",
    "פוליטי",
    "בעולם",
    "באקו",
    "כלכלה",
    "DATA",
    "ספורט",
    "תוכניות",
    "mako",
  ];

  const getFormattedDateTime = () => {
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    const months = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
    
    const dayName = days[currentTime.getDay()];
    const date = currentTime.getDate();
    const month = months[currentTime.getMonth()];
    const year = currentTime.getFullYear();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes} ,${date} ${month} ${year}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm">
      {/* Top Red Bar */}
      <div className="bg-news-header text-news-header-foreground">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm">{getFormattedDateTime()}</span>
            <span className="text-sm">החדשות</span>
          </div>
          <Link to="/" className="text-3xl font-bold tracking-wider hover:opacity-90 transition-opacity">
            NEWS
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <SmartSearch />
            {user ? (
              <>
                <span className="text-sm hidden md:inline">{user.email}</span>
                {!roleLoading && canManageContent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/admin")}
                    className="text-white hover:bg-white/20"
                  >
                    <Settings className="h-4 w-4 ml-2" />
                    ניהול תוכן
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-white hover:bg-white/20"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/auth")}
                className="text-white hover:bg-white/20"
              >
                <LogIn className="h-4 w-4 ml-2" />
                התחבר
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-card border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-3">
            <div className="flex items-center gap-6 overflow-x-auto">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-sm font-medium whitespace-nowrap hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NewsHeader;
