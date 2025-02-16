'use server'

async function getWeatherData({lat,long}: {lat:number,long:number}) {

    //test için
    const latitude = 41.0082; // İstanbul'un enlemi
    const longitude = 28.9784; // İstanbul'un boylamı
    const city = "İstanbul"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
    try {
        const res = await fetch(url);
        const data = await res.json()
        return data
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

export default getWeatherData;