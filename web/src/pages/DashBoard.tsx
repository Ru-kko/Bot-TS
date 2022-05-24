import { DashBoardUserMenu } from "../components/DashboardUserMenu";
import Line from "../components/Horizontal_line/Line";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../context/reducers";
import { useEffect } from "react";
import { ServersMenu } from "../components/ServerCard/ServerCard";
import { loadingActions, loadingReducerActions } from "../context/reducers/loading";

export function Dashboard() {
    const navigator = useNavigate();
    const sessionState = useSelector((state: RootState) => state);

    useEffect(() => {     
        if (sessionState.loading  === loadingReducerActions.loaded && !sessionState.session) {
            navigator(-1);
        }
    }, [sessionState]);
    
    return (
        <>
            <DashBoardUserMenu />
            <Line />
            <ServersMenu />
        </>
    );
}