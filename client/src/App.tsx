import { Router } from "./routes/routes";
import { Toaster } from "./components/ui/toaster";
import { SidebarProvider } from "./components/ui/sidebar";

const App = () => {
  return <>
    <SidebarProvider>
      <Toaster />
      <Router />
    </SidebarProvider>
  </>
}

export default App;