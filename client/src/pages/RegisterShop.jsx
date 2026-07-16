import { useState } from "react";
import api from "../services/api";

function RegisterShop() {
  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [printerName, setPrinterName] = useState("");
  const [printerType, setPrinterType] = useState("");

  const [loading, setLoading] = useState(false);
  const [shop, setShop] = useState(null);
  const [shopUrl, setShopUrl] = useState("");
  const registerShop = async () => {
    try {
      setLoading(true);

      const res = await api.post(
  "/shops/register",
        {
          shopName,
          ownerName,
          mobile,
          address,
          printerName,
          printerType
        }
      );
      console.log(res.data.shop);
      alert(JSON.stringify(res.data.shop));

setShop(res.data.shop);
setShopUrl(res.data.shopUrl);

alert("Shop Registered Successfully");

    } catch (err) {
      alert(
        err.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register Shop</h2>

      <input
        placeholder="Shop Name"
        value={shopName}
        onChange={(e) => setShopName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Owner Name"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Printer Name"
        value={printerName}
        onChange={(e) => setPrinterName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Printer Type"
        value={printerType}
        onChange={(e) => setPrinterType(e.target.value)}
      />
      <br /><br />

      <button onClick={registerShop} disabled={loading}>
  {loading ? "Registering..." : "Register Shop"}
</button>

{shop && (
  <div style={{ marginTop: 30 }}>
    <h3>🎉 Shop Registered Successfully</h3>

    <p><b>Shop ID:</b> {shop.shopId}</p>

    <p><b>Shop Name:</b> {shop.shopName}</p>

    <p><b>Shop Link:</b></p>

    <input
  readOnly
  value={shopUrl}
  style={{ width: "100%" }}
/>

{shop.qrCode && (
  <>
    <br /><br />

    <img
      src={shop.qrCode}
      alt="Shop QR"
      width="220"
    />

    <br /><br />

    <a
      href={shop.qrCode}
      download={`QR-${shop.shopId}.png`}
    >
      <button>
        Download QR
      </button>
    </a>
  </>
)}
   
  </div>
)}

</div>
);
}

export default RegisterShop;
