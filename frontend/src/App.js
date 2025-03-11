import React, { useState } from "react";
import axios from "axios";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import "./styles.css"; // Import CSS

const ModelViewer = ({ url }) => {
    const [model, setModel] = useState(null);

    React.useEffect(() => {
        if (!url) return;

        const loader = new OBJLoader();
        loader.load(url, (object) => {
            setModel(object);
        });
    }, [url]);

    return (
        <div className="viewer-container">
            <Canvas style={{ height: "500px", borderRadius: "8px", background: "#111827" }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                {model && <primitive object={model} position={[0, 0, 0]} />}
                <OrbitControls />
            </Canvas>
        </div>
    );
};

function App() {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setFileUrl(response.data.fileUrl);
            alert("File uploaded successfully!");
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed.");
        }
    };

    return (
        <div className="container">
            <h1>3D CAD Viewer</h1>
            <label className="custom-file-upload">
                <input type="file" onChange={handleFileChange} />
                Upload 3D Model
            </label>
            <button onClick={handleUpload}>Upload & View</button>

            {fileUrl && <ModelViewer url={fileUrl} />}
        </div>
    );
}

export default App;
