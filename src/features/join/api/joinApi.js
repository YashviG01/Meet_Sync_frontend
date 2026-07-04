import api from "../../../services/api/client";

export const joinMeeting = async (roomId) => {
    const response = await api.post(
        `/meetings/${roomId}/join`
    );//this endpoint should hit after the user has entered the meet id on the joinmeeting page

    return response.data;
};