import React, { useState } from 'react';
import rouletteSpinnyPart from '../images/RouletteWheel_Inside.png';
import '../components/roulette.css';
import RouletteButton from '../components/roulette_button.jsx';
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Navbar from "../components/Navbar"

const Roulette = () => {
    let rouletteNumbers = [ 0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6,
                    27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16,
                    33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12,
                    35, 3, 26]
    let space = -1;

    //the array for the betting buttons, 0-36 numbers, 37-40 even/odd and red/black
    const [betArray, setBetArray] = useState(Array(41).fill(0));

    //roulette javascript stuff
    const [resultMessage, setResultMessage] = useState("");
    const [spinning, setSpinning] = useState(false);
    const [winMessage, setWinMessage] = useState("");
    const [activeBetChip, setBetChip] = useState(1);

    //user data stuff
    const [initializedBal, setBalInited] = useState(false);
    const [gottenID, setID] = useState("undef");

    //authenticator and client
    const {user} = useAuthenticator((context) => [context.user]);
    const client = generateClient();
    const [money, setMoney] = useState(0);
    const [spins, setSpins] = useState(0);

    // (Oskar Engen) function to get players balance
    getPlayersBal();
    function getPlayersBal(){
        const users = client.graphql({ query: queries.listUsers });
        users.then((value) => {
            if(user != null && user.username != null)
            value.data.listUsers.items.forEach((u) => {
                if(u.Username === user.username){
                    if(!initializedBal){
                        setBalInited(true);
                        setID(u.id);
                        setMoney(u.Balance);
                        setSpins(u.TotalSpinsRoullette);
                    }
                }
            });
        })
    }
    
    // (Oskar Engen) function to push an updated balance to the user
    function pushBal(newBal){
        if(gottenID === "undef")
            return;
        client.graphql({ query: mutations.updateUser, variables: { input: {
            id: gottenID,
            Balance: newBal
        }}});
    }

    // function to push the new number of roulette spins to the user's account
    function pushSpins(newVal){
        if(gottenID === "undef")
            return;
        client.graphql({ query: mutations.updateUser, variables: { input: {
            id: gottenID,
            TotalSpinsRoullette: newVal
        }}});
    }

    const handleBetChip = (value) =>
    {
        setBetChip(value);
    }

    const clearBetBoard = () =>
    {
        //clearing button bets
        for (let i = 0; i < 41; i++)
        {
            betArray[i] = 0;
        }
    }

    const spinWheel = () => 
    {
        //turning all negative values to 0's because of a thing with the button logic where you can get negative values
        for (let i = 0; i < 41; i++)
        {
            if (betArray[i] < 0)
            {
                betArray[i] = 0;
            }
        }

        //checking if there is a bet on any index in the array
        if (betArray.every(bet => bet === 0))
        {
            //if not, tell the user an error
            let error = document.getElementById('error');
            error.textContent = "You must place a bet first.";
            error.style.color = "red";
            return;
        }
        else
        {
            let error = document.getElementById('error');
            error.textContent = "";
        }

        //taking money away from account based on bets placed
        //if the bet is more than the users money, dont place the bet and send an error
        let totalBetAmount = betArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        if (totalBetAmount > money)
        {
            //if not, tell the user an error
            let error = document.getElementById('error');
            error.textContent = "Your bet is too big.";
            error.style.color = "red";
            return;
        }
        else
        {
            let error = document.getElementById('error');
            error.textContent = "";
            setMoney(prevMoney => prevMoney - totalBetAmount);
        }

        setWinMessage('Spinning...');

        // Simulate spinning for 3 seconds and disable the buttons while its spinning
        setSpinning(true);
        setTimeout(() => {
            setSpinning(false);
            let indexRandomixer = Math.floor(Math.random() * 37);
            space = rouletteNumbers[indexRandomixer];
            setResultMessage(`Result: ${space}`);

            //payout/winmessage logic here
            //number space winning, 0 if no bet here
            let winnings = betArray[space] * 36;

            //special buttons logic
            //if the space is even, pay out even/red 2to1, otherwise pay out odd/black 2to1
            if (space % 2 === 0)
            {
                winnings += (betArray[37] * 2) + (betArray[38] * 2);
            }
            else
            {
                winnings += (betArray[39] * 2) + (betArray[40] * 2);
            }

            //giving out winnings/spins and displaying the win message
            setMoney(money + winnings);
            setMoney(prevMoney => prevMoney - totalBetAmount);
            pushBal(money - totalBetAmount + winnings);
            setSpins(spins + 1);
            pushSpins(spins + 1);
            setWinMessage(`You won $${winnings}!`);
        }, 3000);
    }

    return(
    <div>
        <Navbar currentPage={"main"}/>


            {/* This is the Roulette Game Code */}
            <div className="roulette_background" style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
            {/* This div holds the users balance, the betting box and the button to spin the wheel */}
            <div style={{ marginLeft: '10px', padding: '15px' }}>
                {/* This div is for the wheel */}
                <div>
                    <img 
                        className={`wheel ${spinning ? 'spinning' : ''}`} 
                        src={rouletteSpinnyPart} alt="Wheel Inside" 
                    />
                </div>

                {/* The users current money, and inputs for the bet */}
                <p>Tokens: {money}</p>
                <div className='bet_chip_buttons_container'>
                    <div style={{border: `2px solid ${activeBetChip === 1 ? 'black' : 'grey'}` }}>
                        <button className='bet_chip_button' style={{border: '2px solid red'}} onClick={() => handleBetChip(1)}>1</button>
                    </div>
                    <div style={{border: `2px solid ${activeBetChip === 5 ? 'black' : 'grey'}` }}>
                        <button className='bet_chip_button' style={{border: '2px solid blue'}} onClick={() => handleBetChip(5)}>5</button>
                    </div>
                    <div style={{border: `2px solid ${activeBetChip === 10 ? 'black' : 'grey'}` }}>
                        <button className='bet_chip_button' style={{border: '2px solid yellow'}} onClick={() => handleBetChip(10)}>10</button>
                    </div>
                    <div style={{border: `2px solid ${activeBetChip === 50 ? 'black' : 'grey'}` }}>
                        <button className='bet_chip_button' style={{border: '2px solid orange'}} onClick={() => handleBetChip(50)}>50</button>
                    </div>
                    <div style={{border: `2px solid ${activeBetChip === 100 ? 'black' : 'grey'}` }}>
                        <button className='bet_chip_button' style={{border: '2px solid purple'}} onClick={() => handleBetChip(100)}>100</button>
                    </div>
                    <div style={{border: `2px solid ${activeBetChip === 500 ? 'black' : 'grey'}` }}>
                        <button className='bet_chip_button' style={{border: '2px solid green'}} onClick={() => handleBetChip(500)}>500</button>
                    </div>
                    <div style={{border: `2px solid ${activeBetChip === 1000 ? 'black' : 'grey'}` }}>
                        <button className='bet_chip_button' style={{border: '2px solid white'}} onClick={() => handleBetChip(1000)}>1000</button>
                    </div>
                    <div style={{border: `2px solid ${activeBetChip === 5000 ? 'black' : 'grey'}` }}>
                        <button className='bet_chip_button' style={{border: '2px solid black'}} onClick={() => handleBetChip(5000)}>5000</button>
                    </div>
                    <button style={{border: '2px solid grey', transform: 'translate(80px, 0px)'}} onClick={clearBetBoard}>Clear Board</button>
                </div>

                {/* This div is for displaying the result of the wheel spin */}
                <div>
                    <p>{resultMessage}</p>
                    <p>{winMessage}</p>
                </div>

                {/*when this button is clicked, the wheel will spin and will disable the buttons*/}
                <div>
                    <button onClick={spinWheel} disabled={spinning}>Spin Wheel</button>
                    <span id='error'></span>
                </div>
            </div>

            {/* This div holds all the number buttons for betting */}
            <div>
            {/* This shows the total spins */}
            <h3>Roulette spins on this account: {spins}</h3>

            {/* This is the number buttons */}
            <div className='roulette_board'>
                <div>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={0} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={0}/>
                </div>
                {/* Buttons 1-3 */}
                <div className='roulette_board_row'>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={3} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={3}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={2} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={2}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={1} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={1}/>
                </div>
                <div className='roulette_board_row'>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={6} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={6}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={5} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={5}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={4} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={4}/>
                </div>
                <div className='roulette_board_row'>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={9} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={9}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={8} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={8}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={7} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={7}/>
                </div>
                <div className='roulette_board_row'>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={12} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={12}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={11} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={11}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={10} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={10}/>
                </div>
                <div className='roulette_board_row'>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={15} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={15}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={14} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={14}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={13} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={13}/>
                </div>
                <div className='roulette_board_row'>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={18} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={18}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={17} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={17}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={16} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={16}/>
                </div>
                <div className='roulette_board_row'>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={21} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={21}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={20} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={20}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={19} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={19}/>
                </div>
                <div className='roulette_board_row'>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={24} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={24}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={23} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={23}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={22} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={22}/>
                </div>
                <div className='roulette_board_row'>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={27} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={27}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={26} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={26}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={25} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={25}/>
                </div>
                <div className='roulette_board_row'>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={30} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={30}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={29} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={29}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={28} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={28}/>
                </div>
                <div className='roulette_board_row'>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={33} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={33}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={32} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={32}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={31} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={31}/>
                </div>
                <div className='roulette_board_row'>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={36} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={34}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={35} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={35}/>
                    <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={34} buttonType={'number'} betArray={betArray} setBetArray={setBetArray} index={36}/>
                </div>
            </div>

            {/* This is the special buttons */}
            <div className='roulette_board'>
                <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={'Even'} buttonType={'special'} betArray={betArray} setBetArray={setBetArray} index={37}/>
                <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={'Red'} buttonType={'special'} betArray={betArray} setBetArray={setBetArray} index={38}/>
                <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={'Black'} buttonType={'special'} betArray={betArray} setBetArray={setBetArray} index={39}/>
                <RouletteButton disabled={spinning} betAmount={activeBetChip} toDisplay={'Odd'} buttonType={'special'} betArray={betArray} setBetArray={setBetArray} index={40}/>
            </div>
            </div>
        </div>
    </div>
    )
}

export default Roulette;