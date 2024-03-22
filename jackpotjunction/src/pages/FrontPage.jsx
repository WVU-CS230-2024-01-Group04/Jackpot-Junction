import React from "react"
import Navbar from "../components/Navbar"
import "../styles/FrontPage.css"
import logo from "../images/Jackpot_Junction_Logo.png"

const FrontPage = () => {
    return(
        <div className="FrontPage">
            <Navbar />
            <img class="frontpage_logo" src={logo} alt="logo" width="800" height="500" />

            <div class="frontpage_welcome">
                <h1>Welcome to Jackpot Junction!</h1>
                <h3>Please sign-in with your information and you'll be gambling in no time!</h3>
            </div>
        </div>
    )
}

export default FrontPage