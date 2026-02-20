import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
// import NetworkWeb from "../NetworkBackground";
import NetworkWeb from "../Networkkk";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const MOCK_EMAIL = "admin@example.com";
    const MOCK_PASSWORD = "admin123";

    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      localStorage.setItem("jwtToken", "mock-token-123");
      navigate("/admin");
    } else {
      setError("Invalid email or password!");
    }
  };

    return (
  <div className="relative min-h-screen bg-black flex items-center justify-center">
    <div className="absolute inset-0 z-0">
      <NetworkWeb />
    </div>

    <div className="relative z-10 w-full flex items-center justify-center px-4">
      <Card
        className="w-full max-w-md 
                   bg-white/5 
                   backdrop-blur-lg 
                   border border-white/10 
                   shadow-2xl 
                   rounded-xl"
      >
        <div className="text-center pt-8">
          <h2 className="text-3xl font-bold text-white tracking-widest">
            SPIDER AI
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mt-3 rounded-full"></div>
          {/* <p className="text-white/70 mt-4">Welcome back to Spider AI Admin Panel</p> */}
        </div>

        <CardContent className="px-8 py-8">
          <form onSubmit={handleLogin} className="space-y-5">
            
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black border border-gray-700 text-white
                         rounded px-4 py-3
                         focus:border-yellow-400 focus:ring-0"
              required
              autoComplete="off"
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black border border-gray-700 text-white
                         rounded px-4 py-3
                         focus:border-yellow-400 focus:ring-0"
              required
              autoComplete="off"
            />

            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300
                         text-black font-semibold py-3 rounded
                         uppercase tracking-wide transition"
            >
              Login
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  </div>
);

}