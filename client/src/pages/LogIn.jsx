import React from "react"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"
import LoginForm from "../components/LoginForm"

const LogIn = () => {
    return(
        <div>
            <Navbar currentPage="login/signup"/>

            <h1>Login Page</h1>
            <p>Input your mothers maiden name NOW!</p>
            <LoginForm />
            <Link to="/main">Main</Link>
        </div>
    )
}

export default LogIn