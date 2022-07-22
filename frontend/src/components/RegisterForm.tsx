import React, { FormEvent } from 'react'

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
        <div className="main">
            <span>Create Account</span>
            <form className="regForm" onSubmit={handleSubmit}>
                <input name="firstName" type="text" placeholder="First name" />
                <input name="lastName" type="text" placeholder="Last name" />
                <input name="email" type="email" placeholder="E-mail address" />
                <input name="password" type="password" placeholder="Password" />
                <input type="submit" value="Done!" />
            </form>
        </div>
    )
}
