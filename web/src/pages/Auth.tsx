import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { loadingActions } from "../context/reducers/loading";
import { actions } from "../context/reducers/logState";
import { logIn } from "../services/discord.auth";

export function DiscordLogIn() {
    const { search } = useLocation();
    const navigator = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const { loading, loaded } = bindActionCreators(
            loadingActions,
            dispatch
        );
        const sessionState = bindActionCreators(actions, dispatch);

        loading();
        logIn(search)
            .then(() => {
                sessionState.logIn();
                navigator("/dashboard");
            })
            .catch(() => {
                sessionState.logOut();
                navigator("/");
            }).finally(() => loaded);
    }, []);

    return <></>;
}
