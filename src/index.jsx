import React from "react";
import ReactDOM  from "react-dom/client"
import App from "./App.jsx"
import { AlertProvider } from "@/contexts/AlertContext.jsx";
import { UserProvider } from "@/contexts/UserContext.jsx";

import "@/styles/theme.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </UserProvider>
  </React.StrictMode>
);
