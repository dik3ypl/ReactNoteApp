import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import QuickMessage from './QuickMessage'
import '../styles/Forms.css'

export default function LoginForm() {
    const [resetPasswordVisible, toggleVisibility] = useState(false)
    const [msgVisible, successLogin] = useState(false)

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
        if (res.status == 'success') {

            successLogin(true)
        }
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

    }

    return (
        <div className="login">
            {resetPasswordVisible ?
                <div className='pass-reset'>
                    <span>Password reset</span>
                    <form onSubmit={sendResetMail}>
                        <input type="email" name="email" placeholder='E-mail address' />
                        <input type="submit" />
                        <button className='exitBt' onClick={() => toggleVisibility(!resetPasswordVisible)}>Anuluj</button>
                    </form>
                </div>
                : null
            }
            <span>Login</span>
            <form className="regForm" onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="E-mail address" />
                <input name="password" type="password" placeholder="Password" />
                <input type="submit" value="Done!" />
            </form>
            <Link to="/register">Don't have an account?</Link>
            <Link to="/guest">Entry as a guest</Link>
            <a onClick={() => toggleVisibility(!resetPasswordVisible)}>Forgot password?</a>
            {msgVisible ?
                <QuickMessage text='Success!' />
                :
                null
            }
        </div>
    )
}
