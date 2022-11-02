import { Embed, Line, Loading, ServerCard } from "@bot/client-components";
import { useState, useRef, useEffect } from "react";
import { guildsResponse, user } from "@bot/types";
import { useViewCheck } from "@bot/client-hooks";
import { DiscordLogo } from "@bot/client-public";
import { getAllServers, userInfo } from "@bot/client-services";
import { PUBLIC } from "../../../../packages/config/build";
import { Link } from "react-router-dom";
import "@bot/client-components/styles/DashBoardMenu.css"

export function Dashboard() {
  const [servers, setServers] = useState<guildsResponse[] | null>(null);
  const [data, setData] = useState<user | null>(null);
  const body = useRef<HTMLTableSectionElement | null>(null);
  const observer = useViewCheck(body, true);

  useEffect(() => {
    userInfo().then((data) => {
      setData(data);
    });
  }, []);

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
    <>
      <div className="userm-container">
        <div className="userm-profile-image-cont">
          {data ? (
            <>
              <img src={`${PUBLIC.DISCORD_CDN}avatars/${data.id}/${data.avatar}?size=480`} className="userm-avatar" />
              <h1>
                {data.username}
                <span>#{data.discriminator}</span>
              </h1>
            </>
          ) : (
            <>
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
      <Line />
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
            <Loading />
          </div>
        ) : (
          servers.map((data, i) => (
            <div className="servers-menu-cont">
              {Object.entries(data).map(([id, info]) => (
                <ServerCard
                  type={i}
                  icon={info.icon ? `${PUBLIC.DISCORD_CDN}icons/${id}/${info.icon}` : DiscordLogo}
                  id={id}
                  name={info.name}
                  owner={info.owner}
                />
              ))}
            </div>
          ))
        )}
      </section>
    </>
  );
}
