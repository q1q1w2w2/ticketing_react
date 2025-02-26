import React, {useEffect, useState} from "react";
import {getConcerts} from "services/concertService";

import "assets/concert.css";
import {Link} from "react-router-dom";

export default function Concert() {
    const [concerts, setConcerts] = useState([]);

    useEffect(() => {
        async function fetchConcerts() {
            try {
                const response = await getConcerts();
                if (response.status === "OK") {
                    setConcerts(response.data);
                }
            } catch (error) {
                console.error("콘서트 목록을 가져오던 중 오류 발생: ", error);
            }
        }

        fetchConcerts();
    }, []);

    return (
        <div className="concert-container">
            <h2>콘서트 목록</h2>
            <div className="concert-list">
                <ul>
                    {concerts.map((concert) => (
                        <Link to={`/concert/${concert.id}`} key={concert.id} className="concert-link">
                            <li className="concert-item">
                                <h3>{concert.title}</h3>
                                <p>장소: {concert.locationName}</p>
                                <p>날짜: {concert.concertAt}</p>
                                <p>잔여 좌석: {concert.reservedAmount}</p>
                                <p>상태: {getConcertStatus(concert.status)}</p>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
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