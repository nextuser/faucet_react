import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import App from "./App.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
    <Theme appearance="light">
    <App />
    </Theme>
);
