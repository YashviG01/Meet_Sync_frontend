
import { useState } from "react";
import { deleteMeetingApi } from "../api/deleteMeetingApi";

export default function useDeleteMeeting(onSuccess) {
  const [loading, setLoading] = useState(false);

  const deleteMeeting = async (roomId) => {
    console.log("inside the delete meeting hook with room id", roomId);
    try {
      setLoading(true);

      const response = await deleteMeetingApi(roomId);
console.log("response inside the delete hook",response)
      if (response.success) {
        onSuccess?.(roomId);
      }

      return response;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteMeeting,
    loading,
  };
}