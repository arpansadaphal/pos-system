import { useState } from "react";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

 const handleLogin = async () => {
  // alert("Login clicked");

  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    // alert("API success");

    // ✅ FIX: res.data is the token itself
    const token = res.data;

    if (!token) {
      alert("No token returned");
      return;
    }

    // setToken(res.data.token, res.data.user);
    setAuth(res.data.token, res.data.user);
    // alert("Token set, redirecting...");

    navigate("/");
  } catch (err: any) {
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

      <button onClick={handleLogin}>
        Login
      </button>

      <button onClick={() => setIsSignup(true)}>
        Create Account
      </button>
    </div>
  );
};

export default Login;

// import { useState } from "react";
// import api from "../api/axios";
// import { useAuthStore } from "../store/authStore";
// import Signup from "./Signup";
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const setToken = useAuthStore((state) => state.setToken);
//   const [isSignup, setIsSignup] = useState(false);

//  const handleLogin = async () => {
//   try {
//     const res = await api.post("/auth/login", {
//       email,
//       password,
//     });

//     setToken(res.data); // ✅ correct
//   } catch (err) {
//     alert("Login failed");
//   }
// };
// if (isSignup) {
//   return <Signup />;
// }
//   return (
    
//     <div>
//       <h2>Login</h2>

//       <input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button type="button" onClick={handleLogin}>
//   Login
// </button>
// <button onClick={() => setIsSignup(true)}>
//   Create Account
// </button>
//       {/* <p>API URL: {api.defaults.baseURL}</p> */}
//       {/* <pre>{JSON.stringify(debug, null, 2)}</pre> */}
//     </div>
//   );
// };

// export default Login;