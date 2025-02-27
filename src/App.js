import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "pages/Home";
import Login from "pages/Login";
import Concert from "pages/Concert";
import ConcertDetail from "pages/ConcertDetail";
import Reservation from "pages/Reservation";
import Signup from "pages/Signup";
import Navbar from "components/Navbar";
import "assets/styles.css";
import ProtectedRoute from "routes/ProtectedRoute";

export default function App() {
    return (
        <div className="App">
            <Navbar/>

            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>

                <Route element={<ProtectedRoute/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/concert" element={<Concert/>}/>
                    <Route path="/concert/:id" element={<ConcertDetail/>}/>
                    <Route path="/reservation" element={<Reservation/>}/>

                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Route>
            </Routes>
        </div>
    );
}
