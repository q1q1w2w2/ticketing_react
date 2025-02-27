import axios from "axios";

const API_URL = "http://localhost:8084/api/reservation";

export async function ticketing(id) {
    const token = localStorage.getItem("accessToken");
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

export async function getReservations() {
    const token = localStorage.getItem("accessToken");
    try {
        const response = await axios.get(
            API_URL,
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