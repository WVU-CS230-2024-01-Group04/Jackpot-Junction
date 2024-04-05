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
            <h6>
                    The rules are simple:
                </h6>

            <div style={{ display: 'flex', justifyContent: 'center'}}>    
                <ul>
                    <li>you and the dealer are given two cards (a hand). </li>
                    <li>
                    Your goal is to get as close to 21 as possible through adding the number on the cards in your hand.
                    </li>
                    <li>
                    you can add cards to your hand by pressing the "hit" button.
                    </li>
                    <li>
                        Aces can be 1s or 11s. Kings, Queens, and Jacks are 10s. 
                    </li>
                    <li>
                        You win by having a total number closer to 21 than the dealer, but you cannot go over 21.
                    </li>
                </ul>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '25px'}}>
                <GameCard image={blackjackImg1} link="/blackjack1" title="BlackJack" />
            </div>
        </div>
    )
}

export default BlackjackPage 
