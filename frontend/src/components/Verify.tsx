import React, { useEffect } from 'react'
import { useSearchParams } from "react-router-dom";
import config from '../globalConfig.json'

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
        <div className="main">
            <h1>Account verified</h1>
            <button>Log in</button>
        </div>
    )
}