import { Component } from 'react'
import { Add } from '../Svgs'
import './Bar.css'

export default class Bar extends Component {
    render() {
        return (
            <div className='message-bar'>
                <div>
                    <Add />   
                </div>
            </div>
        )
    }
}
