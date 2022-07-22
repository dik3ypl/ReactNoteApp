import React, { useState } from 'react';
import './App.css';
import styled, { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme, GlobalStyles } from "./themes"
import RegisterForm from "./components/RegisterForm"
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import LoginForm from './components/LoginForm';
import Verify from './components/Verify';
import TestFile from './components/TestFile';
import TestFile2 from './components/TestFile2';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


const StyledApp = styled.div``;

function App() {
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === 'light' ? setTheme("dark") : setTheme("light")
  }

  return (
    <Router>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <StyledApp>
          <Link to="/">Main</Link>
          <Link to="/xxx">GUNWO</Link>
          <MainPage />
          <RegisterForm />
          <LoginForm />

          <Routes>
            <Route path="/" element={<TestFile />} />
            <Route path="/xxx" element={<TestFile2 />} />
            <Route path="/verify" element={<Verify />} />
          </Routes>
        </StyledApp>
      </ThemeProvider>
    </Router>
  );
}

export default App;
