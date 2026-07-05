import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { joinMeeting } from "../api/joinApi";

const useJoinMeeting = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setRoomId(e.target.value);//updating the state
  };

  const handleJoin = async () => {
    console.log("join button clicked");
    console.log(roomId);
    if (!roomId.trim()) {
      setError("Please enter a Meeting ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      console.log("sending request");
      const response = await joinMeeting(roomId.trim());
      console.log("request at join endpoint made")
      console.log("resp received from the request", response);
      navigate(`/meetings/${response.roomId}`);
      console.log("navigated to the meet room");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Unable to join meeting.");
    } finally {
      setLoading(false);
    }
  };

  return {
    roomId,
    loading,
    error,
    handleChange,
    handleJoin,
  };
};

export default useJoinMeeting;
