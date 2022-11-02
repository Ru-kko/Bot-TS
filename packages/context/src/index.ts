import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, AnyAction, bindActionCreators, Dispatch } from "redux";
import { logReducer, logginActions, logActionType } from "./reducers/logginState";
import { loadingReducer, loadingActions, loadingReducerActions } from "./reducers/loading";
import { dashboardReducer, dashboardActions, dashboardReducerActions } from "./reducers/currentGuild";

export interface actionType<T, D> {
  type: T;
  paylodad?: D;
}
export type RootState = ReturnType<typeof reducers>;

const reducers = combineReducers({
  session: logReducer,
  loading: loadingReducer,
  dasboard: dashboardReducer,
});

const store = configureStore({
  reducer: reducers,
  preloadedState: {
    session: false,
  },
  devTools: true,
});
export { Provider, useDispatch } from "react-redux"; 
export {
  type AnyAction,
  type Dispatch,
  bindActionCreators,
  store,
  loadingActions,
  logginActions,
  dashboardActions,
  dashboardReducerActions,
  loadingReducerActions,
  logActionType,
};

export { useSelector } from "react-redux";
