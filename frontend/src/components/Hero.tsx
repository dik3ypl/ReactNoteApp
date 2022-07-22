import React from 'react'
import '../styles/Hero.css'
import planet from './planet.svg'

export default function Hero() {
    return (
        <div className='hero'>
            <div className='text'>
                <h1>Space Notes</h1>
                <p>Organize whatever you want!</p>
            </div>
            <div className='img'>
                <img src={planet} width="900px" alt="kok" />
            </div>
        </div>
    )
}
