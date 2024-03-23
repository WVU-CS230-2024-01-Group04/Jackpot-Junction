import React from "react"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"
import SignUpForm from "../components/SignUpForm"

const SignUp = () => {
    return(
        <div>
            <Navbar currentPage="signup"/>

            <h1>Signup Page</h1>
            <p>Input your mothers maiden name NOW!</p>
            <SignUpForm/>
            <Link to="/main">Main</Link>
        </div>
    )
}

export default SignUp