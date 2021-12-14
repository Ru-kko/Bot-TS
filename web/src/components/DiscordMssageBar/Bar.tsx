import { Component, useEffect, useState, useRef } from 'react'
import { Add } from '../Svgs'
import './Bar.css'

export default () => {
    const _this = useRef<HTMLDivElement>(null);
    const [canSee, checking] = useState(false);

    const observer = new IntersectionObserver(([entry]) => {
        checking(entry.isIntersecting);
    })

    useEffect(() => {
        console.log('connect');
        observer.observe(_this.current!);
    }, [])

    useEffect(() => {
        if(canSee){
            observer.disconnect();
            console.log('disconnect');
        }
    }, [canSee])

    return (
        <div className='message-bar' ref={_this}>
            <div>
                <Add />
                <div className='Message-bar-txt'>
                    <p>Send message to #general {canSee == true ? 'yes' : 'no'}</p>
                </div>
            </div>
        </div>
    )
};

