import React from 'react'
import '../styles/Navbar.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import Hero from './Hero';

export default function Navbar() {
    return (
        <div className='main'>
            <div className="logo">
                <span>SpaceNotes</span>
            </div>
            <div className='nav'>
                <ul>
                    <li>Quick note</li>
                    <li>Log in</li>
                    <li>About</li>
                </ul>
            </div>
        </div>

    )
}
