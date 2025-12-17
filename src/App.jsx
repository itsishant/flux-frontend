import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import { Navigation } from "./components/Navigation";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PageTransition } from "./components/PageTransition";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { CreateReview } from "./pages/CreateReview";
import { Reviews } from "./pages/Reviews";
import { AllReviews } from "./pages/AllReviews";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/signup"
          element={
            <PageTransition>
              <Signup />
            </PageTransition>
          }
        />
        <Route
          path="/all-reviews"
          element={
            <PageTransition>
              <AllReviews />
            </PageTransition>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PageTransition>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path="/create"
          element={
            <PageTransition>
              <ProtectedRoute>
                <CreateReview />
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path="/reviews"
          element={
            <PageTransition>
              <ProtectedRoute>
                <Reviews />
              </ProtectedRoute>
            </PageTransition>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-950">
      <Router>
        <AuthProvider>
          <Navigation />
          <AnimatedRoutes />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
