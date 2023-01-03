import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";

export function init(component: React.ReactNode) {
  const appRoot = createRoot(document.getElementById("menu")!);
  const contentRoot = createRoot(document.getElementById("content")!);
  appRoot.render(<App />);
  contentRoot.render(component);
}
