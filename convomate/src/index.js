import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/Main.css"; // Updated to use consolidated Main.css
import { AuthProvider } from "./context/AuthContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);