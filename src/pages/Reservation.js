import React, {useEffect, useState} from "react";
import "assets/reservation.css";
import {getReservations} from "../services/reservation";

export default function Reservation() {
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchReservations() {
            try {
                const response = await getReservations();
                if (response.status === "OK") {
                    setReservations(response.data);
                }
            } catch (error) {
                console.error("예매 정보를 가져오던 중 오류 발생: " + error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchReservations();
    }, []);

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