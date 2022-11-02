import { NavLink } from "react-router-dom";
import { guildOptions } from "@bot/types";
import { Line } from "./";

interface guildNavProps {
  aspectRatio: number;
  guild: guildOptions;
}

export function GuildNav(props: guildNavProps) {
  const path = "/dashboard/" + props.guild.id;

  return (
    <div className="dashboard-nav">
      <NavLink to={path} className="dashboard-nav-name">
        {props.guild.name}
      </NavLink>
      {props.aspectRatio <= 0.75 || window.screen.width <= 800 ? <Line /> : <></>}
      <NavLink to={path + "/messages"}>Message Events</NavLink>
      <NavLink to={path + "/ranks"}>Ranks</NavLink>
    </div>
  );
}
