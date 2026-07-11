import api from "../../../services/api/client";

export const getMyMeetings = async () => {
  const response = await api.get("/meeting/");

  return response.data;
};