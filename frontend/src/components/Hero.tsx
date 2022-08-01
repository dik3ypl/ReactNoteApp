import React, { useEffect } from 'react'
import '../styles/Hero.css'
import planet from '../images/planet_orange.png'

export default function Hero() {
    useEffect(() => {
        console.log("dupa")
    })

    return (
        <div className='hero'>
            <div className='text'>
                <h1>Space Notes</h1>
            </div>
            <div className='img'>
                <img src={planet} width="900px" alt="kok" />
            </div>
        </div>
    )
}
