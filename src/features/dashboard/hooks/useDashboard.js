// features/dashboard/hooks/useDashboard.js

import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import getMyMeetingsApi from "../api/getMyMeetingsApi";
import useJoinMeeting from "../../join/hooks/useJoinMeeting";

const useDashboard = () => {
  const navigate = useNavigate();

  

  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
//reusing
  const { joinMeeting } = useJoinMeeting();

 
//fetching the meetings
  const fetchMeetings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyMeetingsApi();

      setMeetings(data || []);
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.message ||
        "Unable to load meetings.";

      setError(message);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  //navigation

  const handleStartMeeting = () => {
    navigate("/dashboard/start");
  };

  const handleScheduleMeeting = () => {
    navigate("/schedule");
  };

  const handleJoinPage = () => {
    navigate("/join");
  };

  //join the meet

  const handleJoinMeeting = async (roomId) => {
    await joinMeeting(roomId);
  };

 //copy invite link

  const handleCopyLink = async (roomId) => {
    try {
      const inviteLink =
        `${window.location.origin}/meeting/${roomId}`;

      await navigator.clipboard.writeText(inviteLink);

      toast.success("Invite link copied");
    } catch {
      toast.error("Unable to copy invite link");
    }
  };

 //refresh

  const refreshMeetings = () => {
    fetchMeetings();
  };


  // Derived State
 

  const organizedMeetings = meetings.filter(
    (meeting) => meeting.isHost
  );

  const joinedMeetings = meetings.filter(
    (meeting) => !meeting.isHost
  );

 

  return {
    loading,
    error,

    meetings,
    organizedMeetings,
    joinedMeetings,

    refreshMeetings,

    handleStartMeeting,
    handleScheduleMeeting,
    handleJoinPage,

    handleJoinMeeting,
    handleCopyLink,
  };
};

export default useDashboard;