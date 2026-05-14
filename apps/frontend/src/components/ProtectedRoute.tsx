import { Navigate } from "react-router-dom";
import { ShieldAlert, LockKeyhole } from "lucide-react";
import { useAuthStore } from "../store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

const ProtectedRoute = ({
  children,
  roles,
}: ProtectedRouteProps) => {
  const { token, user } = useAuthStore();

  // Prevent redirect before auth loads
  if (token === undefined) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto"></div>

          <p className="mt-4 text-gray-600 text-lg font-medium">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Redirect if not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Unauthorized Access
  if (roles && !roles.includes(user?.role || "")) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md text-center">
          
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-4 rounded-full">
              <ShieldAlert
                size={50}
                className="text-red-500"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Access Denied
          </h1>

          <p className="text-gray-500 mt-3 leading-relaxed">
            You do not have permission to access this page.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-red-500 font-semibold">
            <LockKeyhole size={18} />
            Unauthorized Access
          </div>

          <button
            onClick={() => window.history.back()}
            className="mt-8 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;