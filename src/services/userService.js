import axios from "axios";

const API_URL = "http://localhost:8084/api/users";

export async function signupService(email, password, username, tel) {
    try {
        const response = await axios.post(API_URL,
            {email, password, username, tel},
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