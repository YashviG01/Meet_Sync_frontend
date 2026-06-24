import { useEffect } from "react";

import { getCurrentUser } from "../api/authApi";//api call

import useAuthStore from "../auth/store/authStore";//zustand

// to ensure :
// App starts
//  ↓
// loading=true
//  ↓
// /me request
//  ↓
// User found?
//  ↓
// YES -> setUser
// NO  -> clearUser
//  ↓
// loading=false

const useCurrentUser = () => {const setUser = useAuthStore(
  (state) => state.setUser
);

const clearUser = useAuthStore(
  (state) => state.clearUser
);

const setLoading = useAuthStore(
  (state) => state.setLoading
);

useEffect(() => {
  const fetchUser = async () => {
    try {
      setLoading(true);

      const data =
        await getCurrentUser();

      setUser(data.user);

    } catch (error) {
      clearUser();

    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);}



export default useCurrentUser;