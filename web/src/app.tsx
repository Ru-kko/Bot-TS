import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import {  useDispatch } from "react-redux";

import Home from "./pages/Home";
import Background from "./components/BackGround/BackGround";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/navigation/Navigation";
import { DiscordLogIn } from "./pages/Auth";
import { Commads } from "./pages/Commads";

import "./app.css";
import { isLoged } from "./services/discord.auth";

export function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        isLoged(dispatch);
    }, []);
    
    return (
        <>
            <Navigation />
            <Background>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth/discord" element={<DiscordLogIn />} />
                    <Route path="/cmd" element={<Commads />} />
                    <Route path="/dashboard" element={<></>} />
                </Routes>
            </Background>
            <Footer />
        </>
    );
}
