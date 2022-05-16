import { DashBoardUserMenu } from "../components/DashboardUserMenu";
import Line from "../components/Horizontal_line/Line";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../context/reducers";
import { useEffect } from "react";

export function Dashboard() {
    const navigator = useNavigate();
    const sessionState = useSelector((state: RootState) => state.session);

    useEffect(() => {
        if (!sessionState) {
            navigator(-1);
        }
    }, [sessionState]);
    
    return (
        <>
            <DashBoardUserMenu />
            <Line />
        </>
    );
}