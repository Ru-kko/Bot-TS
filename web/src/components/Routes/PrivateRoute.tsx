import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../context/reducers";
import { loadingReducerActions } from "../../context/reducers/loading";
import { ErrorPage } from "../../pages/Error";

export function PrivateRoute({ Component }: { Component: ReactNode }) {
    const sessionState = useSelector((state: RootState) => state);

    return (
        <>
            {sessionState.loading === loadingReducerActions.loaded &&
            !sessionState.session
                ? <ErrorPage />
                : Component }
        </>
    );
}
