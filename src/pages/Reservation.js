import React, {useEffect, useState, useContext} from "react";
import "assets/reservation.css";
import {getReservations} from "services/reservation";
import {AuthContext} from "context/AuthContext";

export default function Reservation() {
    const {userEmail} = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!userEmail) {
            setReservations([]);
            return;
        }

        async function fetchReservations() {
            setReservations([]);
            setIsLoading(true);

            try {
                const response = await getReservations();
                console.log(response.data);
                if (response.status === "OK") {
                    setReservations([...response.data]);
                }
            } catch (error) {
                console.error("예매 정보를 가져오던 중 오류 발생: " + error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchReservations();
    }, [userEmail]);

    return (
        <div className="reservation-container">
            {isLoading ? (
                <p>Loading...</p>
            ) : reservations.length === 0 ? (
                <p>예매 내역이 없습니다.</p>
            ) : (
                reservations.map((reservation) => (
                    <div className="reservation-item" key={reservation.id}>
                        <h3>{reservation.title}</h3>
                        <p>{reservation.concertAt}</p>
                        <p>{reservation.address}</p>
                        <button>티켓 보기</button>
                        <button>예매 취소</button>
                    </div>
                )))}
        </div>
    );
};