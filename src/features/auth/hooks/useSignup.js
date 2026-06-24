//import the user info
//the the api call
import { useState } from "react";

import { signupUser } from "../api/authApi";

import useAuthStore from "../auth/store/authStore";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  //setting the info
  const setUser = useAuthStore(
    (state) => state.setUser//authenticated user thus redirected to dashbaord
  );
//receive all the details in the form data
  const signup = async (formData) => {
    try {
        // before sending loading state true
      setLoading(true);
//sendin to backend endpoint,store the response in data
      const data = await signupUser(
        formData
      );
//store the user info in the zustand store for global access later
      setUser(data.user);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message,
      };
    } finally {

        //so that the button does not show creatingggg
      setLoading(false);
    }
  };

  //returns signup function and the loading state
  return {
    signup,
    loading,
  };
};

export default useSignup;