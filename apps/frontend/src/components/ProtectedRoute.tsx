import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = ({ children, roles }: any) => {
  const { token, user } = useAuthStore();

  if (!token) return <Navigate to="/login" />;

  if (roles && !roles.includes(user?.role)) {
    return <div>Unauthorized</div>;
  }

  return children;
};

export default ProtectedRoute;

// import { Navigate } from "react-router-dom";
// import { useAuthStore } from "../store/authStore";

// const ProtectedRoute = ({ children }: any) => {
//   const token = useAuthStore((state) => state.token);

//   // ⛔ prevent premature redirect
//   if (token === undefined) return null;

//   if (!token) return <Navigate to="/login" />;

//   return children;
// };

// export default ProtectedRoute;