import axios from "axios";

function PriceCard({ pages, copies, color, total }) {

  const rate = color === "bw" ? 2 : 10;

  const payNow = async () => {
    try {
      const res = await axios.post(
        "https://autoprint-hub-server.onrender.com/api/payment/create",
        {
          amount: total
        }
      );

      const order = res.data.order;

      const options = {
        key: "rzp_test_TBv0I8JsoAY5JU",
        amount: order.amount,
        currency: order.currency,
        name: "AutoPrint Hub",
        description: "PDF Printing Payment",
        order_id: order.id,

        handler: function (response) {
          alert("Payment Successful");
          console.log(response);
        },

        theme: {
          color: "#2563eb"
        }
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (error) {
      alert("Payment Failed");
      console.log(error);
    }
  };


  return (
    <div
      style={{
        background:"#fff",
        padding:"20px",
        borderRadius:"10px",
        marginTop:"20px"
      }}
    >

      <h2>💰 Price Details</h2>

      <p>Pages: {pages}</p>

      <p>Copies: {copies}</p>

      <p>
        Rate: ₹{rate}/page
      </p>

      <h3>
        Total Amount: ₹{total}
      </h3>

      <button
        onClick={payNow}
        style={{
          padding:"12px 25px",
          background:"#2563eb",
          color:"white",
          border:"none",
          borderRadius:"8px"
        }}
      >
        Pay Now ₹{total}
      </button>

    </div>
  );
}

export default PriceCard;
