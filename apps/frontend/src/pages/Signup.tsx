import { useState } from "react";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";
import Login from "./Login";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [debug, setDebug] = useState<any>(null);
    const [goLogin, setGoLogin] = useState(false);
  const setToken = useAuthStore((state) => state.setToken);

  const handleSignup = async () => {
    try {
      setDebug("Creating user...");

      await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      setDebug("Signup success → logging in...");

      // 🔥 Auto login after signup
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      setToken(res.data.token || res.data); // supports both formats
    } catch (err: any) {
      setDebug({
        error: err.message,
        response: err.response?.data,
      });
    }
  };
if (goLogin) {
  return <Login />;
}
  return (
    <div>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Signup</button>
    <button onClick={() => setGoLogin(true)}>
  Back to Login
</button>
      {/* <pre>{JSON.stringify(debug, null, 2)}</pre> */}
    </div>
  );
};

export default Signup;