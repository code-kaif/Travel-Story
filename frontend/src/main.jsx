import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-day-picker/style.css";
import "./index.css";

export const url = "http://localhost:5000";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
