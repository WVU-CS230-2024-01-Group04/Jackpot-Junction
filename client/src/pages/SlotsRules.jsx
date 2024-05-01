import React from "react"
import Navbar from "../components/Navbar"
import slotsimg1 from "../images/slots.png"
import GameCard from "../components/GameCard"
import "../styles/MainPage.css"

const SlotsRules = () => {
    return(
        <div>
            {/*Calls the navbar component*/}
            <Navbar currentPage="main"/>

            <h1>Slots</h1>
            <h3>Here are the rules for slots:</h3>

            {/*Creates a unorderd list of rules outlining how to play*/}
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

                {/*creates a table of the payouts for the game*/}
                <table>
                    <tr>
                        <th id = "topRow">
                            <tr>
                                <td className="Emoji">🍌</td>
                                <td>3</td>
                                <td>50 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍌</td>
                                <td>4</td>
                                <td>100 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍌</td>
                                <td>5</td>
                                <td>150 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍌</td>
                                <td>6</td>
                                <td>200 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍌</td>
                                <td>7</td>
                                <td>250 points</td>
                            </tr>
                        </th>
                        <th id = "topRow">
                            <tr>
                                <td className="Emoji">🍎</td>
                                <td>3</td>
                                <td>10 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍎</td>
                                <td>4</td>
                                <td>20 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍎</td>
                                <td>5</td>
                                <td>30 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍎</td>
                                <td>6</td>
                                <td>40 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍎</td>
                                <td>7</td>
                                <td>50 points</td>
                            </tr>
                        </th>
                        <th id = "topRow">
                            <tr>
                                <td className="Emoji">🍒</td>
                                <td>3</td>
                                <td>100 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍒</td>
                                <td>4</td>
                                <td>200 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍒</td>
                                <td>5</td>
                                <td>300 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍒</td>
                                <td>6</td>
                                <td>400 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍒</td>
                                <td>7</td>
                                <td>500 points</td>
                            </tr>
                        </th>
                        <th id = "topRow">
                            <tr>
                                <td className="Emoji">🎰</td>
                                <td>3</td>
                                <td>500 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🎰</td>
                                <td>4</td>
                                <td>1000 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🎰</td>
                                <td>5</td>
                                <td>1500 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🎰</td>
                                <td>6</td>
                                <td>2000 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🎰</td>
                                <td>7</td>
                                <td>2500 points</td>
                            </tr>
                        </th>
                    </tr>
                    <tr>
                        <th id = "topRow">
                            <tr>
                                <td className="Emoji">🍏</td>
                                <td>3</td>
                                <td>10 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍏</td>
                                <td>4</td>
                                <td>20 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍏</td>
                                <td>5</td>
                                <td>30 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍏</td>
                                <td>6</td>
                                <td>40 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍏</td>
                                <td>7</td>
                                <td>50 points</td>
                            </tr>
                        </th>
                        <th id = "topRow">
                            <tr>
                                <td className="Emoji">🍍</td>
                                <td>3</td>
                                <td>100 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍍</td>
                                <td>4</td>
                                <td>150 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍍</td>
                                <td>5</td>
                                <td>200 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍍</td>
                                <td>6</td>
                                <td>250 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍍</td>
                                <td>7</td>
                                <td>300 points</td>
                            </tr>
                        </th>
                        <th id = "topRow">
                            <tr>
                                <td className="Emoji">🍊</td>
                                <td>3</td>
                                <td>100 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍊</td>
                                <td>4</td>
                                <td>200 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍊</td>
                                <td>5</td>
                                <td>300 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍊</td>
                                <td>6</td>
                                <td>400 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍊</td>
                                <td>7</td>
                                <td>500 points</td>
                            </tr>
                        </th>
                        <th id = "topRow">
                            <tr>
                                <td className="Emoji" rowSpan={5}>🍋</td>
                                <td>3</td>
                                <td rowSpan={5}>0 Points</td>
                            </tr>
                            <tr>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>7</td>
                            </tr>
                        </th>
                    </tr>
                    <tr>
                        <th id = "topRow">
                            <tr>
                                <td className="Emoji" rowSpan={5}>🍉</td>
                                <td>3</td>
                                <td rowSpan={5}>0 Points</td>
                            </tr>
                            <tr>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>7</td>
                            </tr>
                        </th>
                        <th id = "topRow">
                            <tr>
                                <td className="Emoji" rowSpan={5}>🍇</td>
                                <td>3</td>
                                <td rowSpan={5}>0 Points</td>
                            </tr>
                            <tr>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>7</td>
                            </tr>
                        </th>
                        <th id = "topRow">
                            <tr>
                                <td className="Emoji">🍓</td>
                                <td>3</td>
                                <td>75 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍓</td>
                                <td>4</td>
                                <td>100 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍓</td>
                                <td>5</td>
                                <td>125 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍓</td>
                                <td>6</td>
                                <td>150 points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">🍓</td>
                                <td>7</td>
                                <td>175 points</td>
                            </tr>
                        </th>
                        <th id = "topRow">
                            <tr>
                                <td className="Emoji">💰</td>
                                <td>3</td>
                                <td>200 Points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">💰</td>
                                <td>4</td>
                                <td>400 Points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">💰</td>
                                <td>5</td>
                                <td>600 Points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">💰</td>
                                <td>6</td>
                                <td>800 Points</td>
                            </tr>
                            <tr>
                                <td className="Emoji">💰</td>
                                <td>7</td>
                                <td>1000 Points</td>
                            </tr>
                        </th>
                    </tr>
                </table>
            </div>

            {/*creates a game card to send the user to the slots game*/}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '25px'}}>
                <GameCard image={slotsimg1} link="/slots1" title="Slots"/>
            </div>
        </div>
    )
}

export default SlotsRules
