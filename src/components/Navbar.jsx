import { useNavigate, useLocation } from "react-router-dom";
import azadiLogo from "../assets/azadiLogo.png";
import flagIndia from "../assets/flag-india.jpg";
import g20Logo from "../assets/g20-logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("role");
    navigate("/");
  };

  const isLoginPage = location.pathname === "/";

  return (
    <div className="bg-black border-b border-gray-800 px-8 py-4 flex justify-between items-center">
      
      {/* Left Side Logos */}
      <div className="flex items-center gap-6">
        <img src={azadiLogo} alt="Azadi Logo" className="h-10" />
        
        <div className="flex items-center gap-3">
          <img src={flagIndia} alt="India Flag" className="h-6" />
          <span className="text-white font-semibold uppercase tracking-wide text-sm">
            Government of India
          </span>
        </div>

        <img src={g20Logo} alt="G20 Logo" className="h-10" />
      </div>

      {/* Logout Button (Hidden on Login Page) */}
      {!isLoginPage && (
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 uppercase text-sm tracking-wide font-semibold transition"
        >
          Logout
        </button>
      )}
    </div>
  );
}
