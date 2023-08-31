import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import ToastProviders from "./Components/ToastProviders.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/ReduxStore.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ClerkProvider
      publishableKey={import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY}
    >
      <Provider store={store}>
        <ToastProviders>
          <App />
        </ToastProviders>
      </Provider>
    </ClerkProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
