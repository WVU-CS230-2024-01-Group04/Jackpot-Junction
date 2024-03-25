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
            <div class="fav_games">
                <!-- A list of favorite games determined by playtime, low priority for now -->
            </div>
            <div class="stat_block">
                <!-- a short summary of the user's stats or win/loss ratio -->
            </div>
            <div class="social">
                <!-- get info from social page, basically a quick guide to friends, make it scroll down -->
            </div>
            <div class="bet_info">
                <!-- list of bets, get info from games -->
            </div>
        </div>
    )
}

export default MainPage
