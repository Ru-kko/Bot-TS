import { ReactNode } from "react";
import { useSelector, RootState, loadingReducerActions } from "@bot/client-context";
import { ErrorPage } from "../pages/Error";

export function PrivateRoute({ Component }: { Component: ReactNode }) {
  const sessionState = useSelector((state: RootState) => state);

  return (
    <>{sessionState.loading === loadingReducerActions.loaded && !sessionState.session ? <ErrorPage /> : Component}</>
  );
}
