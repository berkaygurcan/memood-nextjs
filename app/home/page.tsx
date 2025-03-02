"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getWeatherData } from "../actions/getWeatherData";
import { getRecommendations } from "../actions/getRecommendation";

export default function Home() {
  const [weather, setWeather] = useState<{ temp: number; description: string; icon: string; city: string } | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const data = await getWeatherData(latitude, longitude);
            setWeather({
              temp: Math.round(data.main.temp),
              description: data.weather[0].main,
              icon: data.weather[0].icon,
              city: data.name,
            });
          } catch (err) {
            setError("Hava durumu bilgisi alınamadı.");
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError("Konum bilgisi alınamadı.");
          setLoading(false);
        }
      );
    } else {
      setError("Tarayıcınız konum hizmetlerini desteklemiyor.");
      setLoading(false);
    }
  }, []);

  const handleOnChange = (event: any) => {
      setInput(event.target.value)
  }

  const handleSubmit = async () => {
    try {
      const result = await getRecommendations(
        input, 
        weather?.temp.toString() || "Unknown",
        weather?.city || "Unknown",
        weather?.description || "Unknown"
      );
  
      // Yanıtı temizleyip sadece mekan önerilerini almak için:
      let responseText = result[0]?.generated_text || "";
      responseText = responseText.replace(/\[INST\].*?\[\/INST\]/s, "").trim(); // Promptu kaldır
  
      // Önerileri satırlara böl ve liste olarak sakla
      const recommendationsList = responseText.split("\n").filter((line:string) => line.match(/^\d+\./));

      console.log('recom', recommendationsList)
      
    } catch (error) {

    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-2xl mx-auto overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            
            <div className="sm:w-1/3 bg-gradient-to-br from-blue-400 to-blue-600 p-4 text-white flex flex-col justify-center items-center">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-sm text-red-500">{error}</p>
              ) : (
                <>
                  <p className="text-4xl font-bold mb-1">{weather?.temp}°C</p>
                  <p className="text-lg mb-1">{weather?.description}</p>

                  {weather?.icon && (
                    <div className="w-20 h-20 flex justify-center items-center">
                      <Image
                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                        alt={weather.description}
                        width={80}
                        height={80}
                        className="object-contain"
                        priority
                      />
                    </div>
                  )}
                  <p className="text-sm mt-2">{weather?.city}</p>
                </>
              )}
            </div>

            <div className="sm:w-2/3 p-6 bg-gray-50 flex flex-col justify-center">
              <div className="space-y-4 w-full max-w-md mx-auto">
                <Input placeholder="Enter your mood..." className="w-full" value={input} onChange={handleOnChange}/>
                <Button className="w-full" onClick={handleSubmit}>Get Recommendation</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
