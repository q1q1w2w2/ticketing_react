import axios from "axios";

const API_URL = "http://localhost:8084/api/concert";

export async function getConcerts() {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message);
    }
}