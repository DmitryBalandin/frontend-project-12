import { useState } from 'react'

// import './App.css'
import './styles/global.scss'
import {  Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from './pages/Login/LoginPage';
import MainPage from './pages/Main/MainPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import SignUpPage from './pages/Signup/SignupPage';

function App() {
  const [count, setCount] = useState(0)

  return (
     <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/signup" element={<SignUpPage/>} />
                    <Route path="/" element={<MainPage/>} />
                    <Route path="*" element={<NotFoundPage/>} />
                </Routes>
      </BrowserRouter>
  
  )
}

export default App
