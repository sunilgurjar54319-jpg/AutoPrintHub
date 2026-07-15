import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      style={{
        background: "#2563eb",
        color: "#fff",
        padding: "20px",
        textAlign: "center",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h1>🖨️ AutoPrint Hub</h1>
      <p>Upload PDF • Pay Online • Auto Print</p>

      <div
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <Link to="/register-shop">
          <button
            style={{
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            🏪 Shop Register
          </button>
        </Link>

        <Link to="/login">
          <button
            style={{
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            🔐 Shop Login
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
