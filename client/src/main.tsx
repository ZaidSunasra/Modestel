import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import { Command } from '@tauri-apps/plugin-shell';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "./context/theme";

Command.sidecar('binaries/backend').spawn();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
      <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
