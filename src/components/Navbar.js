import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "context/AuthContext";

export default function Navbar() {
    const {user, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("login");
    }

    return (
        <nav className="navbar">
            <Link to="/">홈</Link>
            {user ? (
                <Link to="/login" onClick={handleLogout}>로그아웃</Link>
            ):(
                <Link to="/login">로그인</Link>
            )}
        </nav>
    );
}
