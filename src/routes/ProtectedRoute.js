import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "context/AuthContext";

export default function ProtectedRoute() {
    const { user, isLoading } = useContext(AuthContext);
    const location = useLocation();

    if (user === undefined || isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}
