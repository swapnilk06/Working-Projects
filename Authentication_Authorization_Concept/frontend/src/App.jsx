// import React from "react";
// import { motion } from "framer-motion";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import { motion } from "framer-motion";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

export default function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-white flex flex-col items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          {showLogin ? "Login" : "Register"}
        </h1>
        {showLogin ? <LoginForm /> : <RegisterForm />}
        <p className="mt-4 text-center text-sm">
          {showLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setShowLogin(!showLogin)}
            className="text-blue-600 hover:underline ml-1"
          >
            {showLogin ? "Register" : "Login"}
          </button>
        </p>
      </motion.div>
    </main>
  );
}
