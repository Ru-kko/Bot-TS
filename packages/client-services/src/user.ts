import axios from "axios";
import { user } from "@bot/types";
import { PUBLIC } from "@bot/config";

export async function userInfo() {
  return await axios
    .get<user>(PUBLIC.SERVER_URL + "/user", {
      withCredentials: true,
    })
    .then((res) => res.data);
}
