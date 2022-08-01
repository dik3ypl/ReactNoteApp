import React from 'react'
import '../styles/Navbar.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import Hero from './Hero';

export default function Navbar() {
    return (

        <div className='main-bar'>
            <div className="logo">
                <Link to="/"><span>SpaceNotes</span></Link>
            </div>
            <ul className='nav'>
                <Link to="/note"><li>Quick note</li></Link>
                <Link to="/login"><li>Sign in</li></Link>
                <Link to="/about"><li>About</li></Link>
            </ul>
        </div>
    )
}
