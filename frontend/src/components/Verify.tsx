import React, { useEffect } from 'react'
import { useSearchParams } from "react-router-dom";
import config from '../globalConfig.json'
import { Link } from 'react-router-dom';

export default function RegisterForm() {
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        const code = searchParams.get("c")

        fetch(`${config.domain}/userVerify`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: code })
        })
    }, [])

    return (
        <div className='msg-div'>
            <span className='msg'>Account verified, now you can sign in.</span>
            <Link to='/login'><button className='normalBt'>Sign in</button></Link>
        </div>
    )
}