import { Cloud, CloudRain, Sun, Wind } from "lucide-react";

const WeatherWidget = () => {
  const weatherDays = [
    { day: "היום", temp: "28°", icon: Sun, condition: "שמשי" },
    { day: "מחר", temp: "26°", icon: Cloud, condition: "מעונן" },
    { day: "שישי", temp: "24°", icon: CloudRain, condition: "גשום" },
    { day: "שבת", temp: "25°", icon: Wind, condition: "סוער" },
  ];

  return (
    <div className="bg-background border-b border-border py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Sun className="h-4 w-4 text-amber-500" />
          מזג האוויר
        </h3>
        <div className="flex items-center gap-6">
          {weatherDays.map((day, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <day.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{day.day}</span>
              <span className="font-bold text-foreground">{day.temp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;