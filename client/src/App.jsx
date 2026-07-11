import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [copies, setCopies] = useState(1);
  const [pages, setPages] = useState(0);
  const [message, setMessage] = useState("");

  const [color, setColor] = useState("bw");
  const [pricePerPage, setPricePerPage] = useState(2);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const rate = color === "bw" ? 2 : 10;
    setPricePerPage(rate);
    setTotal(rate * pages * copies);
  }, [pages, copies, color]);

  const uploadPdf = async () => {
    if (!file) {
      setMessage("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://autoprint-hub-server.onrender.com/api/pdf/info",
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
      setMessage(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="app">
      <h1>AutoPrint Hub</h1>
    </div>
  );
}

export default App;

