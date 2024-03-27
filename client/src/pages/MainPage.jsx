import React from "react"
import Navbar from "../components/Navbar"
import logo from "../images/Jackpot_Junction_Logo.png"
import GameCard from "../components/GameCard"
import { Link } from "react-router-dom"

const MainPage = () => {
    return(
        <div>
            <Navbar currentPage="main"/>

            <img src={logo} alt="logo" width="800" height="500" />
            <div>
                <h1>Welcome to Jackpot Junction!</h1>
            </div>
            <div class="mainpage">
                <h2>Favorites</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '25px'}}>
                    <GameCard image="..." link="..." title="Game #1" description="The players top most played game"/>
                    <GameCard image="..." link="..." title="Game #2" description="The players 2nd most played game"/>
                    <GameCard image="..." link="..." title="Game #3" description="The players 3rd most played game"/>
                    <GameCard image="..." link="..." title="Game #4" description="The players 4th most played game"/>
                    <Link to="/user">See More...</Link>
                </div>
            </div>
            <div class="mainpage">
                <h2>Quick Stats</h2>
                <div>
                    <p>User Stats</p>
                </div>
            <div class="social">
                { /*get info from social page, basically a quick guide to friends, make it scroll down */}
            </div>
            <div class="bet_info">
                { /*list of bets, get info from games */}
            </div>
        </div>
        </div>
    )
}

export default MainPage
