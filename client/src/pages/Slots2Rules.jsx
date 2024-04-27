import React from "react"
import Navbar from "../components/Navbar"
import slotsimg1 from "../images/slots.png"
import GameCard from "../components/GameCard"
import "../styles/MainPage.css"

export default () =>{
    return(
        <div>
            <Navbar currentPage="main"/>
            <p>This version of slots is more straightforward. It costs 25 tokens to play, and returns 50 tokens if all five match, 25 if four match, and 15 if three match.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '25px'}}>
                <GameCard image={slotsimg1} link="/slots2" title="Slots"/>
            </div>
        </div>
    )
}