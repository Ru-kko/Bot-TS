import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Home from "./pages/Home";
import Background from "./components/BackGround/BackGround";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/navigation/Navigation";
import { DiscordLogIn } from "./pages/Auth";
import { Commads } from "./pages/Commads";

import { isLoged } from "./services/discord.auth";
import { Dashboard } from "./pages/DashBoard";
import Loading from "./components/Loading/Loading";
import "./app.css";

export function App() {
    const [loaded, setLoad] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        isLoged(dispatch).finally(() => setLoad(true));
    }, []);

    return (
        <>
            <Navigation />
            <Background>
                {loaded ? (
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/auth/discord"
                            element={<DiscordLogIn />}
                        />
                        <Route path="/cmd" element={<Commads />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                ) : (
                    <div
                        style={{
                            height: "30vh",
                            fontSize: "20vh",
                            color: "#62656B",
                            textAlign: "center",
                            padding: "10% 0",
                        }}
                    >
                        <Loading />
                    </div>
                )}
            </Background>
            <Footer />
        </>
    );
}
