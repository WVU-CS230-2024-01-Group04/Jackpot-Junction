import React from "react"
import Navbar from "../components/Navbar"
import slotsimg1 from "../images/slots.png"
import GameCard from "../components/GameCard"

const SlotsRules = () => {
    return(
        <div>
            <Navbar currentPage="slots"/>

            <h1>Slots</h1>
            <h3>Here are the rules for slots:</h3>

            <div style={{ display: 'flex', justifyContent: 'center'}}>    
                <ul>
                    <li>You are playing alone.</li>
                    <li>
                    You can bet a certain amount of money and watch the wheels spin.
                    </li>
                    <li>
                    If the wheels land in a certain combination, you win.
                    </li>
                    <li>Simple, Right?</li>
                </ul>
            </div>

            <div>
                <h3>Here are the payouts:</h3>
                
                <p>placeholder</p>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '25px'}}>
                <GameCard image={slotsimg1} link="/slots1" title="Slots" />
            </div>
        </div>
    )
}

export default SlotsRules