import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API = "https://autoprint-hub-server.onrender.com/api";

function ShopPrint() {

  const { shopId } = useParams();

  const [shop, setShop] = useState(null);
  const [rates, setRates] = useState(null);

  const [file, setFile] = useState(null);

  const [uploadedFileId, setUploadedFileId] = useState("");

  const [orderId, setOrderId] = useState("");

  const [printType, setPrintType] = useState("bwSingle");

  const [copies, setCopies] = useState(1);

  const [price, setPrice] = useState(0);

  const [message, setMessage] = useState("");

  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {

    loadShop();
    loadRates();

  }, []);

  useEffect(() => {

    calculatePrice();

  }, [rates, printType, copies]);

  async function loadShop() {

    try {

      const res = await axios.get(
        `${API}/shops/${shopId}`
      );

      setShop(res.data.shop);

    } catch (err) {

      console.log(err);

      setMessage("Shop Load Failed");

    }

  }

  async function loadRates() {

    try {

      const res = await axios.get(
        `${API}/shops/settings/${shopId}`
      );

      setRates(res.data.settings);

      console.log("SETTINGS:", res.data.settings);

    } catch (err) {

      console.log(err);

    }

  }

  function calculatePrice() {

    if (!rates) return;

    let rate = 0;

    switch (printType) {

      case "bwSingle":
        rate = Number(rates.bwSingle || 0);
        break;

      case "bwDouble":
        rate = Number(rates.bwDouble || 0);
        break;

      case "colorSingle":
        rate = Number(rates.colorSingle || 0);
        break;

      case "colorDouble":
        rate = Number(rates.colorDouble || 0);
        break;

      default:
        rate = 0;

    }

    setPrice(rate * Number(copies));

  }
  async function uploadFile() {

    if (!file) {

      setMessage("Please select a PDF file");
      return;

    }

    try {

      const formData = new FormData();

      formData.append("file", file);
      formData.append("shopId", shopId);

      const res = await axios.post(

        `${API}/upload`,

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }

      );

      setUploadedFileId(res.data.fileId);

      setMessage("✅ File Uploaded Successfully");

    } catch (err) {

      console.log(err);

      setMessage(
        err.response?.data?.message || "Upload Failed"
      );

    }

  }


  async function createOrder() {

    if (!uploadedFileId) {

      setMessage("Upload file first");
      return;

    }

    try {

      const res = await axios.post(

        `${API}/orders`,

        {

          shopId,

          fileId: uploadedFileId,

          fileName: file.name,

          printType,

          copies: Number(copies),

          totalPrice: Number(price)

        }

      );

      setOrderId(res.data.order.$id);

      setMessage("✅ Order Created");

    } catch (err) {

      console.log(err);

      setMessage(
        err.response?.data?.message || "Order Failed"
      );

    }

  }


  async function startPayment() {

    if (!orderId) {

      setMessage("Create order first");
      return;

    }

    try {

      const res = await axios.post(

        `${API}/payment/create`,

        {

          orderId,

          amount: Number(price)

        }

      );

      const razorOrder = res.data.razorpayOrder;

      const options = {

        key: "rzp_test_TBv0I8JsoAY5JU",

        amount: razorOrder.amount,

        currency: razorOrder.currency,

        name: "AutoPrint Hub",

        description: "Document Printing",

        order_id: razorOrder.id,

        handler: async function (response) {

          const verify = await axios.post(

            `${API}/payment/verify`,

            {

              orderId,

              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature

            }

          );

          if (verify.data.success) {

            setOrderStatus("✅ Payment Successful");

            setMessage(
              "Order Sent For Printing"
            );

          }

        }

      };

      const razor = new window.Razorpay(options);

      razor.open();

    } catch (err) {

      console.log(err);

      setMessage("Payment Failed");

    }

  }
  if (!shop) {
    return (
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h2>Loading Shop...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "650px",
        margin: "30px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        background: "#fff"
      }}
    >
      <h1>🖨️ {shop.shopName}</h1>

      <p><b>Owner:</b> {shop.ownerName}</p>
      <p><b>Address:</b> {shop.address}</p>

      <hr />

      <h3>📄 Upload Document</h3>

      <input
        type="file"
        accept=".pdf,image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={uploadFile}>
        Upload File
      </button>

      <hr />

      <h3>⚙️ Print Options</h3>

      <select
        value={printType}
        onChange={(e) => setPrintType(e.target.value)}
      >
        <option value="bwSingle">B/W Single Side</option>
        <option value="bwDouble">B/W Double Side</option>
        <option value="colorSingle">Color Single Side</option>
        <option value="colorDouble">Color Double Side</option>
      </select>

      <br /><br />

      <input
        type="number"
        min="1"
        value={copies}
        onChange={(e) => setCopies(e.target.value)}
      />

      <h2>💰 Total Price : ₹{price}</h2>

      <button
        onClick={createOrder}
        disabled={!uploadedFileId}
      >
        Create Order
      </button>

      <br /><br />

      <button
        onClick={startPayment}
        disabled={!orderId}
      >
        💳 Pay Now
      </button>

      <br /><br />

      {message && (
        <div
          style={{
            padding: "10px",
            background: "#eef",
            borderRadius: "5px"
          }}
        >
          {message}
        </div>
      )}

      {orderStatus && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            background: "#d4edda",
            borderRadius: "5px"
          }}
        >
          {orderStatus}
        </div>
      )}
    </div>
  );
}

export default ShopPrint;
