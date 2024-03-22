import React from "react"
import Navbar from "../components/Navbar"
import logo from "../images/Jackpot_Junction_Logo.png"

const MainPage = () => {
    return(
        <div>
            <Navbar currentPage="main"/>

            <img src={logo} alt="logo" width="800" height="500" />
            <div class="frontpage_welcome">
                <h1>Welcome to Jackpot Junction!</h1>
            </div>
        </div>
    )
}

export default MainPage