import { useState, useEffect } from "react";
import api from "../services/api";
function Settings() {
const SHOP_ID = "SHOP1783907097192";

  bwSingle: "",
  bwDouble: "",
  colorSingle: "",
  colorDouble: "",
  upiId: ""
});const [form, setForm] = useState({
  bwSingle: "",
  bwDouble: "",
  colorSingle: "",
  colorDouble: "",
  upiId: "",
  receiverMode: "RAZORPAY",
  paytmMerchantUpi: "",
  paytmMid: ""
});

const loadSettings = async () => {
  try {

    const res = await api.get(
      `/shops/settings/${SHOP_ID}`
    );

      bwSingle: res.data.settings.bwSingle || "",
  bwDouble: res.data.settings.bwDouble || "",
  colorSingle: res.data.settings.colorSingle || "",
  colorDouble: res.data.settings.colorDouble || "",
  upiId: res.data.settings.upiId || ""
});setForm({
  bwSingle: res.data.settings.bwSingle || "",
  bwDouble: res.data.settings.bwDouble || "",
  colorSingle: res.data.settings.colorSingle || "",
  colorDouble: res.data.settings.colorDouble || "",
  upiId: res.data.settings.upiId || "",

  receiverMode: res.data.settings.receiverMode || "RAZORPAY",

  paytmMerchantUpi:
    res.data.settings.paytmMerchantUpi || "",

  paytmMid:
    res.data.settings.paytmMid || ""
});

  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  loadSettings();
}, []);

const saveSettings = async () => {
  try {

    await api.put("/shops/settings", {
      shopId: SHOP_ID,
      ...form
    });

    alert("Settings Saved Successfully");

  } catch (error) {

    console.log(error);
    alert("Save Failed");

  }
};

return (
    <div>

      <h2>⚙️ Settings</h2>

      <h3>Print Price</h3>

      <input
  value={form.bwSingle}
  onChange={(e) =>
    setForm({
      ...form,
      bwSingle: e.target.value
    })
  }
  placeholder="B/W Single Price"
/>
      <br /><br />

      <input
  value={form.bwDouble}
  onChange={(e) =>
    setForm({
      ...form,
      bwDouble: e.target.value
    })
  }
  placeholder="B/W Double Price"
/>
      <br /><br />

      <input
  value={form.colorSingle}
  onChange={(e) =>
    setForm({
      ...form,
      colorSingle: e.target.value
    })
  }
  placeholder="Color Single Price"
/>
      <br /><br />

      <input
  value={form.colorDouble}
  onChange={(e) =>
    setForm({
      ...form,
      colorDouble: e.target.value
    })
  }
  placeholder="Color Double Price"
/>
      <br /><br />

      
<input
  value={form.upiId}
  onChange={(e) =>
    setForm({
      ...form,
      upiId: e.target.value
    })
  }
  placeholder="Enter UPI ID"
/>
<br /><br /><h3>Payment Receiver</h3>

<select
  value={form.receiverMode}
  onChange={(e) =>
    setForm({
      ...form,
      receiverMode: e.target.value
    })
  }
>
  <option value="RAZORPAY">
    Razorpay
  </option>

  <option value="PAYTM">
    Paytm Business
  </option>

</select>

<br /><br />


<h3>Paytm Merchant UPI</h3>

<input
  value={form.paytmMerchantUpi}
  onChange={(e) =>
    setForm({
      ...form,
      paytmMerchantUpi: e.target.value
    })
  }
  placeholder="shopname@paytm"
/>

<br /><br />


<h3>Paytm MID</h3>

<input
  value={form.paytmMid}
  onChange={(e) =>
    setForm({
      ...form,
      paytmMid: e.target.value
    })
  }
  placeholder="Enter Paytm MID"
/>

<br /><br /><h3>Merchant UPI ID</h3>

      <input
  value={form.upiId}
  onChange={(e) =>
    setForm({
      ...form,
      upiId: e.target.value
    })
  }
  placeholder="Enter UPI ID"
/>
      <br /><br />

      <button onClick={saveSettings}>
  Save Settings
</button>

    </div>
  );
}

export default Settings;
