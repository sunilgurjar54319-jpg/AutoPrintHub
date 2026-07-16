import Header from "../components/Header";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Header />

      <div
        style={{
          textAlign: "center",
          marginTop: "80px"
        }}
      >
        <h1>🖨️ AutoPrintHub</h1>

        <p>Upload • Pay • Auto Print</p>

        <div style={{ marginTop: "30px" }}>
          <Link to="/register">
            <button
              style={{
                padding: "12px 25px",
                margin: "10px"
              }}
            >
              🏪 Shop Register
            </button>
          </Link>

          <Link to="/login">
            <button
              style={{
                padding: "12px 25px",
                margin: "10px"
              }}
            >
              🔐 Shop Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
