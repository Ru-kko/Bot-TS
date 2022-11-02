import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadingActions, logginActions, bindActionCreators, useDispatch } from "@bot/client-context";
import { logIn } from "@bot/client-services";

export function DiscordLogIn() {
    const { search } = useLocation();
    const navigator = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const { loading, loaded } = bindActionCreators(
            loadingActions,
            dispatch
        );
        const sessionState = bindActionCreators(logginActions, dispatch);

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
