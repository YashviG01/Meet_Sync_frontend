import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import { Toaster } from "sonner"
import  useCurrentUser from "./features/auth/hooks/useCurrentUser"
const App = () => {


  useCurrentUser();
  return (
   <>
   

     <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />

    </Routes>
     <Toaster richColors/>
   </>
  );
};

export default App;
