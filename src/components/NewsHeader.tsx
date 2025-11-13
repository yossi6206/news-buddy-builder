import { Search } from "lucide-react";

const NewsHeader = () => {
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
          <div className="text-3xl font-bold tracking-wider">N12</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-card border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <button className="p-2 hover:bg-muted rounded-md transition-colors">
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
