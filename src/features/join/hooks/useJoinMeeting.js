import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { joinMeeting } from "../api/joinApi";
import { toast } from "sonner";

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
      const response = await joinMeeting(roomId.trim()); 
      
      
      console.log("resp received from the request", response);
      console.log("navigating to",response.roomId)


if (response.alreadyJoined) {
    toast.info(response.message);
    return;
}

toast.success("Joining meeting...");

      navigate(`/meetings/${response.roomId}`);
       return response;



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
