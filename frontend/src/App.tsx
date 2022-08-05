import React, { useState, useEffect, SetStateAction } from 'react';
import { useCookies } from 'react-cookie';
import './App.css';
import styled, { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme, GlobalStyles } from "./themes"
import RegisterForm from "./components/RegisterForm"
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import LoginForm from './components/LoginForm';
import Verify from './components/Verify';
import ResetPassword from './components/ResetPassword';
import About from './components/About';
import Hero from './components/Hero';
import Logout from './components/Logout';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


const StyledApp = styled.div``;

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['session-code', 'session-uid']);
  const [theme, setTheme] = useState("light");
  const [session, setSession] = useState(false);
  const [username, setUsername] = useState("");

  const checkSession = async () => {
    if (cookies['session-uid'] && cookies['session-code']) {
      const sessionStatus = await fetch("http://localhost:3001/checkSession", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: cookies["session-uid"], code: cookies["session-code"] })
      }).then(res => res.json())
      if (sessionStatus.session) {
        setUsername(sessionStatus.name)
      }
      setSession(sessionStatus.session)
    } else {
      setSession(false)
    }

    if (cookies['session-uid'] && cookies['session-code']) {
      fetch("http://localhost:3001/longerSession", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: cookies["session-uid"], code: cookies["session-code"] })
      }).then(res => res.json()).then(res => console.log(res))
    }
  }

  const themeToggler = () => {
    theme === 'light' ? setTheme("dark") : setTheme("light")
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
        <Router>
          <Navbar session={session} name={username} />
          <Routes>
            <Route path="/" element={<Hero sessionFunc={checkSession} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/logout" element={<Logout session={session} />} />
          </Routes>
        </Router>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
