import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");

  const login = async () => {

    try {

      const res = await api.post("/shops/login", {
        mobile
      });

      const shop = res.data.shop;

      localStorage.setItem(
        "shopId",
        shop.shopId
      );

      localStorage.setItem(
        "shopName",
        shop.shopName
      );

      alert("Login Successful");

      window.location.href = "/dashboard";

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (

    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px"
      }}
    >

      <h2>🏪 Shop Login</h2>

      <input
        type="text"
        placeholder="Enter Mobile Number"
        value={mobile}
        onChange={(e) =>
          setMobile(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px"
        }}
      />

      <br /><br />

      <button
        onClick={login}
        style={{
          width: "100%",
          padding: "12px"
        }}
      >
        Login
      </button>

    </div>

  );
}

export default Login;
