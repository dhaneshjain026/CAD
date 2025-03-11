import React from "react";
import ReactDOM from "react-dom/client"; // Ensure you're using "react-dom/client"
import App from "./App";

const rootElement = document.getElementById("root");  // Ensure this exists

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);  // Correct way
    root.render(<App />);
} else {
    console.error("Root element not found. Check index.html.");
}
