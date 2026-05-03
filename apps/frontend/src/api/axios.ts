// import axios from "axios";
// import { useAuthStore } from "../store/authStore";

// const api = axios.create({
//   baseURL: "https://sturdy-pancake-969qvv4p4xxq37r45-5000.app.github.dev/api",
// });

// api.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().token;

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://sturdy-pancake-969qvv4p4xxq37r45-5000.app.github.dev/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 🔥 IMPORTANT
  }

  return config;
});

export default api;