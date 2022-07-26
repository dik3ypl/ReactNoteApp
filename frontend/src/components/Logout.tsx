import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import '../styles/Forms.css'

export default function Logout({ session }: { session: Boolean }) {
    let navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['session-code', 'session-uid']);

    useEffect(() => {
        if (!session || !cookies['session-code'] || !cookies['session-uid']) {
            navigate('/')
        }
    })

    const logoutFunc = () => {
        if (cookies['session-uid'] && cookies['session-code']) {
            fetch("http://localhost:3001/deleteSession", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: cookies["session-uid"], code: cookies["session-code"] })
            })
        }

        removeCookie('session-code')
        removeCookie('session-uid')
        navigate('/')
    }

    const goBack = () => {
        navigate('/')
    }

    return (
        <div className="login">
            <span>Logout?</span>
            <div className="regFrom">
                <button onClick={logoutFunc} className='normalBt'>Yeap, I'm sure</button>
                <button onClick={goBack} className="exitBt">Return</button>
            </div>
        </div>
    )
}
