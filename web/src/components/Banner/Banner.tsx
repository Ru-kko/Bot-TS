import { Component } from 'react'
import values from '../../values/values'
import Line from '../Horizontal_line/Line'
import './banner.css'

export default class Banner extends Component {
    render() {
        return (
            <>
                <div className='Banner'>
                    <div className='Banner-Message'>
                        <h1> Hi there!!</h1>
                        <p>
                            You can add moderation, leveling, alerts an much more
                        </p>
                    </div>
                    <div className='Banner_btns'>
                        <a href= {values.Discord.Invite} className='invite-BTN'>Add in you server</a>
                        <a href = {values.Discord.Auth} className='banner-cmd-link'>login with discord</a>
                    </div>
                </div>
                <Line/>
            </>
        )
    }
}
