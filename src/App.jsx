import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login";
function App() {
  return (
    <Routes>


      {/* Login Route */}
      <Route path="/" element={<LoginPage />} />
     
    </Routes>
  );
}

export default App;
