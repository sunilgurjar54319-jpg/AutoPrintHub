import axios from "axios";

function PriceCard({ pages, copies, color, total }) {

  const rate = color === "bw" ? 2 : 10;

  const payNow = async () => {
    try {

      // Create Razorpay Order
      const res = await axios.post(
        "https://autoprint-hub-server.onrender.com/api/payment/create",
        {
          amount: total
        }
      );

      const order = res.data.order;

      const options = {
        key: "YOUR_RAZORPAY_TEST_KEY",
        amount: order.amount,
        currency: order.currency,
        name: "AutoPrint Hub",
        description: "PDF Printing Payment",
        order_id: order.id,

        handler: async function (response) {

          try {

            const verify = await axios.post(
              "https://autoprint-hub-server.onrender.com/api/payment/verify",
              {
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,

                pages: pages,
                copies: copies,
                color: color,
                amount: total
              }
            );


            if (verify.data.success) {
              alert("Payment Verified Successfully");
              console.log(
                verify.data.order
              );
            }
            else {
              alert("Payment Verification Failed");
            }


          } catch (error) {

            console.log(error);
            alert("Verification Error");

          }

        },


        theme: {
          color: "#2563eb"
        }

      };


      const razor = new window.Razorpay(options);
      razor.open();


    } catch (error) {

      console.log(error);
      alert("Payment Failed");

    }
  };


  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.1)"
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
        Print Type:
        {color === "bw"
          ? " Black & White"
          : " Color"}
      </p>

      <p>
        Rate: ₹{rate} / page
      </p>


      <h3>
        Total Amount: ₹{total}
      </h3>


      <button
        onClick={payNow}
        style={{
          padding: "12px 25px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Pay Now ₹{total}
      </button>


    </div>
  );
}

export default PriceCard;
