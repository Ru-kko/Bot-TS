import { Component } from 'react'
import { Link } from 'react-router-dom'
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
                        <a href='#' className='invite-BTN'>Add in you server</a>
                        <Link to='/commands' className='banner-cmd-link'>commands</Link>
                    </div>
                </div>
                
            </>
        )
    }
}
