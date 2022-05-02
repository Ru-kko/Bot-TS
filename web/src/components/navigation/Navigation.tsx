import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../../context/reducers";
import { Avatar } from "../images/images";
import Config from "../../Config/values.config";
import "./style.css";
import { logOut } from "../../services/discord.auth";
import { bindActionCreators } from "redux";
import { actions } from "../../context/reducers/logState";

export default function () {
    const sessionState = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const setSessionState = bindActionCreators(actions, dispatch);
    const button = useRef<HTMLButtonElement>(null);

    const logOutAction = () => {
        logOut()
            .then(() => {
                navigator("/");
                setSessionState.logOut();
            })
            .catch(() => {
                button.current!.animate(
                    [
                        { backgroundColor: "#cf3a58", transform: "translateX(2px)" },
                        { backgroundColor: "#cf3a58", transform: "translateX(-4px)" },
                    ],
                    {
                        duration: 50,
                        direction: "alternate",
                        iterations: 5,
                    }
                );
            });
    };

    return (
        <nav>
            <NavLink to="/" className="nav-logo">
                <img src={Avatar} alt="Error" />
                <h3>Test Bot</h3>
            </NavLink>
            <li className="nav-links">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "nav-link-selected" : ""
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/cmd"
                    className={({ isActive }) =>
                        isActive ? "nav-link-selected" : ""
                    }
                >
                    Commands
                </NavLink>
                {sessionState ? (
                    <>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                isActive ? "nav-link-selected" : ""
                            }
                        >
                            Dashboard
                        </NavLink>
                        <button
                            ref={button}
                            onClick={logOutAction}
                            className="nav-session-btn"
                        >
                            LogOut
                        </button>
                    </>
                ) : (
                    <a href={Config.Discord.Auth} className="nav-session-btn">
                        LogIn
                    </a>
                )}
            </li>
        </nav>
    );
}
