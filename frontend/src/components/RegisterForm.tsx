import React, { FocusEventHandler, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import IsEmail from 'isemail'
import '../styles/Forms.css'
import QuickMessage from './QuickMessage'

export default function RegisterForm() {
    const tab: string[] = []
    const [msgVisible, successLogin] = useState(false)
    const [firstNameInfo, firstNameInfoEdit] = useState(tab)
    const [secondNameInfo, secondNameInfoEdit] = useState(tab)
    const [emailInfo, emailInfoEdit] = useState(tab)
    const [passwordInfo, passwordInfoEdit] = useState(tab)

    const checkFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        let mistakes: string[] = []

        if (value.length > 40) mistakes.push("za długie")
        if (!/^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ ]+$/.test(value) && value.length > 0) mistakes.push("Tylko litery i spacja")

        firstNameInfoEdit(mistakes)
    }

    const checkSecondName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        let mistakes: string[] = []

        if (value.length > 40) mistakes.push("za długie")
        if (!/^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ ]+$/.test(value) && value.length > 0) mistakes.push("Tylko litery i spacja")

        secondNameInfoEdit(mistakes)
    }

    const checkEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        let mistakes: string[] = []

        if (value.length > 60) mistakes.push("za długie")
        if (!IsEmail.validate(value)) mistakes.push("nieprawidłowy mail")

        emailInfoEdit(mistakes)
    }

    const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        let mistakes: string[] = []

        if (value.length < 8) mistakes.push("za krótkie")
        if (value.length > 20) mistakes.push("za długie")
        if (!/[0-9]/.test(value)) mistakes.push("cyfry")
        if (!/[a-z]/.test(value)) mistakes.push("małe litery")
        if (!/[A-Z]/.test(value)) mistakes.push("duże litery")

        passwordInfoEdit(mistakes)
    }

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
                <input name="firstName" type="text" placeholder="First name" onBlur={checkFirstName} />
                <>
                    {
                        firstNameInfo.map((el) => {
                            return (
                                <p key={el}>{el}</p>
                            )
                        })
                    }
                </>
                <input name="lastName" type="text" placeholder="Last name" onBlur={checkSecondName} />
                <>
                    {
                        secondNameInfo.map((el) => {
                            return (
                                <p key={el}>{el}</p>
                            )
                        })
                    }
                </>
                <input name="email" type="email" placeholder="E-mail address" onBlur={checkEmail} />
                <>
                    {
                        emailInfo.map((el) => {
                            return (
                                <p key={el}>{el}</p>
                            )
                        })
                    }
                </>
                <input name="password" type="password" placeholder="Password" onBlur={checkPassword} />
                <>
                    {
                        passwordInfo.map((el) => {
                            return (
                                <p key={el}>{el}</p>
                            )
                        })
                    }
                </>
                <input type="submit" value="Done!" />
            </form>
            <Link to="/login">Go back to login</Link>
            <Link to="/guest">Entry as a guest</Link>
            {msgVisible ?
                <QuickMessage text='Now, confirm your e-mail.' />
                :
                null
            }
        </div>
    )
}
