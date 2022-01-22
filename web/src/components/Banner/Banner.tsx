import { useEffect, useRef } from 'react'
import useWriter from '../../hooks/useWriter'
import Embed from '../embed/Embed'
import Line from '../Horizontal_line/Line'
import { Avatar } from '../images/images'
import { Link } from 'react-router-dom'
import Config  from '../../Config/values.config'
import './banner.css'

export default () => {
    const embedText = useRef<HTMLParagraphElement>(null);
    const imageLogo = useRef<HTMLImageElement>(null);

    useEffect(() => {
        useWriter(
            embedText,
            'Get better your server and moderate with me, an multipurpose bot');
        setTimeout(() => {
            imageLogo.current!.className += ' banner-zoom-btn'
        }, 750);
    }, [])
    return (
        <>
            <div className='Banner'>
                <Embed title='Test bot' footer={true} color='cyan'>
                    <div className='banner-embed-conent'>
                        <p ref={embedText}></p>
                    </div>
                </Embed>
                <div className='banner-big-logo'>
                    <a href={Config.Discord.Invite} target="_blank" rel="noopener noreferrer"><img ref={imageLogo} className='banner-image-profile' src={Avatar} alt="Error" /></a>
                    <div className='banner-buttons'>
                        <a href={Config.Discord.Invite} className='banner-button-white'>
                            Add to discord
                        </a>
                        <Link to={Config.Links.loginPath} className='banner-button-blue'>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
            <Line />
        </>
    )
}