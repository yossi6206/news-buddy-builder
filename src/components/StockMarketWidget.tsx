import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "./ui/card";

const StockMarketWidget = () => {
  const stocks = [
    { name: "תל אביב 125", value: "2,145.67", change: "+2.3%", up: true },
    { name: "תל אביב 35", value: "2,234.89", change: "+1.8%", up: true },
    { name: "דולר", value: "3.72", change: "-0.5%", up: false },
    { name: "יורו", value: "4.05", change: "+0.3%", up: true },
  ];

  return (
    <Card className="p-4 bg-gradient-to-br from-green-600 to-emerald-700 text-white overflow-hidden relative">
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />
      <div className="relative z-10">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          שוק ההון
        </h3>
        <div className="space-y-2">
          {stocks.map((stock, index) => (
            <div key={index} className="flex items-center justify-between bg-white/10 rounded-lg p-2 backdrop-blur-sm">
              <div className="flex-1">
                <p className="text-sm font-medium">{stock.name}</p>
                <p className="text-xs opacity-75">{stock.value}</p>
              </div>
              <div className={`flex items-center gap-1 font-bold text-sm ${stock.up ? 'text-green-200' : 'text-red-200'}`}>
                {stock.up ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {stock.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default StockMarketWidget;
