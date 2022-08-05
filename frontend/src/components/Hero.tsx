import React, { useEffect, useState } from 'react'
import '../styles/Hero.css'
import { useCookies } from 'react-cookie'
import planet from '../images/planet_orange.png'

export default function Hero({ sessionFunc }: { sessionFunc: Function }) {
    useEffect(() => {
        sessionFunc()
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
