import React from "react"
import Navbar from "../components/Navbar"
import GameCard from "../components/GameCard"
import blackjackImg1 from "../images/roulette.jpg"

const CardsPage = () => {
    return(
        <div>
            <Navbar currentPage="cards"/>

            <h1>Chance Games Page</h1>
            <h3>Here is where all chance type games on the site are.</h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '25px'}}>
                <GameCard image={blackjackImg1} link="/rouletterules" title="Roulette" description="'Roulette is a game' - George Bush"/>
            </div>
        </div>
    )
}

export default CardsPage