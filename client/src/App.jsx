import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
 const [copies, setCopies] = useState(1);
  const [message, setMessage] = useState("");
  const [pages, setPages] = useState(0);

  const uploadPdf = async () => {
    if (!file) {
      setMessage("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
      "http://127.0.0.1:5000/api/pdf/info",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPages(res.data.pages);
      setMessage("PDF Upload Successful");
    } catch (err) {
      console.log("Error:", err);

      if (err.response) {
        console.log("Response:", err.response.data);
        setMessage(err.response.data.message || "Server Error");
      } else {
        setMessage(err.message);
      }
    }
  };

  return (
    <div className="app">
      <h1>AutoPrint Hub</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={uploadPdf}>Upload PDF</button>

      <h2>{message}</h2>
<div>
  <br />
  <label>Copies:</label>

  <input
    type="number"
    min="1"
    value={copies}
    onChange={(e) => setCopies(e.target.value)}
  />
</div>
      {pages > 0 && (
        <div>
          <h3>Total Pages: {pages}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
