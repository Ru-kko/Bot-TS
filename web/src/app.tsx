import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { loadingActions } from "./context/reducers/loading";
import { isLoged } from "./services/discord.auth";
import { Background } from "./components/BackGround/BackGround";
import { DiscordLogIn } from "./pages/Auth";
import { Commads } from "./pages/Commads";
import { Dashboard } from "./pages/DashBoard";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/navigation/Navigation";
import Home from "./pages/Home";

import "./app.css";

export function App() {
    const dispatch = useDispatch();
    const { loading, loaded } = bindActionCreators(loadingActions, dispatch);

    useEffect(() => {
        loading();
        isLoged(dispatch).finally(() => loaded());
    }, []);

    return (
        <>
            <Navigation />
            <Background>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth/discord" element={<DiscordLogIn />} />
                    <Route path="/cmd" element={<Commads />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Background>
            <Footer />
        </>
    );
}