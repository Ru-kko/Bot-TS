import { Dispatch } from "redux";
import type actionType from "../actions";

enum logActionType {
    logIn = "LOOGIN",
    logOut = "LOOGOUT",
}

const initialState = false;

const logReducer = (
    state: boolean = initialState,
    action: actionType<logActionType, boolean>
): boolean => {
    switch (action.type) {
        case logActionType.logIn:
            return true;
        case logActionType.logOut:
            return false;
        default:
            return state;
    }
};

const actions = {
    logOut: () => {
        return (dispach: Dispatch<actionType<logActionType, boolean>>) =>
            dispach({ type: logActionType.logOut });
    },
    logIn: () => {
        return (dispach: Dispatch<actionType<logActionType, boolean>>) =>
            dispach({ type: logActionType.logIn });
    }
};
export { actions, logReducer };
