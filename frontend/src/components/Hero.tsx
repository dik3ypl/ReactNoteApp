import React, { useEffect } from 'react'
import '../styles/Hero.css'
import { useCookies } from 'react-cookie'
import planet from '../images/planet_orange.png'

export default function Hero() {
    const [cookies, setCookie, removeCookie] = useCookies(['session-code', 'session-uid']);

    useEffect(() => {
        if (cookies['session-uid']) {
            fetch("http://localhost:3001/checkSession", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: cookies["session-uid"] })
            }).then(res => res.json()).then(res => console.log(res))
        }
    }, [])

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
