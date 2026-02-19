import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/Login";
import AdminDashboard from "./components/pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
