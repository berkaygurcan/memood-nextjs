"use server";

export async function getRecommendations(mood: string, weather: string, location: string, weatherDescription: string) {
  const apiKey = process.env.HUGGINGFACE_API_KEY;

  const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: `[INST] The weather is ${weather}°C and ${weatherDescription}. I'm in ${location}, and I feel ${mood}. 
      I would like to do something that suits my mood. 
      Suggest 3 places that match my situation. Take into account the weather conditions and my specific mood. 
      Format the response as a numbered list. [/INST]`,      
    }),
  });

  const result = await response.json();
  return result;
}
