import React, {useContext} from "react";
import {AuthContext} from "context/AuthContext";
import {useNavigate} from "react-router-dom";
import "assets/home.css";

export default function Home() {
    // const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleConcertButton = () => {
        navigate("/concert");
    };

    return (
        <div className="home-container">
            <h1>티켓팅 서비스</h1>
            <div>
                <button onClick={handleConcertButton}>콘서트 목록</button>
            </div>
        </div>
    );
}
