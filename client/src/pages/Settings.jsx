import { useState, useEffect } from "react";
import api from "../services/api";

function Settings() {

  const SHOP_ID = localStorage.getItem("shopId");

  const [form, setForm] = useState({
    bwSingle: "",
    bwDouble: "",
    colorSingle: "",
    colorDouble: ""
  });

  const loadSettings = async () => {
    try {

      const res = await api.get(`/shops/settings/${SHOP_ID}`);

      const settings = res.data.settings;

      setForm({
        bwSingle: settings.bwSingle || "",
        bwDouble: settings.bwDouble || "",
        colorSingle: settings.colorSingle || "",
        colorDouble: settings.colorDouble || ""
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

    <div style={{ padding: "30px", maxWidth: "500px", margin: "auto" }}>

      <h2>⚙️ Print Price Settings</h2>

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

      <button onClick={saveSettings}>
        💾 Save Settings
      </button>

    </div>

  );
}

export default Settings;
