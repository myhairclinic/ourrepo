import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { LanguageProvider } from "./context/LanguageContext";
import { AdminProvider } from "./context/AdminContext";

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <AdminProvider>
      <App />
    </AdminProvider>
  </LanguageProvider>
);
