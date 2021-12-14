import values from '../../values/values'
import Line from '../Horizontal_line/Line'
import { Avatar } from '../images/images'
import './banner.css'

export default () => {
    return (
        <>
            <div className='Banner'>
                <div className='Banner-Message'>
                    <div className='Banner-vertical-line' />
                    <div className="Message-coontent">
                        <div className='title'>
                            <img src={Avatar} />
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
