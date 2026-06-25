import { useState } from "react";
import { forgotPassword } from "../api/authApi";

const useForgotPassword = () => {
  const [loading, setLoading] =
    useState(false);

  const sendResetLink = async (
    email
  ) => {
    try {
      setLoading(true);

      const data =
        await forgotPassword(email);

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    sendResetLink,
    loading,
  };
};

export default useForgotPassword;