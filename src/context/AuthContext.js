import React, {createContext, useState, useEffect} from "react";
import {loginService} from "services/authService";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const storedEmail = localStorage.getItem("userEmail");
        if (token) {
            setIsAuthenticated({isAuthenticated: true});
            setUserEmail(storedEmail);
        } else {
            setIsAuthenticated(null);
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await loginService(email, password);
            if (response.status === "OK") {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                localStorage.setItem("userEmail", email);
                setIsAuthenticated({isAuthenticated: true});
                setUserEmail(email);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userEmail");
        setIsAuthenticated(null);
        setUserEmail(null);

    }

    return (
        <AuthContext.Provider value={{user: isAuthenticated, login, logout, isLoading, userEmail}}>
            {children}
        </AuthContext.Provider>
    )
}