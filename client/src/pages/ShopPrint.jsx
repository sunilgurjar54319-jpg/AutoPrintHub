import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

    getShop();
    getRates();

  }, []);

  useEffect(() => {
  calculatePrice();
}, [rates, printType, copies]);

  const getShop = async () => {

  try {

    const res = await axios.get(
  `https://autoprint-hub-server.onrender.com/api/shops/${shopId}`
);

console.log("SHOP API RESPONSE:", res.data);

setShop(res.data.shop);

  } catch(error) {

    console.log(error);

    setMessage("Shop Load Failed");

  }

};



  const getRates = async () => {

  try {

    const res = await axios.get(
      `https://autoprint-hub-server.onrender.com/api/rates/${shopId}`
    );

    setRates(res.data.rates);

  } catch(error) {

    console.log(error);

  }

};



  const calculatePrice = () => {

    if (!rates) return;

    const rate = Number(

      rates[printType] || 0

    );

    setPrice(

      rate * Number(copies)

    );

  };
  const uploadFile = async () => {

    if (!file) {

      setMessage("Please select file");
      return;

    }

    try {

      const formData = new FormData();

      formData.append("file", file);
      formData.append("shopId", shopId);

      const res = await axios.post(

        "https://autoprint-hub-server.onrender.com/api/upload",

        formData,

        {

          headers: {

            "Content-Type": "multipart/form-data"

          }

        }

      );

      setUploadedFileId(res.data.fileId);

      setMessage(

        "Upload Success: " + res.data.fileId

      );

  }   catch(error) {

  console.log(error);

  console.log(error.response?.data);

  setMessage(
    error.response?.data?.message || error.message
  );

}

  };



  const createOrder = async () => {

  if(!uploadedFileId){

    setMessage("Please upload file first");
    return;

  }


  try {

    const res = await axios.post(

      "https://autoprint-hub-server.onrender.com/api/orders",

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

    setMessage("Order Created Successfully");


  } catch(error) {


    console.log(error);

    console.log(error.response?.data);


    setMessage(
      error.response?.data?.message || error.message
    );


  }

};

const startPayment = async () => {

console.log("APPWRITE ORDER ID:", orderId);

  try {

    const res = await axios.post(
      "https://autoprint-hub-server.onrender.com/api/payment/create",
      {
        orderId: orderId,
        amount: Number(price)
      }
    );


    const order = res.data.razorpayOrder;


    const options = {

      key: "rzp_test_TBv0I8JsoAY5JU",

      amount: order.amount,

      currency: order.currency,

      name: "AutoPrint Hub",

      description: "Printing Payment",

      order_id: order.id,


      handler: async function(response){

  try {

    const verify = await axios.post(
      "https://autoprint-hub-server.onrender.com/api/payment/verify",
      {
        orderId: orderId,

        razorpay_order_id:
          response.razorpay_order_id,

        razorpay_payment_id:
          response.razorpay_payment_id,

        razorpay_signature:
          response.razorpay_signature
      }
    );


    if(verify.data.success){

      setOrderStatus("Payment Completed ✅");
      alert("Payment Verified Successfully");

    } else {

      alert("Payment Verification Failed");

    }


  } catch(error){

    console.log(error);
    alert(
      error.response?.data?.message || "Verification Error"
    );

  }

},


      theme:{
        color:"#2563eb"
      }

    };


    const razor = new window.Razorpay(options);

    razor.open();


  } catch(error){

    console.log(error);

    alert("Payment Failed");

  }

};

  if (!shop) {

    return (

      <h2 style={{ padding: "30px" }}>

        Loading Shop...

      </h2>

    );

  }
  return (

    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>

      <h1>🖨️ AutoPrint Hub</h1>

      <hr />

      <h2>{shop.shopName}</h2>

      <p><b>Owner:</b> {shop.ownerName}</p>

      <p><b>Address:</b> {shop.address}</p>

      <p><b>Printer:</b> {shop.printerName}</p>

      <hr />

      <h3>Select Print Type</h3>

      <select
        value={printType}
        onChange={(e) => setPrintType(e.target.value)}
      >
        <option value="bwSingle">B/W Single</option>
        <option value="bwMultiple">B/W Multiple</option>
        <option value="colorSingle">Color Single</option>
        <option value="colorMultiple">Color Multiple</option>
      </select>

      <br /><br />

      <h3>Copies</h3>

      <input
        type="number"
        min="1"
        value={copies}
        onChange={(e) => setCopies(e.target.value)}
      />

      <br /><br />

      <button onClick={calculatePrice}>
        Calculate Price
      </button>

      <h2>Total Price : ₹{price}</h2>

      <hr />

      <h3>Select File</h3>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={uploadFile}>
        Upload File
      </button>

      <br /><br />

      <button
        onClick={createOrder}
        disabled={!uploadedFileId || price <= 0}
      >
        Create Order
      </button>
      <button
  onClick={startPayment}
  disabled={!orderId}
>
  Pay Now
</button>
{orderStatus && (
  <div
    style={{
      marginTop: 20,
      padding: 12,
      background: "#e8f5e9",
      borderRadius: 8,
      textAlign: "center"
    }}
  >
    <b>Status:</b> {orderStatus}
  </div>
)}
      <br /><br />

      {uploadedFileId && (
        <p>
          <b>File ID:</b> {uploadedFileId}
        </p>
      )}

      {orderId && (
        <p>
          <b>Order ID:</b> {orderId}
        </p>
      )}

      <p>{message}</p>

    </div>

  );

}

export default ShopPrint;
