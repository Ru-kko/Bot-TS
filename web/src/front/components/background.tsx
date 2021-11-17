import React , { Component } from 'react'
import { Wave } from './svgs'

type props = {
    content: Component;
}

export default class background extends Component<props> {
    render() {
        return (
            <>
                <div className= "content">
                    {this.props?.content.render()}
                </div>
                <Wave/>
            </>
        )
    }
}