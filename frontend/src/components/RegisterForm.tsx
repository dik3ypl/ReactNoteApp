import React, { FocusEventHandler, FormEvent, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import IsEmail from 'isemail'
import '../styles/Forms.css'
import QuickMessage from './QuickMessage'

export default function RegisterForm() {
    const tab: string[] = []
    const [msgVisible, successRegister] = useState(false)
    const [firstNameErrors, firstNameErrorsUpdate] = useState(tab)
    const [firstNameErrorsShown, showFirstNameErrors] = useState(false)
    const [lastNameErrors, lastNameErrorsUpdate] = useState(tab)
    const [lastNameErrorsShown, showLastNameErrors] = useState(false)
    const [emailErrors, emailErrorsUpdate] = useState(tab)
    const [emailErrorsShown, showEmailErrors] = useState(false)
    const [passwordErrors, passwordErrorsUpdate] = useState(tab)
    const [passwordErrorsShown, showPasswordErrors] = useState(false)

    const checkName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        let mistakes: string[] = []

        if (value.length > 40) mistakes.push(e.target.placeholder + " must not exceed 40 characters.")
        if (!/^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ ]+$/.test(value) && value.length > 0) mistakes.push("You must use only letters and spaces.")

        switch (e.target.name) {
            case 'firstName':
                showFirstNameErrors(false)
                firstNameErrorsUpdate(mistakes)
                break;
            case 'lastName':
                showLastNameErrors(false)
                lastNameErrorsUpdate(mistakes)
                break;
        }
    }

    const checkEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        showEmailErrors(false)
        const value = e.target.value
        let mistakes: string[] = []

        if (value.length > 60) mistakes.push("Your e-mail must not exceed 60 characters.")
        if (!IsEmail.validate(value)) mistakes.push("Your e-mail address is invalid.")

        emailErrorsUpdate(mistakes)
    }

    const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        showPasswordErrors(false)
        const value = e.target.value
        let mistakes: string[] = []

        if (value.length < 8 || value.length > 20) mistakes.push("Your password must be 8 to 20 characters long.")
        if (!/[0-9]/.test(value)) mistakes.push("Your password must have at least one digit")
        if (!/[a-z]/.test(value)) mistakes.push("Your password must have at least one lowercase letter")
        if (!/[A-Z]/.test(value)) mistakes.push("Your password must have at least one capital letter")

        passwordErrorsUpdate(mistakes)
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if (firstNameErrors.length == 0 && lastNameErrors.length == 0 && emailErrors.length == 0 && passwordErrors.length == 0) {

            let data = new FormData(event.target as HTMLFormElement)
            let dataJson = Object.fromEntries(data)
            const res = await fetch("http://localhost:3001/userRegister", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataJson)
            }).then(res => res.json())
            if (res.status == 'success') {
                successRegister(true)
            }
        }
    }

    return (
        <>
            {msgVisible ?
                <QuickMessage text='Now, confirm your e-mail.' />
                :
                <div className="register">
                    <span>Sign up</span>
                    <form className="regForm" onSubmit={handleSubmit}>
                        <input name="firstName" type="text" placeholder="First name" onBlur={() => showFirstNameErrors(true)} onChange={checkName} />
                        {firstNameErrorsShown ? firstNameErrors.map((err, id) => <div className='formError' key={id}>{err}</div>) : null}
                        <input name="lastName" type="text" placeholder="Last name" onBlur={() => showLastNameErrors(true)} onChange={checkName} />
                        {lastNameErrorsShown ? lastNameErrors.map((err, id) => <div className='formError' key={id}>{err}</div>) : null}
                        <input name="email" type="email" placeholder="E-mail address" onBlur={() => showEmailErrors(true)} onChange={checkEmail} />
                        {emailErrorsShown ? emailErrors.map((err, id) => <div className='formError' key={id}>{err}</div>) : null}
                        <input name="password" type="password" placeholder="Password" onBlur={() => showPasswordErrors(true)} onChange={checkPassword} />
                        {passwordErrorsShown ? passwordErrors.map((err, id) => <div className='formError' key={id}>{err}</div>) : null}
                        <input type="submit" value="Done!" />
                    </form>
                    <Link to="/login">Sign in</Link>
                    <Link to="/guest">Entry as a guest</Link>
                </div>
            }
        </>

    )
}
