import React from "react"
import Navbar from "../components/Navbar"
import blackjackImg1 from "../images/roulette.jpg"
import GameCard from "../components/GameCard"

const BlackjackPage = () => {
    return(
        <div>
            <Navbar currentPage="main"/>

            <h1>Roulette</h1>
            <h3>Here is where you can find roulette.</h3>
            <h6>
                    The rules are simple:
                </h6>

            <div style={{ display: 'flex', justifyContent: 'center'}}>    
                <ul>
                    <li>You pick a number from the board</li>
                    <li>
                        Try to get lucky with the right number to get a 36-1 reward!
                    </li>
                </ul>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '25px'}}>
                <GameCard image={blackjackImg1} link="/roulette" title="Roulette" />
            </div>
        </div>
    )
}

export default BlackjackPage 
