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
                        <div className='Banner-vertical-line' />
                        <div className="Message-coontent">
                            <div className='title'>
                                <img src={process.env.PUBLIC_URL + 'images/Avata_Profile.png'} />
                                <h2>Hello there</h2>
                            </div>
                            <p>
                                ALerts
                                <br />
                                Moderation
                                <br />
                                Music
                                <br />
                                And much more
                            </p>
                        </div>
                    </div>
                    <div className='Banner_Buttons'>
                        <a href={values.Discord.Invite} className='invite-BTN'>Add in you server</a>
                        <a href={values.Discord.Auth} className='banner-log-link'>login with discord</a>
                    </div>
                </div>
                <Line />
            </>
        )
    }
}
