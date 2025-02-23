"use server";

export async function getWeatherData(lat: number, long: number) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Hava durumu bilgisi alınamadı.");
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("API Hatası:", error);
    return { error: "Hava durumu bilgisi alınamadı." };
  }
}
