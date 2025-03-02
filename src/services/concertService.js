import axios from "axios";

const API_URL = "http://localhost:8084/api/concert";

export async function getConcerts() {
    const token = localStorage.getItem("accessToken");
    try {
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

export async function getConcert(id) {
    const token = localStorage.getItem("accessToken");
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
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