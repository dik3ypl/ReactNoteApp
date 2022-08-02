import React, { useState } from 'react';
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
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


const StyledApp = styled.div``;

function App() {
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === 'light' ? setTheme("dark") : setTheme("light")
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
          </Routes>
        </Router>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
