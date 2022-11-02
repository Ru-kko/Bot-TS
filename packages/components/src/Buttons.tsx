import { PUBLIC } from "@bot/config";
import { CSSProperties, HtmlHTMLAttributes, PropsWithChildren, useState } from "react";
import { NavLink } from "react-router-dom";
import { Save } from ".";
import "../styles/buttons.css";

export function NavLogIn(props: { logged: boolean; logout: () => Promise<void> }) {
  return (
    <>
      {props.logged ? (
        <button onClick={props.logout}>LogOut</button>
      ) : (
        <a
          href={
            "https://discord.com/api/oauth2/authorize?client_id=" +
            PUBLIC.DC_CLIENT_ID +
            "&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord&response_type=code&scope=identify%20guilds"
          }
        >
          LogIn
        </a>
      )}
      <a href={props.logged ? "" : ""}>{props.logged ? "LogOut" : "LogIn"}</a>
    </>
  );
}

export function NavButton(props: PropsWithChildren<{ to: string }>) {
  return (
    <NavLink to={props.to} className={({ isActive }) => (isActive ? "nav-link in" : "nav-link")}>
      {props.children}
    </NavLink>
  );
}

interface switchProps {
  fn: (state: boolean) => void;
  initalState?: boolean;
  size?: number;
  color?: string;
}

export function SwitchButton(props: switchProps) {
  const width = props.size ?? 4;
  const size = `${width / 1.7}rem`;
  const [checkState, setCheck] = useState<boolean>(props.initalState || false);
  const transition: CSSProperties = checkState
    ? {
        color: "#57F288",
        transform: `translateX(${width - width / 1.7}rem)`,
      }
    : {};
  const update = () => {
    setCheck(!checkState);
    props.fn(!checkState);
  };

  return (
    <>
      <div>
        <label
          className="switch-cont"
          style={{
            backgroundColor: checkState ? "#57F288" : "#62656B",
            padding: `${width * 0.03}rem`,
            width: `${width}rem`,
            height: size,
          }}
        >
          <input type="checkbox" className="switch-btn" onChange={update} checked={checkState} />
          <span
            style={{
              color: checkState ? "#57F288" : "#62656B",
              height: size,
              width: size,
              fontSize: `${width * 0.5}rem`,
              ...transition,
            }}
          >
            {checkState ? "✓" : "✖"}
          </span>
        </label>
      </div>
    </>
  );
}

export function SaveButton(porps: HtmlHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...porps} className="save-button">
      <Save />
    </button>
  );
}
