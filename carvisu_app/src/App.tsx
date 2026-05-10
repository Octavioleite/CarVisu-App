import { Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./components/layout";
import { ProtectedRoute, PublicRoute } from "./components/routes";

// Pages
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Credits from "./pages/Credits";
import Generate from "./pages/Generate";
import Result from "./pages/Result";
import History from "./pages/History";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Always public */}
          <Route path="/" element={<LandingPage />} />

          {/* Guest-only (redirect to /dashboard if already logged in) */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
          </Route>

          {/* Protected (redirect to /login if not authenticated) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/result/:id" element={<Result />} />
            <Route path="/history" element={<History />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
