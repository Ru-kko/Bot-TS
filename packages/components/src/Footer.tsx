import { Component } from "react";
import { Linkedin, Discord, GitHub } from ".";
import "../styles/Footer.css";

export class Footer extends Component {
  render() {
    return (
      <footer className="foot">
        <div>
          <ul className="footlinks">
            <li>
              <a href="#" className="footBtn">
                About
              </a>
            </li>
            <li>
              <a href="#" className="footBtn">
                Commands
              </a>
            </li>
            <li>
              <a href="#" className="footBtn">
                Portfolio
              </a>
            </li>
          </ul>
        </div>
        <div>
          <ul className="networks">
            <li>
              <a href="#" className="footBtn">
                <Linkedin />
              </a>
            </li>
            <li>
              <a href="#" className="footBtn">
                <Discord />
              </a>
            </li>
            <li>
              <a href="#" className="footBtn">
                <GitHub />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}
