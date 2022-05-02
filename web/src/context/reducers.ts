import { combineReducers } from "redux";
import { logReducer } from "./reducers/logState";

const reducers = combineReducers({
    session: logReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
