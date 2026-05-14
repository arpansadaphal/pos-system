import { Navigate } from "react-router-dom";

import {
  ShieldBan,
  Lock,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

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

  // LOADING SCREEN
  if (token === undefined) {
    return (
      <div className="relative h-screen overflow-hidden bg-[#020617] flex items-center justify-center">

        {/* Animated Background */}
        <div className="absolute inset-0">
          
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full animate-pulse"></div>

          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/20 blur-[120px] rounded-full animate-pulse"></div>
        </div>

        {/* Loader Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl px-12 py-10 text-center"
        >
          
          <div className="relative flex justify-center">

            <div className="absolute w-24 h-24 rounded-full border-4 border-cyan-500/20"></div>

            <div className="w-24 h-24 rounded-full border-t-4 border-cyan-400 animate-spin"></div>

            <Sparkles
              className="absolute top-0 right-0 text-cyan-300"
              size={20}
            />
          </div>

          <h1 className="mt-8 text-3xl font-bold text-white">
            Secure Access
          </h1>

          <p className="mt-3 text-gray-300">
            Verifying authentication...
          </p>
        </motion.div>
      </div>
    );
  }

  // REDIRECT IF NOT LOGGED IN
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // UNAUTHORIZED ACCESS
  if (roles && !roles.includes(user?.role || "")) {
    return (
      <div className="relative h-screen overflow-hidden bg-black flex items-center justify-center">

        {/* Glow Background */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-red-500/20 blur-[150px] rounded-full"></div>

        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-pink-500/20 blur-[150px] rounded-full"></div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-[90%] max-w-lg bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[36px] p-10 shadow-[0_0_60px_rgba(255,0,0,0.15)] text-center overflow-hidden"
        >

          {/* Floating Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent"></div>

          {/* Icon */}
          <div className="flex justify-center">

            <div className="relative">
              
              <div className="absolute inset-0 bg-red-500 blur-3xl opacity-40 rounded-full"></div>

              <div className="relative bg-red-500/10 border border-red-500/20 p-6 rounded-full">
                
                <ShieldBan
                  size={70}
                  className="text-red-400"
                />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-5xl font-black tracking-wide text-white">
            403
          </h1>

          <h2 className="text-3xl font-bold text-red-400 mt-2">
            ACCESS FORBIDDEN
          </h2>

          {/* Description */}
          <p className="mt-5 text-gray-300 leading-relaxed text-lg">
            This route is protected and your role
            does not have the required permission.
          </p>

          {/* Badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-sm font-semibold">
            
            <Lock size={16} />

            Restricted Resource
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">

            {/* Back */}
            <button
              onClick={() => window.history.back()}
              className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white py-3 rounded-2xl font-semibold transition-all duration-300"
            >
              <ChevronLeft size={18} />

              Go Back
            </button>

            {/* Login */}
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
              className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:scale-[1.03] text-white py-3 rounded-2xl font-semibold shadow-xl transition-all duration-300"
            >
              Logout
            </button>
          </div>

          {/* Footer */}
          <p className="mt-8 text-xs text-gray-500">
            Protected by Secure POS Authentication
          </p>
        </motion.div>
      </div>
    );
  }

  // AUTHORIZED CONTENT
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

export default ProtectedRoute;