import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar } from "@bot/client-public";
import { Discord, GitHub, Linkedin } from "./";
import { logginActions, bindActionCreators, useDispatch, useSelector, RootState } from "@bot/client-context";
import { GuildNav } from "./DashboardNav";
import { PUBLIC } from "@bot/config";

import "../styles/navigation.css";

export function Navigation(props: { logOut: () => Promise<void> }) {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const setSessionState = bindActionCreators(logginActions, dispatch);
  const button = useRef<HTMLAnchorElement>(null);
  const sessionState = useSelector((state: RootState) => state.session);
  const dashboardState = useSelector((state: RootState) => state.dasboard);
  const [menu, openMenu] = useState<boolean>(false);
  const [aspectRatio, setAspect] = useState(window.screen.width / window.screen.height);
  const logOutAction = () => {
    props
      .logOut()
      .then(() => {
        navigator("/");
        setSessionState.logOut();
      })
      .catch(() => {
        button.current!.animate(
          [
            {
              backgroundColor: "#cf3a58",
              transform: "translateX(2px)",
            },
            {
              backgroundColor: "#cf3a58",
              transform: "translateX(-4px)",
            },
          ],
          {
            duration: 50,
            direction: "alternate",
            iterations: 5,
          }
        );
      });
  };

  useEffect(() => {
    window.addEventListener("resize", () => setAspect(window.screen.width / window.screen.height));
  }, []);

  return (
    <>
      <nav className={menu ? "fixed" : ""}>
        <NavLink to="/" className="nav-logo">
          <img src={Avatar} alt="Error" />
          <h3>Test Bot</h3>
        </NavLink>
        <a className="nav-expand-btn" onClick={() => openMenu(!menu)}>
          +
        </a>
        <div className={"nav-links" + (menu ? " nav-open" : "")}>
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link-selected" : "")}>
            Home
          </NavLink>
          <NavLink to="/cmd" className={({ isActive }) => (isActive ? "nav-link-selected" : "")}>
            Commands
          </NavLink>
          {sessionState ? (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "nav-link-selected" : "")}>
                Dashboard
              </NavLink>
              <a ref={button} onClick={logOutAction} className="nav-session-btn">
                LogOut
              </a>
            </>
          ) : (
            <a
              href={
                "https://discord.com/api/oauth2/authorize?client_id=" +
                PUBLIC.DC_CLIENT_ID +
                "&redirect_uri=" +
                PUBLIC.CLIENT_URL +
                PUBLIC.REDIRECT_ENDPOINT +
                "&response_type=code&scope=identify%20guilds"
              }
              className="nav-session-btn"
            >
              LogIn
            </a>
          )}

          {(aspectRatio <= 0.75 || window.screen.width <= 800) && dashboardState.id ? (
            <>
              <GuildNav aspectRatio={aspectRatio} guild={dashboardState} />
              <div className="nav-socialRed">
                <Discord />
                <GitHub />
                <Linkedin />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </nav>
      {aspectRatio >= 0.75 && window.screen.width >= 800 && dashboardState.id ? (
        <GuildNav aspectRatio={aspectRatio} guild={dashboardState} />
      ) : (
        <></>
      )}
    </>
  );
}
