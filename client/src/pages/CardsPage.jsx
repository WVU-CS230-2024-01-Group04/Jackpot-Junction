import React from "react"
import Navbar from "../components/Navbar"
import cardimg1 from "../images/blackjack.jpg"
import GameCard from "../components/GameCard"

const CardsPage = () => {
    return(
        <div>
            <Navbar currentPage="cards"/>

            <h1>Cards Page</h1>
            <h3>Here is where all cards-type games on the site are.</h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '25px'}}>
                <GameCard image={cardimg1} link="/blackjack" title="Blackjack" description="Blackjack Pershing ain't got no clue"/>
            </div>
        </div>
    )
}

export default CardsPage