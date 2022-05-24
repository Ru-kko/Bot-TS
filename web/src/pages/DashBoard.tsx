import { DashBoardUserMenu } from "../components/DashboardUserMenu";
import Line from "../components/Horizontal_line/Line";
import { ServersMenu } from "../components/ServerCard/ServerCard";

export function Dashboard() {

    
    return (
        <>
            <DashBoardUserMenu />
            <Line />
            <ServersMenu />
        </>
    );
}