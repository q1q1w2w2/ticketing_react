import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "pages/Home";
import Login from "pages/Login";
import Concert from "pages/Concert";
import ConcertDetail from "pages/ConcertDetail";
import Navbar from "components/Navbar";
import "assets/styles.css";
import ProtectedRoute from "routes/ProtectedRoute";

export default function App() {
    return (
        <div className="App">
            <Navbar/>

            <Routes>
                <Route path="/login" element={<Login/>}/>

                <Route element={<ProtectedRoute/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/concert" element={<Concert/>}/>
                    <Route path="/concert/:id" element={<ConcertDetail/>}/>

                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Route>
            </Routes>
        </div>
    );
}
