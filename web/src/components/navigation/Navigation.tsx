import { Component } from 'react'
import { Link } from 'react-router-dom'; 

export default class Navigation extends Component {
    render() {
        return (
            <nav>
                <li>
                    <Link to = "/">Commands</Link>
                </li>
            </nav>
        )
    }
}