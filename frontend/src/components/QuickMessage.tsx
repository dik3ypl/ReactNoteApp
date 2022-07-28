import React from 'react'
import { Link } from 'react-router-dom'

interface props {
    text: string
}

export default function QuickMessage(props: props) {
    return (
        <div className='msg-div'>
            <span className='msg'>{props.text}</span>
            <Link to='/'><button className='exitBt'>Return</button></Link>
        </div>
    )
}
