const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// Storage setup
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

// Upload API
app.post("/upload", upload.single("file"), (req, res) => {
    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.json({ message: "File uploaded", fileUrl });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
