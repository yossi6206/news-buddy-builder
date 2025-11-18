import { Shield, Globe, DollarSign, Zap, Trophy, Newspaper } from "lucide-react";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";

const CategorySection = () => {
  const categories = [
    { name: "ביטחון", icon: Shield, color: "from-red-500 to-red-600", articles: 156 },
    { name: "בעולם", icon: Globe, color: "from-blue-500 to-blue-600", articles: 234 },
    { name: "כלכלה", icon: DollarSign, color: "from-green-500 to-green-600", articles: 189 },
    { name: "טכנולוגיה", icon: Zap, color: "from-purple-500 to-purple-600", articles: 145 },
    { name: "ספורט", icon: Trophy, color: "from-orange-500 to-orange-600", articles: 167 },
    { name: "כללי", icon: Newspaper, color: "from-gray-500 to-gray-600", articles: 312 },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground animate-fade-in-up">קטגוריות</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <Link key={index} to={`/category/${category.name}`}>
            <Card className={`stagger-item stagger-${index + 1} p-6 bg-gradient-to-br ${category.color} text-white hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-pointer group overflow-hidden relative`}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10 text-center">
                <category.icon className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                <p className="text-xs opacity-90">{category.articles} כתבות</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
