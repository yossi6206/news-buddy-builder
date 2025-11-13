const NewsFooter = () => {
  const sections = {
    חדשות: ["ביטחון", "פוליטיקה", "כלכלה", "בעולם", "ספורט"],
    תוכניות: ["אולפן מרכזי", "חדשות הערב", "פגוש את העיתונות", "מהדורה מרכזית"],
    אודות: ["אודותינו", "צור קשר", "פרסם אצלנו", "הצהרת נגישות"],
    עקוב: ["פייסבוק", "טוויטר", "אינסטגרם", "יוטיוב"],
  };

  return (
    <footer className="bg-card border-t mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {Object.entries(sections).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold text-foreground mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-3xl font-bold text-primary">N12</div>
            <div className="text-sm text-muted-foreground text-center">
              © 2025 N12 כל הזכויות שמורות | תנאי שימוש | מדיניות פרטיות
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NewsFooter;
