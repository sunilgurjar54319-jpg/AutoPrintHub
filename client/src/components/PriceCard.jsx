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
      <button
  style={{
    marginTop: "15px",
    padding: "12px 25px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
  onClick={() => alert("Payment Coming Soon")}
>
  Pay Now ₹{total}
</button>
    </div>
  );
}

export default PriceCard;
