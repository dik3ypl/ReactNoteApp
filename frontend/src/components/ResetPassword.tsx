import React, { FormEvent, useEffect } from 'react'
import { useSearchParams } from "react-router-dom"
import config from '../globalConfig.json'
import '../styles/Forms.css'

export default function RegisterForm() {
    const [searchParams, setSearchParams] = useSearchParams();
    let code: (string | null) = ""
    useEffect(() => {
        code = searchParams.get("c")

        fetch(`${config.domain}/userVerify`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: code })
        })
    }, [])

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        let data = new FormData(event.target as HTMLFormElement)
        let dataJson = Object.fromEntries(data)
        const res = await fetch("http://localhost:3001/userResetPasswordEnd", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: code, password: dataJson.password })
        }).then(res => res.json())
        console.log(res)
    }

    return (
        <div className="register">
            <span>Reset Password</span>
            <form className="regForm" onSubmit={handleSubmit}>
                <input name="password" type="password" placeholder="New password" />
                <input type="submit" value="Done!" />
            </form>
        </div>
    )
}
