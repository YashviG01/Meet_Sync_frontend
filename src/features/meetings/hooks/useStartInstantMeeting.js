import { useState } from "react";

import { startInstantMeeting } from "../api/meetingApi";

const useStartInstantMeeting = () => {
  const [loading, setLoading] =
    useState(false);

  const createMeeting = async () => {
    try {
      setLoading(true);

      const data =
        await startInstantMeeting();//calling the api

      return {
        success: true,
        meeting: data.meeting,//id,roomid,status,meeting link
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
    createMeeting,
    loading,
  };
};

export default useStartInstantMeeting;


//using tanstack
// import { useMutation } from "@tanstack/react-query";
// import { startInstantMeeting } from "../api/meetingApi";

// export const useStartInstantMeeting = () => {
//   return useMutation({
//     mutationFn: startInstantMeeting,
//   });
// };