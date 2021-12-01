import React, { Component } from 'react'
import './style.css'
import { Linkedin, Discord, GitHub } from '../../components/Svgs'

export default class foo extends Component {

    render() {
        return (
            <footer className="foot">
                <div>
                    <ul className="footlinks">
                        <li><a href="#" className="footBtn" >About</a></li>
                        <li><a href="#" className="footBtn" >Commands</a></li>
                        <li><a href="#" className="footBtn" >Portfolio</a></li>
                    </ul>
                </div>
                <div>
                    <ul className="networks">
                        <li><a href="#" className="footBtn" ><Linkedin /></a></li>
                        <li><a href="#" className="footBtn" ><Discord /></a></li>
                        <li><a href="#" className="footBtn" ><GitHub /></a></li>
                    </ul>
                </div>
            </footer>
        )
    }
}