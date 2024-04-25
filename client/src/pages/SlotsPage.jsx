import React from "react"
import Navbar from "../components/Navbar"
import slotsimg1 from "../images/slots.png"
import GameCard from "../components/GameCard"

const SlotsPage = () => {
    return(
        <div>
            <Navbar currentPage="slots"/>

            <h1>Slots Page</h1>
            <h3>Here is where all slots-type games on the site are.</h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '25px'}}>
                <GameCard image={slotsimg1} link="/SlotsRules" title="Slots 1" description="The first slots game ever in existence its crazy."/>
                <GameCard image={slotsimg1} link="/Slots2Rules" title="Slots 2" description="The sequel we've all been waiting for"/>
            </div>
        </div>
    )
}

export default SlotsPage
