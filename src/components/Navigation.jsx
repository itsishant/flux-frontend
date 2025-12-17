import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navigation = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-15">
          <Link
            to="/"
            className="flex items-center gap-3 text-white font-bold text-xl lg:text-2xl hover:text-emerald-400 transition group"
          >
            <span className="text-2xl lg:text-3xl group-hover:scale-110 transition-transform">
              ⚡
            </span>
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              FLUX
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-emerald-400 transition font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/reviews"
                  className="text-gray-300 hover:text-emerald-400 transition font-medium"
                >
                  My Reviews
                </Link>
                <Link
                  to="/all-reviews"
                  className="text-gray-300 hover:text-emerald-400 transition font-medium"
                >
                  All Reviews
                </Link>
                <Link
                  to="/create"
                  className="text-gray-300 hover:text-emerald-400 transition font-medium"
                >
                  Create Review
                </Link>
                <div className="relative group">
                  <div className="flex items-center gap-3 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg transform group-hover:scale-110 transition-transform">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="absolute right-0 top-12 bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-64 z-50">
                    <p className="text-white font-semibold mb-1">
                      {user?.name}
                    </p>
                    <p className="text-gray-400 text-sm break-all">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-emerald-400 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-800 pt-4 space-y-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block text-gray-300 hover:text-emerald-400 py-2"
                >
                  Dashboard
                </Link>
                <Link
                  to="/reviews"
                  className="block text-gray-300 hover:text-emerald-400 py-2"
                >
                  My Reviews
                </Link>
                <Link
                  to="/all-reviews"
                  className="block text-gray-300 hover:text-emerald-400 py-2"
                >
                  All Reviews
                </Link>
                <Link
                  to="/create"
                  className="block text-gray-300 hover:text-emerald-400 py-2"
                >
                  Create Review
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-300 hover:text-emerald-400 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
