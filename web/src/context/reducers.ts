import { combineReducers } from "redux";
import { logReducer } from "./reducers/logState";
import { loadingReducer } from "./reducers/loading";
import { dashboardReducer } from "./reducers/currenGuild";

const reducers = combineReducers({
    session: logReducer,
    loading: loadingReducer,
    dasboard: dashboardReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
