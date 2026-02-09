import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/Login";
import AdminDashboard from "./components/pages/Dashboard";
function App() {
  return (
    <Routes>


      {/* Login Route */}
      <Route path="/" element={<LoginPage />} />
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />

     
    </Routes>
  );
}

export default App;
