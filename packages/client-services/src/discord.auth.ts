import axios from "axios";
import { AnyAction, bindActionCreators, Dispatch, logginActions } from "@bot/client-context";
import { PUBLIC } from "@bot/config";

export async function logIn(location: string) {
  const data = new URLSearchParams(location).get("code");

  if (data) {
    await axios.post(PUBLIC.SERVER_URL + "/auth/discord" + "?code=" + data, {}, { withCredentials: true });
  }
}

export async function logOut() {
  await axios.delete(PUBLIC.SERVER_URL + "/auth/discord", {
    withCredentials: true,
  });
}

export async function isLoged(dispatch: Dispatch<AnyAction>) {
  const sessionState = bindActionCreators(logginActions, dispatch);

  await axios
    .get<{ status: boolean; message: string }>(PUBLIC.SERVER_URL + "/auth/discord", {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.status) {
        sessionState.logIn();
      } else {
        sessionState.logOut();
      }
    })
    .catch((e) => console.log(e));
}
