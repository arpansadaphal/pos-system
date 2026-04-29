import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import POS from "./pages/POS";
import Login from "./pages/Login";

function App() {
  const { token, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, []);

  // 🔐 simple route protection
  if (!token) return <Login />;

  return <POS />;
}

export default App;