import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userInfo } from "../../services/user";
import { user } from "../../../../types/DiscordAuth";
import Embed from "../embed/Embed";
import Loading from "../Loading/Loading";
import config from "../../Config/values.config";

import "./style.css";

export function DashBoardUserMenu() {
    const [data, setData] = useState<user | null>(null);

    useEffect(() => {
        userInfo().then(data => {
            setData(data);
        });
    }, []);

    return (
        <div className="userm-container">
            <div className="userm-profile-image-cont">
                {data ? (
                    <>
                        <img src={`${config.Discord.Cdn}/${data.id}/${data.avatar}?size=480`} className="userm-avatar" />
                        <h1>
                            {data.username}<span>#{data.discriminator}</span>
                        </h1>
                    </>
                ) : (
                    <>
                        <Loading
                            Clasess="userm-avatar"
                            Style={{ fontSize: "5em" }}
                        />
                        <Loading />
                    </>
                )}
            </div>
            <Embed title="Profile Settings">
                <div className="userm-options-cont">
                    <Link to="">Edit rank card</Link>
                    <Link to="">Upgrade</Link>
                </div>
            </Embed>
        </div>
    );
}
