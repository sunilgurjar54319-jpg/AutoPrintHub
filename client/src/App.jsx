import RegisterShop from "./pages/RegisterShop";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ShopPrint from "./pages/ShopPrint";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/shop/:shopId" element={<ShopPrint />} />
  <Route path="/register-shop" element={<RegisterShop />} />
  <Route path="/login" element={<Login />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
  );
}

export default App;
