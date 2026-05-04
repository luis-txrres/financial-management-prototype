import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState("demo");
  const [email, setEmail] = useState("demo@gmail.com");
  const [password, setPassword] = useState("demo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      username.trim() !== "demo" ||
      email.trim() !== "demo@gmail.com" ||
      password !== "demo"
    ) {
      toast.error("Invalid demo credentials", {
        description: "Use username demo, email demo@gmail.com, and password demo.",
      });
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);

    toast.success(isSignUp ? "Account created" : "Signed in", {
      description: "Demo session saved successfully.",
    });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            {isSignUp ? "Create your account" : "Sign in"}
          </CardTitle>
          <CardDescription>
            {isSignUp
              ? "Create an account to start tracking your spending."
              : "Sign in to access your financial dashboard."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="rounded-md bg-slate-50 border p-3 text-sm text-slate-600">
              Demo account: username <span className="font-medium">demo</span>,
              email <span className="font-medium">demo@gmail.com</span>,
              password <span className="font-medium">demo</span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="demo"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="demo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="demo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {isSignUp ? "Create account" : "Sign in"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Need an account? Create one"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}