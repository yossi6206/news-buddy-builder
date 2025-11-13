import { Search, LogIn, LogOut, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/useUserRole";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const NewsHeader = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const { canManageContent, loading: roleLoading } = useUserRole(user);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
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

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm">
      {/* Top Red Bar */}
      <div className="bg-news-header text-news-header-foreground">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm">חמישי 13.11.25</span>
            <span className="text-sm">החדשות</span>
          </div>
          <Link to="/" className="text-3xl font-bold tracking-wider hover:opacity-90 transition-opacity">
            N12
          </Link>
          <div className="flex items-center gap-2">
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
                    <Settings className="h-4 w-4" />
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
          <div className="flex items-center justify-center py-3 relative">
            <button className="absolute left-0 p-2 hover:bg-muted rounded-md transition-colors">
              <Search className="h-5 w-5" />
            </button>
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
