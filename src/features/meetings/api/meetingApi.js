import api from "../../../services/api/client";

export const startInstantMeeting = async () => {
  const response = await api.post(
    "/meeting/start-instant"
  );
console.log(response)
console.log(response.data)
  return response.data;
};