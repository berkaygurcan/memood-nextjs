import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-2xl mx-auto overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              {/* Weather Information */}
              <div className="sm:w-1/3 bg-gradient-to-br from-blue-400 to-blue-600 p-4 text-white flex flex-col justify-center items-center">
                <p className="text-4xl font-bold mb-1">25°C</p>
                <p className="text-lg mb-1">Sunny</p>
                <p className="text-5xl">☀️</p>
              </div>

              {/* Input and Button */}
              <div className="sm:w-2/3 p-6 bg-gray-50 flex flex-col justify-center">
                <div className="space-y-4 w-full max-w-md mx-auto">
                  <Input placeholder="Enter your mood..." className="w-full" />
                  <Button className="w-full">Get Recommendation</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
   
  );
}
