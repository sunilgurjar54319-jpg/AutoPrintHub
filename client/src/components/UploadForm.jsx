import { useState } from "react";
import axios from "axios";

function UploadForm({ setPages }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const uploadPdf = async () => {
    if (!file) {
      setMessage("Please select PDF");
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
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Upload Failed"
      );
    }
  };

  return (
    <div>
      <h2>📄 Upload PDF</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <br /><br />

      <button onClick={uploadPdf}>
        Upload PDF
      </button>

      <p>{message}</p>
    </div>
  );
}

export default UploadForm;
