import { Dispatch } from "redux";
import type actionType from "../actions";

enum loadingReducerActions {
    loading,
    loaded,
}

const loadingReducer = (
    state = loadingReducerActions.loaded,
    action: actionType<loadingReducerActions, boolean>
) => action.type ?? state;

const loadingActions = {
    loading: () => {
        return (dispach: Dispatch<actionType<loadingReducerActions, boolean>>) =>
            dispach({ type: loadingReducerActions.loading });
    },
    loaded: () => {
        return (dispach: Dispatch<actionType<loadingReducerActions, boolean>>) =>
            dispach({ type: loadingReducerActions.loaded });
    }
};
export { loadingActions, loadingReducer, loadingReducerActions };
