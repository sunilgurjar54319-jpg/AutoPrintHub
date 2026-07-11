function PriceCard({ pages, copies, color, total }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>💰 Price Details</h2>

      <p>
        Pages: {pages}
      </p>

      <p>
        Copies: {copies}
      </p>

      <p>
        Type: {color === "bw" ? "Black & White" : "Color"}
      </p>

      <h3>
        Total: ₹{total}
      </h3>
    </div>
  );
}

export default PriceCard;
