import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/Login";
import AdminDashboard from "./components/pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
