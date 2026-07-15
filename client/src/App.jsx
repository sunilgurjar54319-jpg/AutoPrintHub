import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ShopPrint from "./pages/ShopPrint";
import RegisterShop from "./pages/RegisterShop";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
<Route
  path="*"
  element={<h1 style={{padding:"50px"}}>AutoPrintHub Running ✅</h1>}
/>

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/shop/:shopId"
        element={<ShopPrint />}
      />

      <Route
        path="/register-shop"
        element={<RegisterShop />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
  path="/settings"
  element={<Settings />}
/>

<Route
  path="*"
  element={<Home />}
/>

    </Routes>

  );

}

export default App;
