import React, {useEffect, useState} from "react";
import {getConcert} from "services/concertService";
import {useParams} from "react-router-dom";
import {ticketing} from "services/reservation";

export default function ConcertDetail() {
    const {id} = useParams();
    const [concert, setConcert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isBooking, setIsBooking] = useState(false);

    useEffect(() => {
        async function fetchConcert() {
            try {
                const response = await getConcert(id);
                if (response.status === "OK") {
                    setConcert(response.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error("콘서트 정보를 가져오던 중 오류 발생: " + error);
                setLoading(false);
            }
        }

        fetchConcert();
    }, [id]);

    async function handleTicketing() {
        if (isBooking) return;
        setIsBooking(true);

        try {
            const response = await ticketing(id);
            if (response.status === "CREATED") {
                alert("예매되었습니다.");
            }
        } catch (error) {
            alert(error.response?.data?.message);
        } finally {
            setIsBooking(false);
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }
    if (!concert) {
        return <div>콘서트 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <div className="concert-container">
            <h2>{concert.title}</h2>

            <div>
                <p><strong>📍 장소:</strong> {concert.locationName}</p>
                <p><strong>📅 날짜:</strong> {formatDate(concert.concertAt)}</p>
                <p><strong>🎟️ 총 좌석:</strong> {concert.seats.toLocaleString()}석</p>
                <p><strong>🛑 잔여 좌석:</strong> {(concert.seats - concert.reservedAmount).toLocaleString()}석</p>
                <p><strong>🕒 예매 시작:</strong> {formatDate(concert.openAt)}</p>
                <p><strong>⏳ 예매 마감:</strong> {formatDate(concert.closeAt)}</p>
                <p><strong>📢 상태:</strong> {getConcertStatus(concert.status)}</p>
            </div>

            <button onClick={handleTicketing} disabled={isBooking}>
                {isBooking ? "예매 중.." :"예매하기"}
            </button>
        </div>
    );
};

const getConcertStatus = (status) => {
    switch (status) {
        case "SCHEDULED":
            return "대기중";
        case "RESERVATION_START":
            return "예매중";
        case "RESERVATION_CLOSED":
            return "예매 종료";
        case "CANCELLED":
            return "취소됨";
        case "FINISHED":
            return "콘서트 종료";
        default:
            return "알수없음";
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
};