import { Component } from 'react'
import Navigation from '../navigation/Navigation'
import { Wave } from '../Svgs'
import './style.css'

export default class background extends Component {
    render() {
        return (
            <>
                <div className="backGrund">
                    <div className="content">
                        {this.props.children}
                    </div>
                    <Wave />
                </div>
            </>
        )
    }
}