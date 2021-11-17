import React, { Component } from 'react'
import { Linkedin, Discord, GitHub } from './svgs'

export default class foo extends Component {

    render() {
        return (
            <footer className="container">
                <div>
                    <ul className = "container vertical">
                        <li><a href="" className="footBtn">About</a></li>
                        <li><a href="" className="footBtn">Commands</a></li>
                        <li><a href="" className="footBtn">Portfolio</a></li>
                    </ul>
                </div>
                <div>
                    <ul className = "container horizontal">
                        <li><a href="" className="footBtn"><Linkedin/></a></li>
                        <li><a href="" className="footBtn"><Discord/></a></li>
                        <li><a href="" className="footBtn"><GitHub/></a></li>
                    </ul>
                </div>
            </footer>
        )
    }
}
