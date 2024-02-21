import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { IntlProvider } from "react-intl";
import spanishMessages from "./languages/es.json";
import englishMessages from "./languages/en.json";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import createAuthStore from "react-auth-kit/createStore";
import { runningInProd } from "./config.ts";
import AuthProvider from "react-auth-kit/AuthProvider";
import { UserSessionData } from "./utils/types.ts";

const authStore = createAuthStore<UserSessionData>({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: runningInProd,
});

const lang = navigator.language.split(/[-_]/)[0];
const messages = getMessages(lang);

function getMessages(lang: string) {
  switch (lang) {
    case "es":
      return spanishMessages;
    default:
      return englishMessages;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <AuthProvider store={authStore}>
        <BrowserRouter>
          <IntlProvider locale={lang} messages={messages}>
            <App />
          </IntlProvider>
        </BrowserRouter>
      </AuthProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
