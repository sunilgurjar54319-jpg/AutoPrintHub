import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import ShopPrint from "./pages/ShopPrint";
import RegisterShop from "./pages/RegisterShop";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>

      {/* Shop Owner */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register-shop" element={<RegisterShop />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />

      {/* Customer */}
      <Route path="/shop/:shopId" element={<ShopPrint />} />

      {/* Unknown URL */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;
