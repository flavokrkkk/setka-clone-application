import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@shared/styles/global.css";
import App from "./app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);