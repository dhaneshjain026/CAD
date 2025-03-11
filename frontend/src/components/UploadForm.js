import React, { useState } from "react";
import axios from "axios";

const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("model", file);

    const response = await axios.post("http://localhost:5000/upload", formData);
    onUpload(response.data.filename);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadForm;
