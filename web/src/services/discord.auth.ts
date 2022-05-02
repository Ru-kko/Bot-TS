import axios from "axios";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import Config from "../Config/values.config";
import { actions } from "../context/reducers/logState";

export async function logIn(location: string) {
    const data = new URLSearchParams(location).get("code");

    if (data) {
        await axios.post(
            Config.Server.url + Config.Server.endPoits.logIn + "?code=" + data,
            {},
            { withCredentials: true }
        );
    }
}

export async function logOut() {
    await axios
        .delete(Config.Server.url + Config.Server.endPoits.logIn, {
            withCredentials: true,
        })
};

export function isLoged(dispatch: Dispatch<AnyAction>) {
    const sessionState = bindActionCreators(actions, dispatch);

    axios
        .get<{ status: boolean; message: string }>(
            Config.Server.url + Config.Server.endPoits.logIn,
            { withCredentials: true }
        )
        .then((res) => {
            if (res.data.status) {
                sessionState.logIn();
            } else {
                sessionState.logOut();
            }
        })
        .catch((e) => console.log(e));
}
