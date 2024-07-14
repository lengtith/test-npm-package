import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./tailwind.css";

const root = document.getElementById("root");
if (!root) throw new Error("Cannot find root element with id root");
const app = createRoot(root);
app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);