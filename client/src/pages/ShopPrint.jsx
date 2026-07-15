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

  if (rates) {
    calculatePrice();
  }

}, [rates, printType, copies]);


  useEffect(() => {

  if (rates) {
    calculatePrice();
  }

}, [rates, printType, copies]);


  const getShop = async () => {

    try {

      const res = await axios.get(
        `https://autoprint-hub-server.onrender.com/api/shops/${shopId}`
      );

      setShop(res.data.shop);

    } catch(error) {

      console.log(error);

      setMessage("Shop Load Failed");

    }

  };


  const getRates = async () => {

    try {

      const res = await axios.get(
        `https://autoprint-hub-server.onrender.com/api/shops/settings/${shopId}`
      );

      setRates(res.data.settings);
      
      setRates(res.data.settings);

console.log("SETTINGS DATA:", res.data.settings);
    } catch(error) {

      console.log(error);

    }

  };


  const calculatePrice = () => {

    if (!rates) return;
    
    console.log("RATE DATA", rates);

    let rate = 0;


    switch(printType) {

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

    setMessage("Upload Success");


  } catch(error) {

    console.log(error);

    setMessage(
      error.response?.data?.message || error.message
    );

  }

};



const createOrder = async () => {


  if (!uploadedFileId) {

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

    setMessage(
      error.response?.data?.message || error.message
    );


  }

};



const startPayment = async () => {


  try {


    const res = await axios.post(

      "https://autoprint-hub-server.onrender.com/api/payment/create",

      {

        orderId,

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


        const verify = await axios.post(

          "https://autoprint-hub-server.onrender.com/api/payment/verify",

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


        if(verify.data.success){

          setOrderStatus(
            "Payment Completed ✅"
          );

        }


      }

    };


    const razor = new window.Razorpay(options);

    razor.open();


  } catch(error) {

    console.log(error);

    setMessage("Payment Failed");

  }

};
if (!shop) {

  return (
    <h2 style={{padding:"30px"}}>
      Loading Shop...
    </h2>
  );

}


return (

<div
style={{
  padding:"30px",
  maxWidth:"600px",
  margin:"auto"
}}
>


<h1>🖨️ AutoPrint Hub</h1>

<hr/>


<h2>{shop.shopName}</h2>

<h2>
Total Price : ₹{price}
</h2>

<p>
<b>Owner:</b> {shop.ownerName}
</p>

<p>
<b>Address:</b> {shop.address}
</p>

<p>
<b>Printer:</b> {shop.printerName}
</p>


<hr/>


<h3>Select Print Type</h3>


<select

value={printType}

onChange={(e)=>
setPrintType(e.target.value)
}

>


<option value="bwSingle">
B/W Single
</option>


<option value="bwDouble">
B/W Double
</option>


<option value="colorSingle">
Color Single
</option>


<option value="colorDouble">
Color Double
</option>


</select>



<br/><br/>


<h3>Copies</h3>
  Calculate Price

<input

type="number"

min="1"

value={copies}

onChange={(e)=>
setCopies(e.target.value)
}

/>



<h2>
Total Price : ₹{price}
</h2>



<hr/>


<h3>Select File</h3>


<input

type="file"

onChange={(e)=>
setFile(e.target.files[0])
}

/>


<br/><br/>


<button onClick={uploadFile}>
Upload File
</button>


<br/><br/>


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
marginTop:20,
padding:12,
background:"#e8f5e9",
borderRadius:8
}}
>

<b>Status:</b> {orderStatus}

</div>

)}



<p>
{message}
</p>



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


</div>

);

}

export default ShopPrint;
