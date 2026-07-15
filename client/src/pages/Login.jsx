import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);


  const login = async () => {

    if (!mobile) {
      alert("Mobile number enter kare");
      return;
    }


    try {

      setLoading(true);


      const res = await api.post(
        "/shops/login",
        {
          mobile
        }
      );


      console.log(
        "LOGIN DATA:",
        res.data
      );


      const shop = res.data.shop;


      if (!shop) {

        alert("Shop data not found");
        return;

      }


      // Save complete shop data
      localStorage.setItem(
        "shop",
        JSON.stringify(shop)
      );


      alert("Login Successful");


      navigate("/dashboard");


    } catch (error) {


      console.log(error);


      alert(
        error.response?.data?.message ||
        "Login Failed"
      );


    } finally {

      setLoading(false);

    }

  };



  return (

    <div
      style={{
        maxWidth:"400px",
        margin:"50px auto",
        padding:"20px",
        textAlign:"center"
      }}
    >

      <h2>
        🔐 Shop Login
      </h2>


      <input

        type="text"

        placeholder="Enter Mobile Number"

        value={mobile}

        onChange={(e)=>
          setMobile(e.target.value)
        }

        style={{
          width:"100%",
          padding:"12px",
          fontSize:"16px"
        }}

      />


      <br />
      <br />


      <button

        onClick={login}

        disabled={loading}

        style={{
          width:"100%",
          padding:"12px",
          background:"#2563eb",
          color:"white",
          border:"none",
          borderRadius:"5px",
          cursor:"pointer"
        }}

      >

        {
          loading
          ?
          "Login..."
          :
          "Login"
        }

      </button>


    </div>

  );

}


export default Login;
