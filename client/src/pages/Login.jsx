import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await api.post("/shops/login", {
        mobile,
      });

      localStorage.setItem(
        "shop",
        JSON.stringify(res.data.shop)
      );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      alert("Shop not found");
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 400, margin: "auto" }}>
      <h1>🏪 Shop Login</h1>

      <input
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 15,
        }}
      />

      <button
        onClick={login}
        style={{
          width: "100%",
          padding: 10,
        }}
      >
        Login
      </button>

      <br />
      <br />

      <Link to="/register-shop">
        Register New Shop
      </Link>
    </div>
  );
}

export default Login;
