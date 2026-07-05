import api from "../../../services/api/client";

export const scheduleMeetingApi = async (meetingData) => {
  const response = await api.post(
    "/meeting/scheduleMeeting",
    meetingData
  );

  return response.data;
};