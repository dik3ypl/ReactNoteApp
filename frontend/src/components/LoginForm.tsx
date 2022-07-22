import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import '../styles/Forms.css'

export default function LoginForm() {
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        let data = new FormData(event.target as HTMLFormElement)
        let dataJson = Object.fromEntries(data)
        let res = await fetch("http://localhost:3001/userLogin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJson)
        }).then(res => res.json())
        console.log(res)
    }

    const sendResetMail = async (event: FormEvent) => {
        event.preventDefault()
        let data = new FormData(event.target as HTMLFormElement)
        let dataJson = Object.fromEntries(data)
        let res = await fetch("http://localhost:3001/userResetPassword", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJson)
        }).then(res => res.json())
        console.log(res)
    }

    return (
        <div className="login">
            <div className='pass-reset'>
                <span>Password reset</span>
                <form onSubmit={sendResetMail}>
                    <input type="email" name="email" placeholder='E-mail address' />
                    <input type="submit" />
                </form>
            </div>
            <span>Login</span>
            <form className="regForm" onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="E-mail address" />
                <input name="password" type="password" placeholder="Password" />
                <input type="submit" value="Done!" />
            </form>
            <Link to="/register">Don't have an account?</Link>
            <Link to="/guest">Entry as a guest</Link>
            <a>Forgot password?</a>
        </div>
    )
}
