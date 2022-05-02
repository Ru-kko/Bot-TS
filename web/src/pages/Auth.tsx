import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import Loading from "../components/Loading/Loading";
import { actions } from "../context/reducers/logState";
import { logIn } from "../services/discord.auth";

export function DiscordLogIn() {
    const { search } = useLocation();
    const navigator = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const sessionState = bindActionCreators(actions, dispatch);

        logIn(search).then(() => {
            sessionState.logIn();
            navigator("/dashboard");
        }).catch(() => {
            sessionState.logOut();
            navigator("/");
        });
    }, []);

    return (
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
    );
}
