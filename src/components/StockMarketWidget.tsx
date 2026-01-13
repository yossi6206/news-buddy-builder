import { TrendingUp, TrendingDown } from "lucide-react";

const StockMarketWidget = () => {
  const stocks = [
    { name: "ת״א 125", value: "2,145.67", change: "+2.3%", up: true },
    { name: "ת״א 35", value: "2,234.89", change: "+1.8%", up: true },
    { name: "דולר", value: "3.72", change: "-0.5%", up: false },
    { name: "יורו", value: "4.05", change: "+0.3%", up: true },
  ];

  return (
    <div className="bg-background border-b border-border py-4">
      <div className="flex items-center gap-8">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-600" />
          שוק ההון
        </h3>
        <div className="flex items-center gap-6 overflow-x-auto">
          {stocks.map((stock, index) => (
            <div key={index} className="flex items-center gap-2 text-sm whitespace-nowrap">
              <span className="text-muted-foreground">{stock.name}</span>
              <span className="font-bold text-foreground">{stock.value}</span>
              <span className={`flex items-center gap-0.5 font-medium ${stock.up ? 'text-green-600' : 'text-red-600'}`}>
                {stock.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {stock.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockMarketWidget;