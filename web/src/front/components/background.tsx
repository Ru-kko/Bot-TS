import React , { Component } from 'react'

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
                <svg className="backImg" viewBox="0 0 450 13">
                    <path d="m 0,10 c 25,-3 50,-3 75,0 25,3 50,3 75,0 25,-3 50,-3 75,0 25,3 50,3 75,0 25,-3 50,-3 75,0 25,3 50,3 75,0 V 0 H 0 Z" fill="#2c2f33"></path>
                </svg>
            </>
        )
    }
}