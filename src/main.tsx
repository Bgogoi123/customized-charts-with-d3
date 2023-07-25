import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { worker } from "./mocks/browser.ts";

if (import.meta.env.VITE_NODE_ENV === "development") {
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
