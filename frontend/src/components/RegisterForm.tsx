import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Forms.css'

export default function RegisterForm() {

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        let data = new FormData(event.target as HTMLFormElement)
        let dataJson = Object.fromEntries(data)
        const res = await fetch("http://localhost:3001/userRegister", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJson)
        }).then(res => res.json())
        console.log(res)
    }

    return (
        <div className="register">
            <span>Create Account</span>
            <form className="regForm" onSubmit={handleSubmit}>
                <input name="firstName" type="text" placeholder="First name" />
                <input name="lastName" type="text" placeholder="Last name" />
                <input name="email" type="email" placeholder="E-mail address" />
                <input name="password" type="password" placeholder="Password" />
                <input type="submit" value="Done!" />
            </form>
            <Link to="/login">Go back to login</Link>
            <Link to="/guest">Entry as a guest</Link>
        </div>
    )
}
