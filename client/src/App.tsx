import { Router } from "./routes/routes";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  return <>
    <Toaster />
    <Router />
  </>
}

export default App;