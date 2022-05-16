import { combineReducers } from "redux";
import { logReducer } from "./reducers/logState";
import { loadingReducer } from "./reducers/loading";

const reducers = combineReducers({
    session: logReducer,
    loading: loadingReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
