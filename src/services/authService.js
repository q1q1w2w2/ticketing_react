import axios from "axios";

const API_URL = "http://localhost:8084/api/auth/login";

export async function loginService(email, password) {
    try {
        const response = await axios.post(API_URL,
            {email, password},
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message);
    }
}