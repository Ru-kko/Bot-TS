import { ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { guildsResponse } from "../../../../types/apiResponse";
import { getAllServers } from "../../services/servers";
import { DiscordLogo } from "../images/images";
import Config from "../../Config/values.config";
import Loading from "../Loading/Loading";
import useViewCheck from "../../hooks/useViewCheck";

interface cardInfo {
    type: number;
    id: string;
    icon?: string;
    name: string;
    owner: boolean;
}

export function ServerCard(props: cardInfo) {
    import("./card.css");

    return (
        <div className="server-card-cont">
            <img src={props.icon} />
            <div className="server-card-inf">
                <div className="server-card-name">{props.name}</div>
                <span>{props.owner ? "Owner" : "Admin"}</span>
                <div className="server-card-buttoms">
                    {(() => {
                        switch (props.type) {
                            case 0:
                                return (
                                    <>
                                        <Link
                                            to={"/leader/" + props.id}
                                            className="transparent"
                                        >
                                            Board
                                        </Link>
                                        <Link to={"/dashboard/" + props.id}>
                                            Edit
                                        </Link>
                                    </>
                                );
                            case 1:
                                return (
                                    <>
                                        <button className="transparent">
                                            Board
                                        </button>
                                    </>
                                );
                            case 2:
                                return (
                                    <a
                                        href={Config.Discord.Invite}
                                        target="popup"
                                    >
                                        Invite
                                    </a>
                                );
                            default:
                                return <></>;
                        }
                    })()}
                </div>
            </div>
        </div>
    );
}

export function ServersMenu() {
    import("./serversMenu.css");

    const [servers, setServers] = useState<guildsResponse[] | null>(null);
    const body = useRef<HTMLTableSectionElement | null>(null);
    const observer = useViewCheck(body, true);

    useEffect(() => {
        if (!observer && servers === null) {
            return;
        }

        getAllServers().then((res) => {
            const admin = 0x0000000000000008;
            let newServers: guildsResponse[] = [{}, {}, {}];

            Object.entries(res).forEach(([id, data]) => {
                if (!data.haveBot && (data.permissions & admin) === admin) {
                    return (newServers[2][id] = data);
                }
                if (!data.haveBot) return;

                if ((data.permissions & admin) !== admin) {
                    return (newServers[1][id] = data);
                } else {
                    return (newServers[0][id] = data);
                }
            });

            setServers(newServers);
        });
    }, [observer]);
    return (
        <section className="servers-menu" ref={body}>
            <h2 className="servers-menu-title">SERVERS</h2>
            {servers === null ? (
                <div
                    style={{
                        height: "70vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Loading Style={{ fontSize: "5em" }} />
                </div>
            ) : (
                servers.map((data, i) => (
                    <div className="servers-menu-cont">
                        {Object.entries(data).map(([id, info]) => (
                            <ServerCard
                                type={i}
                                icon={
                                    info.icon
                                        ? `${Config.Discord.Cdn}icons/${id}/${info.icon}`
                                        : DiscordLogo
                                }
                                id={id}
                                name={info.name}
                                owner={info.owner}
                            />
                        ))}
                    </div>
                ))
            )}
        </section>
    );
}
