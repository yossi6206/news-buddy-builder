import { Cloud, CloudRain, Sun, Wind } from "lucide-react";
import { Card } from "./ui/card";

const WeatherWidget = () => {
  const weatherDays = [
    { day: "היום", temp: "28°", icon: Sun, condition: "שמשי" },
    { day: "מחר", temp: "26°", icon: Cloud, condition: "מעונן" },
    { day: "שישי", temp: "24°", icon: CloudRain, condition: "גשום" },
    { day: "שבת", temp: "25°", icon: Wind, condition: "סוער" },
  ];

  return (
    <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
      <div className="relative z-10">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          מזג האוויר
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {weatherDays.map((day, index) => (
            <div key={index} className="text-center">
              <p className="text-xs mb-1 opacity-90">{day.day}</p>
              <day.icon className="h-6 w-6 mx-auto mb-1" />
              <p className="font-bold text-sm">{day.temp}</p>
              <p className="text-xs opacity-75">{day.condition}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default WeatherWidget;
