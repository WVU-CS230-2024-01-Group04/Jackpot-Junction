import React from "react"
import Navbar from "../components/Navbar"
import blackjackImg1 from "../images/blackjack.jpg"
import GameCard from "../components/GameCard"

const BlackjackPage = () => {
    return(
        <div>
            <Navbar currentPage="blackjack"/>

            <h1>Blackjack</h1>
            <h3>Here is where you can find black jack.</h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '25px'}}>
                <GameCard image={blackjackImg1} link="/blackjack1" title="BlackJack" description="Best black jack in the whole world?!?"/>
            </div>
        </div>
    )
}

export default BlackjackPage 