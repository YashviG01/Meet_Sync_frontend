import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import { Toaster } from "sonner";
import useCurrentUser from "./features/auth/hooks/useCurrentUser";
import ResetPassword from "./pages/ResetPassword";
import MeetingRoom from "./pages/MeetingRoom/MeetingRoom";

const App = () => {
  useCurrentUser();
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

<Route
path="/meeting/:roomId"
element={
    <ProtectedRoute>
        <MeetingRoom />
    </ProtectedRoute>
}
/>




      </Routes>
      <Toaster richColors />
    </>
  );
};

export default App;
