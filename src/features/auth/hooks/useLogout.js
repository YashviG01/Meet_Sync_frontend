import useAuthStore from
"../auth/store/authStore"

import { logoutUser }
from "../api/authApi"

const useLogout = () => {
  const clearUser =
    useAuthStore(//clearing the zustand store
      (state) => state.clearUser
    );

  const logout = async () => {
    try {
      await logoutUser();

      clearUser();

      return {
        success: true,
      };

    } catch (error) {
      return {
        success: false,
      };
    }
  };

  return { logout };
};

export default useLogout;