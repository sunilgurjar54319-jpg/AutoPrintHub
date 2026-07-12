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



  useEffect(() => {

    getShop();
    getRates();

  }, []);



  const getShop = async () => {

    try {

      const res = await axios.get(

        `https://autoprint-hub-server.onrender.com/api/rates/${shopId}`

      );

      setShop(res.data.shop);

    } catch (error) {

      console.log(error);

      setMessage("Shop Load Failed");

    }

  };



  const getRates = async () => {

    try {

      const res = await axios.get(

        `https://autoprint-hub-server.onrender.com/api/shops/${shopId}`

      );

      setRates(res.data.rates);

    } catch (error) {

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

    } catch (error) {

  console.log(error);

  console.log(error.response?.data);

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

    } catch (error) {

      console.log(error);

      setMessage("Order Create Failed");

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
