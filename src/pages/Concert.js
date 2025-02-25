import React, {useEffect, useState} from "react";
import {getConcerts} from "services/concertService";

import "assets/concert.css";

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
                    {concerts.map((concert, index) => (
                        <li key={index} className="concert-item">
                            <h3>{concert.title}</h3>
                            <p>장소: {concert.locationName}</p>
                            <p>날짜: {concert.concertAt}</p>
                            <p>총 좌석: {concert.seats}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};