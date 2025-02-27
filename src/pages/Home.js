import React, {useContext} from "react";
import {AuthContext} from "context/AuthContext";
import {useNavigate} from "react-router-dom";
import "assets/home.css";

export default function Home() {
    const {userEmail} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleConcertButton = () => {
        navigate("/concert");
    };

    const handleReservationButton = () => {
        navigate("/reservation")
    }

    return (
        <div className="home-container">
            <p>{userEmail} 님, 환영합니다.</p>
            <h1>티켓팅 서비스</h1>
            <div>
                <button onClick={handleConcertButton}>콘서트 목록</button>
                <button onClick={handleReservationButton}>예매 목록</button>
            </div>
        </div>
    );
}
