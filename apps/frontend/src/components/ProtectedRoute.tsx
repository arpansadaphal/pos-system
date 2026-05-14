import { Navigate } from "react-router-dom";

import {
  ShieldX,
  LoaderCircle,
  ArrowLeft,
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
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-black overflow-hidden">

        {/* Animated Background Glow */}
        <div className="absolute w-96 h-96 bg-blue-500/20 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>

        <div className="absolute w-80 h-80 bg-cyan-400/20 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

        {/* Loading Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl px-12 py-10 text-center"
        >
          
          <div className="flex justify-center mb-5">
            <div className="relative">
              
              <LoaderCircle
                size={70}
                className="animate-spin text-cyan-400"
              />

              <Sparkles
                size={22}
                className="absolute top-0 right-0 text-white"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white">
            Authenticating
          </h2>

          <p className="text-gray-300 mt-3 text-lg">
            Verifying secure access...
          </p>
        </motion.div>
      </div>
    );
  }

  // REDIRECT TO LOGIN
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ACCESS DENIED
  if (roles && !roles.includes(user?.role || "")) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#120000] via-[#220101] to-black overflow-hidden relative">

        {/* Animated Glow Effects */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-3xl"></div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(255,0,0,0.2)] rounded-[32px] p-10 w-[90%] max-w-lg text-center overflow-hidden"
        >

          {/* Top Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent pointer-events-none"></div>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            
            <div className="relative">

              <div className="absolute inset-0 bg-red-500 blur-2xl opacity-30 rounded-full"></div>

              <div className="relative bg-red-500/20 border border-red-400/30 p-6 rounded-full backdrop-blur-xl">
                <ShieldX
                  size={70}
                  className="text-red-400"
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-extrabold text-white tracking-wide">
            ACCESS
          </h1>

          <h2 className="text-5xl font-extrabold text-red-500 mt-1">
            DENIED
          </h2>

          {/* Description */}
          <p className="text-gray-300 mt-6 text-lg leading-relaxed">
            You don’t have permission to access
            this protected route.
          </p>

          {/* Role Badge */}
          <div className="mt-6 inline-flex items-center gap-2 bg-red-500/20 border border-red-400/30 text-red-300 px-5 py-2 rounded-full text-sm font-semibold">
            
            <ShieldX size={18} />

            Unauthorized User
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

            {/* Back Button */}
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>

            {/* Logout Button */}
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:scale-105 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all duration-300"
            >
              Logout
            </button>
          </div>
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