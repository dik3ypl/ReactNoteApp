import React, { FormEvent } from 'react'

export default function LoginForm() {
    const handleSubmit = (event: FormEvent) => {
        let data = new FormData(event.target as HTMLFormElement)
        let dataJson = Object.fromEntries(data)
        fetch("http://localhost:3001/userLogin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJson)
        }).then(res => res.json()).then(res => console.log(res))
        event.preventDefault()
    }

    return (
        <div className="main">
            <span>Login</span>
            <form className="regForm" onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="E-mail address" />
                <input name="password" type="password" placeholder="Password" />
                <input type="submit" value="Done!" />
            </form>
        </div>
    )
}
