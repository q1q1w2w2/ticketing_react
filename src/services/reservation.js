import axios from "axios";

const API_URL = "http://localhost:8084/api/reservation";
const token = localStorage.getItem("accessToken");

export async function ticketing(id) {
    try {
        const response = await axios.post(
            API_URL,
            {concertId: id},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message);
        throw error;
    }
}