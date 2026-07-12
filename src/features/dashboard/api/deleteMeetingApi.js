import api from "../../../services/api/client";

export const deleteMeetingApi = async (roomId) => {
    console.log("inside the deleteapi call")
    console.log("room id when called",roomId)
    console.log("hitting this url endpoint for deleting a meeting",`/meeting/${roomId}`)
    const response = await api.delete(
        `/meeting/${roomId}`
    );//this endpoint should hit after the user has entered the meet id on the joinmeeting page
console.log("respo from the delete request made",response)
    return response.data;
};