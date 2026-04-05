import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/react";
import { dark } from "@clerk/themes";
import { Provider } from "react-redux";
import { store } from "./app/store.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#7c3aed",
          colorBackground: "#0d0d1a",
          colorText: "#ffffff",
          colorTextSecondary: "#ffffff",
          colorNeutral: "#ffffff",
          colorTextOnPrimaryBackground: "#ffffff",
        },
        elements: {
          // Make all label/header text white
          profileSectionTitle: "text-white",
          profileSectionTitleText: "text-white",
          formFieldLabel: "text-white",
          tableHead: "text-white",
          navbarButton: "text-white",
          navbarButtonIcon: "text-white",
          headerTitle: "text-white",
          headerSubtitle: "text-white",
          profileSectionContent: "text-white",
          identityPreviewText: "text-white",
          accordionTriggerButton: "text-white",
          // Sidebar specifically
          menuButton: "text-white",
          menuButtonIconBox: "text-white",
          formButtonPrimary: `
            !text-white 
            !bg-gradient-to-r !from-purple-500 !to-purple-700
            !shadow-lg !shadow-purple-500/30
            !border !border-white/10
            backdrop-blur-md
            hover:!shadow-purple-500/50 
            hover:scale-[1.02]
            active:scale-[0.98]
            transition-all duration-200
          `,
        },
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ClerkProvider>
  </BrowserRouter>,
);
