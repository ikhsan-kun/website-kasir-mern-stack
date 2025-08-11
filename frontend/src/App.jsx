import { Routes, Route } from "react-router-dom";
import "./index.css";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminDashboard />} />
    </Routes>
  );
}
