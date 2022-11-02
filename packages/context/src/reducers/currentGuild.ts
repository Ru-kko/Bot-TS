import { Dispatch } from "redux";
import { guildOptions } from "@bot/types";
import { actionType } from "../";

export enum dashboardReducerActions {
  goOut,
  setCurrent,
}

const dashboardReducer = (
  state: guildOptions = {},
  action: actionType<dashboardReducerActions, guildOptions>
): guildOptions => {
  switch (action.type) {
    case dashboardReducerActions.goOut:
      return {};
    case dashboardReducerActions.setCurrent:
      return action.paylodad ?? state;
    default:
      return state;
  }
};

const dashboardActions = {
  getOut: () => (dispach: Dispatch<actionType<dashboardReducerActions, guildOptions>>) =>
    dispach({ type: dashboardReducerActions.goOut }),
  setCurrent: (data: guildOptions) => (dispatch: Dispatch<actionType<dashboardReducerActions, guildOptions>>) =>
    dispatch({
      type: dashboardReducerActions.setCurrent,
      paylodad: data,
    }),
};

export { dashboardActions, dashboardReducer };
