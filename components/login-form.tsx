"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col items-center gap-6", className)} {...props}>
      <h1 className="text-3xl font-bold text-center">Welcome to Me Mood</h1>
      <p className="text-gray-600 text-center">
        To use the application, please log in.
      </p>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Sign in with your Google account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center space-x-3 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              onClick={() => signIn("google", { callbackUrl: "http://localhost:3000/home" })}
            >
              <FaGoogle className="text-xl text-blue-500" />
              <span className="text-lg font-medium text-gray-700">Continue with Google</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
