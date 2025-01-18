import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import { Command } from '@tauri-apps/plugin-shell';

const command = Command.sidecar('binaries/backend', ["args", "if", "any"]);
await command.spawn();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
