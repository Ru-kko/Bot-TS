import { PUBLIC } from "@bot/config";
import { Link } from "react-router-dom";
import "../styles/card.css";

interface cardInfo {
  type: number;
  id: string;
  icon?: string;
  name: string;
  owner: boolean;
}

export function ServerCard(props: cardInfo) {
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
                    <Link to={"/leader/" + props.id} className="transparent">
                      Board
                    </Link>
                    <Link to={"/dashboard/" + props.id}>Edit</Link>
                  </>
                );
              case 1:
                return (
                  <>
                    <button className="transparent">Board</button>
                  </>
                );
              case 2:
                return (
                  <a
                    href={
                      "https://discord.com/api/oauth2/authorize?client_id=" +
                      PUBLIC.DC_CLIENT_ID +
                      "&permissions=8&scope=bot"
                    }
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
