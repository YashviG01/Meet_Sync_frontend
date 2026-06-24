import { useEffect } from "react";

import { getCurrentUser } from "../api/authApi";//api call

import useAuthStore from "../auth/store/authStore";//zustand

const useCurrentUser = () => {
  const setUser = useAuthStore(
    (state) => state.setUser
  );//setting the data

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data =
          await getCurrentUser();

        setUser(data.user);

      } catch (error) {
        console.log(
          "No authenticated user"
        );
        console.log(error.message);
      }
    };

    fetchUser();
  }, [setUser]);
};

export default useCurrentUser;