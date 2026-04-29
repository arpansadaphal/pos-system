import { useState } from "react";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";
import Signup from "./Signup";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuthStore((state) => state.setToken);
  const [isSignup, setIsSignup] = useState(false);

 const handleLogin = async () => {
  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    setToken(res.data); // ✅ correct
  } catch (err) {
    alert("Login failed");
  }
};
if (isSignup) {
  return <Signup />;
}
  return (
    
    <div>
      <h2>Login</h2>

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

      <button type="button" onClick={handleLogin}>
  Login
</button>
<button onClick={() => setIsSignup(true)}>
  Create Account
</button>
      {/* <p>API URL: {api.defaults.baseURL}</p> */}
      {/* <pre>{JSON.stringify(debug, null, 2)}</pre> */}
    </div>
  );
};

export default Login;