import { Component, ReactNode } from 'react'
import { Wave } from '../Svgs'
import './style.css'

export default class background extends Component<{children:ReactNode}> {
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
