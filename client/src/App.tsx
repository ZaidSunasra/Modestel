import { Router } from "./routes/routes";
import { Toaster } from "./components/ui/toaster";
import { SidebarProvider } from "./components/ui/sidebar";
import { useTheme } from "./context/theme";

const App = () => {

  const { theme } = useTheme();
  return <div className={`${theme}`}>
    <SidebarProvider>
      <Toaster />
      <Router />
    </SidebarProvider>
  </div>

}

export default App;