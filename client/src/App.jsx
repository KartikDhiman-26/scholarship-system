import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Apply from "./pages/Apply";
import AdminDashboard from "./pages/AdminDashboard";
import Status from "./pages/Status";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

function MainLayout() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="bg-white shadow-md px-8 py-4 flex items-center justify-between">

        {/* LEFT */}
        <h1 className="text-xl font-bold text-indigo-600">
          Chandigarh University
        </h1>

        {/* CENTER LINKS */}
        <div className="flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <Link className="text-gray-700 hover:text-indigo-600 transition" to="/">
            Register
          </Link>
          <Link className="text-gray-700 hover:text-indigo-600 transition" to="/login">
            Login
          </Link>
          <Link className="text-gray-700 hover:text-indigo-600 transition" to="/apply">
            Apply
          </Link>
          <Link className="text-gray-700 hover:text-indigo-600 transition" to="/status">
            Status
          </Link>
          <Link className="text-gray-700 hover:text-indigo-600 transition" to="/admin">
            Admin
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center space-x-4">
          {userEmail && (
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {userEmail}
            </span>
          )}

          {userEmail && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition transform hover:scale-105 duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* ANIMATED PAGE */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/apply"
            element={
              <ProtectedRoute>
                <Apply />
              </ProtectedRoute>
            }
          />

          <Route
            path="/status"
            element={
              <ProtectedRoute>
                <Status />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </motion.div>

    </div>
  );
}

export default App;