// responsible for
// calling joinMeetingApi
// handling loading/error
// navigating
// showing toasts

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { joinMeeting } from "../../join/api/joinApi";

export default function useJoinMeeting() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const joinMeetingDashboard = async (roomId) => {
    console.log("inside the join dashboard api call hook")
    try {
      setLoading(true);

      const response = await joinMeeting(roomId);//hitting the join button with this room id
      console.log("resp inside the dashboard join call",response);
      if (response.success) {
        console.log("navigating from the dqshboard to the meet room with room id",roomId)
        navigate(`/meeting/${roomId}`);
      }

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    joinMeetingDashboard,
    loading,
  };
}

