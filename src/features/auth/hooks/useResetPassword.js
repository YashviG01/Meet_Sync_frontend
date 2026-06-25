import { useState } from "react";

import { resetPassword }
from "../api/authApi";

const useResetPassword = () => {
  const [loading, setLoading] =
    useState(false);

  const updatePassword =
    async (token, password) => {
        console.log(password);
        console.log(token);
      try {
        setLoading(true);

        const data =
          await resetPassword(
            token,
            password
          );

        return {
          success: true,
          data,
        };

      } catch (error) {
        console.log("error occurred");
                console.log(password);

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
    updatePassword,
    loading,
  };
};

export default useResetPassword;