import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "context/AuthContext";

export default function ProtectedRoute() {
    const { user, isLoading } = useContext(AuthContext);
    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (user === undefined) {
        return null;
    }

    if (!user) {
        // state => 원래 있던 페이지 기억
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}
