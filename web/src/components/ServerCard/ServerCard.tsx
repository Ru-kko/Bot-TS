import { Link } from "react-router-dom";
import { Avatar } from "../images/images";

export function ServerCard() {
    import("./card.css");
    return (
        <li className="server-card-cont">
            <Link to="">
                <img src={Avatar} />
            </Link>
            <div className="server-card-inf">
                <h3>Name</h3>
                <span> 9999 users</span>
                <div className="server-card-buttoms">
                    <button>Edit</button>
                    <button>Add</button>
                    <button className="transparent">Board</button>
                </div>
            </div>
        </li>
    );
}

export function ServersMenu() {
    import("./serversMenu.css");
    return (
        <section className="servers-menu">
            <h2 className="servers-menu-title">SERVERS</h2>
            <ul className="servers-menu-cont">
                <ServerCard></ServerCard>
                <ServerCard></ServerCard>
                <ServerCard></ServerCard>
                <ServerCard></ServerCard>
                <ServerCard></ServerCard>
                <ServerCard></ServerCard>
                <ServerCard></ServerCard>
                <ServerCard></ServerCard>
                <ServerCard></ServerCard>
                <ServerCard></ServerCard>
            </ul>
        </section>
    );
}
