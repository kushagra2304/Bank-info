import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/Login";
import AdminDashboard from "./components/pages/Dashboard";
import Navbar from "./components/Navbar";
// import Navbar1 from "./components/Navbar1";
import Banks from "./components/pages/Banks";
import Entity from "./components/pages/Entity";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      {/* <Navbar1 /> */}

      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/banks" element={<Banks />} />
          <Route path="/entity" element={<Entity />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;
