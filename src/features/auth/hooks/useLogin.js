import { useState } from "react";

import { loginUser } from "../api/authApi";

import useAuthStore from "../auth/store/authStore";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const setUser = useAuthStore(
    (state) => state.setUser//mark the user as authenticated thus would be redirected to the dashboard
  );

  const login = async (formData) => {
    try {
      setLoading(true);

      const data = await loginUser(
        formData
      );

      setUser(data.user);

      return {
        success: true,
      };

    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Login failed",
      };

    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
  };
};

export default useLogin;