import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import NetworkWeb from "../NetworkBackground";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (newRole) => {
    if (newRole) {
      setRole(newRole);
      setError("");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const MOCK_EMAIL = "admin@example.com";
    const MOCK_PASSWORD = "admin123";

    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      localStorage.setItem("jwtToken", "mock-token-123");
      localStorage.setItem("role", role);
      navigate("/admin");
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center bg-black">
  
  {/* Animated Background */}
  <NetworkWeb />

  {/* Dark Overlay (for better readability) */}
  {/* <div className="absolute inset-0 bg-black/60 "></div> */}

      {/* Top Branding Bar */}
      {/* <div className="flex justify-center items-center gap-8 py-6 border-b border-gray-800">
        <img src={azadiLogo} alt="Azadi Logo" className="h-12" />
        
        <div className="flex items-center gap-3">
          <img src={flagIndia} alt="India Flag" className="h-8" />
          <h1 className="text-white text-xl font-bold uppercase tracking-wider">
            Government of India
          </h1>
        </div>

        <img src={g20Logo} alt="G20 Logo" className="h-12" />
      </div> */}

      {/* Login Card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <Card className="w-full max-w-md 
                  bg-white/5 
                  backdrop-blur-lg 
                  border border-white/10 
                  shadow-2xl 
                  rounded-xl">
          
          <div className="text-center pt-8">
            <h2 className="text-3xl font-bold text-white tracking-widest">
              SPIDER AI
            </h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mt-3 rounded-full"></div>
          </div>

          <CardContent className="px-8 py-8">

            {/* Role Toggle */}
            <ToggleGroup
              type="single"
              value={role}
              onValueChange={handleRoleChange}
              className="mb-6 flex justify-center gap-3"
            >
              <ToggleGroupItem
                value="admin"
                className={`px-5 py-2 rounded text-sm uppercase tracking-wide transition ${
                  role === "admin"
                    ? "bg-red-600 text-white font-semibold"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                Admin
              </ToggleGroupItem>

              <ToggleGroupItem
                value="agent"
                className={`px-5 py-2 rounded text-sm uppercase tracking-wide transition ${
                  role === "agent"
                    ? "bg-red-600 text-white font-semibold"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                Agent
              </ToggleGroupItem>
            </ToggleGroup>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">

              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border border-gray-700 text-white
                           rounded px-4 py-3
                           focus:border-red-600 focus:ring-0"
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
                           focus:border-red-600 focus:ring-0"
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
                className="w-full bg-yellow-400 hover:bg-yellow-300 transition
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
