import api from "../../../services/api/client";

export const joinMeeting = async (roomId) => {
    console.log("inside the joinapi call")
    console.log("room id when called",roomId)
    console.log("hitting this url endpoint",`/meetings/${roomId}/join`)
    const response = await api.post(
        `/meeting/${roomId}/join`
    );//this endpoint should hit after the user has entered the meet id on the joinmeeting page
console.log("respo from the request made",response)
    return response.data;
};