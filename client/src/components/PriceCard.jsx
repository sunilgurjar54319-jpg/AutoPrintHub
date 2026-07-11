function PriceCard({ pages, copies, color, total }) {
  const rate = color === "bw" ? 2 : 10;

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>💰 Price Details</h2>

      <p>
        Total Pages: {pages}
      </p>

      <p>
        Copies: {copies}
      </p>

      <p>
        Rate: ₹{rate} / page
      </p>

      <h3>
        Total Amount: ₹{total}
      </h3>
    </div>
  );
}

export default PriceCard;
