import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/webflow-base.css";
import "./styles/webflow-inline.css";
import "./styles/custom.css";
import "./scripts/bootstrap.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
