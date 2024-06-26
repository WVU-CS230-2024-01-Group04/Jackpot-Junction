import React, { useState } from 'react';
import styles from '../components/Blackjack.module.css';
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

// Imports card images for Clubs
import twoOfClubs from '../images/blackjackCards1/2_of_clubs.png';
import threeOfClubs from '../images/blackjackCards1/3_of_clubs.png';
import fourOfClubs from '../images/blackjackCards1/4_of_clubs.png';
import fiveOfClubs from '../images/blackjackCards1/5_of_clubs.png';
import sixOfClubs from '../images/blackjackCards1/6_of_clubs.png';
import sevenOfClubs from '../images/blackjackCards1/7_of_clubs.png';
import eightOfClubs from '../images/blackjackCards1/8_of_clubs.png';
import nineOfClubs from '../images/blackjackCards1/9_of_clubs.png';
import tenOfClubs from '../images/blackjackCards1/10_of_clubs.png';
import jackOfClubs from '../images/blackjackCards1/jack_of_clubs2.png';
import queenOfClubs from '../images/blackjackCards1/queen_of_clubs2.png';
import kingOfClubs from '../images/blackjackCards1/king_of_clubs2.png';
import aceOfClubs from '../images/blackjackCards1/ace_of_clubs.png';

// Imports card images for Diamonds
import twoOfDiamonds from '../images/blackjackCards1/2_of_diamonds.png';
import threeOfDiamonds from '../images/blackjackCards1/3_of_diamonds.png';
import fourOfDiamonds from '../images/blackjackCards1/4_of_diamonds.png';
import fiveOfDiamonds from '../images/blackjackCards1/5_of_diamonds.png';
import sixOfDiamonds from '../images/blackjackCards1/6_of_diamonds.png';
import sevenOfDiamonds from '../images/blackjackCards1/7_of_diamonds.png';
import eightOfDiamonds from '../images/blackjackCards1/8_of_diamonds.png';
import nineOfDiamonds from '../images/blackjackCards1/9_of_diamonds.png';
import tenOfDiamonds from '../images/blackjackCards1/10_of_diamonds.png';
import jackOfDiamonds from '../images/blackjackCards1/jack_of_diamonds2.png';
import queenOfDiamonds from '../images/blackjackCards1/queen_of_diamonds2.png';
import kingOfDiamonds from '../images/blackjackCards1/king_of_diamonds2.png';
import aceOfDiamonds from '../images/blackjackCards1/ace_of_diamonds.png';

// Imports card images for Hearts
import twoOfHearts from '../images/blackjackCards1/2_of_hearts.png';
import threeOfHearts from '../images/blackjackCards1/3_of_hearts.png';
import fourOfHearts from '../images/blackjackCards1/4_of_hearts.png';
import fiveOfHearts from '../images/blackjackCards1/5_of_hearts.png';
import sixOfHearts from '../images/blackjackCards1/6_of_hearts.png';
import sevenOfHearts from '../images/blackjackCards1/7_of_hearts.png';
import eightOfHearts from '../images/blackjackCards1/8_of_hearts.png';
import nineOfHearts from '../images/blackjackCards1/9_of_hearts.png';
import tenOfHearts from '../images/blackjackCards1/10_of_hearts.png';
import jackOfHearts from '../images/blackjackCards1/jack_of_hearts2.png';
import queenOfHearts from '../images/blackjackCards1/queen_of_hearts2.png';
import kingOfHearts from '../images/blackjackCards1/king_of_hearts2.png';
import aceOfHearts from '../images/blackjackCards1/ace_of_hearts.png';

// Imports card images for Spades
import twoOfSpades from '../images/blackjackCards1/2_of_spades.png';
import threeOfSpades from '../images/blackjackCards1/3_of_spades.png';
import fourOfSpades from '../images/blackjackCards1/4_of_spades.png';
import fiveOfSpades from '../images/blackjackCards1/5_of_spades.png';
import sixOfSpades from '../images/blackjackCards1/6_of_spades.png';
import sevenOfSpades from '../images/blackjackCards1/7_of_spades.png';
import eightOfSpades from '../images/blackjackCards1/8_of_spades.png';
import nineOfSpades from '../images/blackjackCards1/9_of_spades.png';
import tenOfSpades from '../images/blackjackCards1/10_of_spades.png';
import jackOfSpades from '../images/blackjackCards1/jack_of_spades2.png';
import queenOfSpades from '../images/blackjackCards1/queen_of_spades2.png';
import kingOfSpades from '../images/blackjackCards1/king_of_spades2.png';
import aceOfSpades from '../images/blackjackCards1/ace_of_spades.png';
import { get } from 'aws-amplify/api';

const Blackjack = () => {
    // Sets the card values for each card by creating an object with the corresponding image and value
    const cardValues = {
        '2C': { img: twoOfClubs, value: 2 },
        '3C': { img: threeOfClubs, value: 3 },
        '4C': { img: fourOfClubs, value: 4 },
        '5C': { img: fiveOfClubs, value: 5 },
        '6C': { img: sixOfClubs, value: 6 },
        '7C': { img: sevenOfClubs, value: 7 },
        '8C': { img: eightOfClubs, value: 8 },
        '9C': { img: nineOfClubs, value: 9 },
        '10C': { img: tenOfClubs, value: 10 },
        'JC': { img: jackOfClubs, value: 10 },
        'QC': { img: queenOfClubs, value: 10 },
        'KC': { img: kingOfClubs, value: 10 },
        'AC': { img: aceOfClubs, value: 11 },
    
        '2D': { img: twoOfDiamonds, value: 2 },
        '3D': { img: threeOfDiamonds, value: 3 },
        '4D': { img: fourOfDiamonds, value: 4 },
        '5D': { img: fiveOfDiamonds, value: 5 },
        '6D': { img: sixOfDiamonds, value: 6 },
        '7D': { img: sevenOfDiamonds, value: 7 },
        '8D': { img: eightOfDiamonds, value: 8 },
        '9D': { img: nineOfDiamonds, value: 9 },
        '10D': { img: tenOfDiamonds, value: 10 },
        'JD': { img: jackOfDiamonds, value: 10 },
        'QD': { img: queenOfDiamonds, value: 10 },
        'KD': { img: kingOfDiamonds, value: 10 },
        'AD': { img: aceOfDiamonds, value: 11 },
    
        '2H': { img: twoOfHearts, value: 2 },
        '3H': { img: threeOfHearts, value: 3 },
        '4H': { img: fourOfHearts, value: 4 },
        '5H': { img: fiveOfHearts, value: 5 },
        '6H': { img: sixOfHearts, value: 6 },
        '7H': { img: sevenOfHearts, value: 7 },
        '8H': { img: eightOfHearts, value: 8 },
        '9H': { img: nineOfHearts, value: 9 },
        '10H': { img: tenOfHearts, value: 10 },
        'JH': { img: jackOfHearts, value: 10 },
        'QH': { img: queenOfHearts, value: 10 },
        'KH': { img: kingOfHearts, value: 10 },
        'AH': { img: aceOfHearts, value: 11 },
    
        '2S': { img: twoOfSpades, value: 2 },
        '3S': { img: threeOfSpades, value: 3 },
        '4S': { img: fourOfSpades, value: 4 },
        '5S': { img: fiveOfSpades, value: 5 },
        '6S': { img: sixOfSpades, value: 6 },
        '7S': { img: sevenOfSpades, value: 7 },
        '8S': { img: eightOfSpades, value: 8 },
        '9S': { img: nineOfSpades, value: 9 },
        '10S': { img: tenOfSpades, value: 10 },
        'JS': { img: jackOfSpades, value: 10 },
        'QS': { img: queenOfSpades, value: 10 },
        'KS': { img: kingOfSpades, value: 10 },
        'AS': { img: aceOfSpades, value: 11 }
    };

    /**
     * Shuffles the given deck of cards
     * @param {string[]} deck  The deck of cards to be shuffled
     * @returns {string[]} The shuffled deck of cards
     */
    const shuffleDeck = (deck) => {
        let shuffledDeck = [...deck];
        for (let i = shuffledDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
        }
        return shuffledDeck;
    };

    const client = generateClient();
    const {user} = useAuthenticator((context) => [context.user]);

    const [initializedBal, setBalInited] = useState(false);
    const [gamesCount, setGamesCount] = useState(1);
    const [lossCount, setLossCount] = useState(1);
    const [winCount, setWinCount] = useState(1);
    const [playerPoints, setPlayerPoints] = useState(0);
    const [dealerPoints, setDealerPoints] = useState(0);
    const [tokens, setTokens] = useState(100);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("");
    const [playerCards, setPlayerCards] = useState([]);
    const [dealerCards, setDealerCards] = useState([]);
    const [betConfirmed, setBetConfirmed] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [bet, setBet] = useState("");
    const [deck, setDeck] = useState([]); 

    getPlayersBal(user)

    // Function that starts a new game and resets points whenever a new game is started
    const startNewGame = () => {
        if (betConfirmed && tokens >= bet) {
        setTokens(tokens - bet);
        const cardCodes = Object.keys(cardValues);
        const shuffled = shuffleDeck(cardCodes);  // Shuffle this array
        const playerInitialCards = shuffled.slice(0, 2);
        const dealerInitialCard = shuffled.slice(2, 3);

        setPlayerCards(playerInitialCards);
        setDealerCards(dealerInitialCard);
        setDeck(shuffled.slice(3));  
        setPlayerPoints(calculatePoints(playerInitialCards));
        setDealerPoints(calculatePoints(dealerInitialCard));
        setGameOver(false);
        setGameStarted(true);  
        setMessage("");
        } else {
           setMessage("Not enough tokens to play or bet not confirmed.");
        }
    };
    
    /**
     * Calculates the total points of the card thats shown
     * @param {string[]} cards  The cards that are going to be calculated
     * @returns {number} The total points of the cards
     */
    const calculatePoints = (cards) => {
    let total = 0;
    let aceCount = 0;

    cards.forEach(cardCode => {
        const card = cardValues[cardCode];
        if (card.value === 11) {  
            aceCount += 1;
            total += 11;
        } else {
            total += card.value;
        }
    });

    while (total > 21 && aceCount > 0) {
        total -= 10;  
        aceCount -= 1;
    }

     return total;
    };

    // Function that controls what happens when players hit
    const playerHits = () => {
        if (deck.length > 0 && tokens >= 0 && !gameOver) {
            const newCard = deck[0];
            const newDeck = deck.slice(1);
            const newPlayerCards = [...playerCards, newCard];
            const newPlayerPoints = calculatePoints(newPlayerCards);
    
            setDeck(newDeck);
            setPlayerCards(newPlayerCards);
            setPlayerPoints(newPlayerPoints);
    
            if (newPlayerPoints > 21) {
                setMessage("Player busts! Dealer wins.");
                setGameOver(true);
                setGameStarted(false);  
                setBetConfirmed(false); 
                setBet("");  
                const reloss = lossCount + 1;
                const regame = gamesCount + 1;
                setGamesCount(regame);
                setLossCount(reloss);
                pushBal(tokens, winCount, reloss, regame);
            }
        }
    };

    // Function that controls what happens when a player stands
    const playerStands = () => {
        let newDealerPoints = dealerPoints;
        let newDealerCards = [...dealerCards];
        let newDeck = [...deck];
    
        const hitDealerCard = () => {
            if ((newDealerPoints < playerPoints || newDealerPoints < 10) && newDealerPoints < 21 && newDeck.length > 0) {
                const newCard = newDeck[0];
                newDeck = newDeck.slice(1);
                newDealerCards.push(newCard);
                newDealerPoints = calculatePoints(newDealerCards);
    
                setDealerCards(newDealerCards);
                setDealerPoints(newDealerPoints);
                setDeck(newDeck);
    
                setTimeout(hitDealerCard, 1000); 
            } else {
                finishGame();
            }
        };
    
        // Makes sure the game is over after the player hits and the dealer's turn is over
        const finishGame = () => {
            setGameOver(true);
            setGameStarted(false);
            setBetConfirmed(false);
            setBet("");  
            const regames = gamesCount + 1;
            setGamesCount(regames);
    
            if (newDealerPoints > 21 || playerPoints > newDealerPoints) {
                setMessage("Player wins!");
                const reTokens = tokens + parseInt(bet) * 2;
                const rewin = winCount + 1;
                setTokens(reTokens);
                setWinCount(rewin);
                pushBal(reTokens, rewin, lossCount, regames);
            } else if (playerPoints < newDealerPoints) {
                setMessage("Dealer wins.");
                const reloss = lossCount + 1;
                setLossCount(reloss);
                pushBal(tokens, winCount, reloss, regames);
            } else {
                const reTokens = tokens + parseInt(bet);
                setMessage("It's a draw.");
                setTokens(reTokens);
                pushBal(reTokens, winCount, lossCount, regames);
            }
        };
    
        setTimeout(hitDealerCard, 1000); // 1 sec delay to let the animation look good
    };

    // Gets the players info to init states
    function getPlayersBal(user){
        if(user != null && user.username != null){
            const getUser = client.graphql({ query: queries.getUser, variables: { id: user.username }});
            getUser.then((value) => {
                if(!initializedBal){
                    setBalInited(true);
                    setTokens(value.data.getUser.Balance);
                    setGamesCount(value.data.getUser.GamesPlayedBlackjack);
                    setLossCount(value.data.getUser.LossesBlackJack);
                    setWinCount(value.data.getUser.WinsBlackJack);
                }
            })
        }
    }

    // Updates the player's info in the database
    function pushBal(newBal, newWins, newLosses, newGames){
        if(!initializedBal)
            return;
        client.graphql({ query: mutations.updateUser, variables: { input: {
            id: user.username,
            Balance: newBal,
            WinsBlackJack: newWins,
            LossesBlackJack: newLosses,
            GamesPlayedBlackjack: newGames,
        }}});
    }

    /**
     * Handles the change in bet whenever a player types it in
     * @param {object} event The event object containing the input value
     */
    const handleBetChange = (event) => {
        const betValue = event.target.value;
        if (/^\d*$/.test(betValue)) {  
            setBet(betValue);
        }
    };
    
    // Makes sure the bet amount is valid, and confirms it
    const confirmBet = () => {
        if (bet > 0 && bet <= tokens) {
            setBetConfirmed(true);
            setMessage("");
        } else {
            setMessage("Invalid bet: You can't bet 0 or you're out of tokens!");
        }
    };

    return (
        <>
        <div className={styles.blackjack}>
            <h1 className={styles.title}>Blackjack Game</h1>
            <div className={styles.tokens}>Tokens: {tokens}</div>
            
            {/*Area of the page where the user can select their bet amount*/}
            <input
                className={styles.input}
                type="text"
                placeholder="Enter bet amount"
                value={bet}
                onChange={handleBetChange}
                disabled={betConfirmed || gameStarted}
            />
            {/*Button that locks in your bet*/}
            <button 
                className={styles.button} 
                onClick={confirmBet} 
                disabled={betConfirmed || !bet || parseInt(bet) <= 0 || parseInt(bet) > tokens || gameStarted}
            >
                Confirm Bet
            </button>
            {/*Button to press to start the game*/}
            <button 
                className={styles.button} 
                onClick={startNewGame} 
                disabled={tokens < parseInt(bet) || !betConfirmed || gameStarted}
            >
                New Game
            </button>
            {/*Playing/ display area for the cards*/}
            <div className={styles.section}>
                <div>Player Points: {playerPoints}</div>
                <div>{playerCards.map(cardCode => (
                    <img src={cardValues[cardCode].img} alt={cardCode} key={cardCode} className={styles.cardImage} />
                ))}</div>
            </div>
            <div className={styles.section}>
                <div>Dealer Points: {dealerPoints}</div>
                <div>{dealerCards.map(cardCode => (
                    <img src={cardValues[cardCode].img} alt={cardCode} key={cardCode} className={styles.cardImage} />
                ))}</div>
            </div>
            {/*Button that the player uses to hit*/}
            <button 
                className={styles.button} 
                onClick={playerHits} 
                disabled={!gameStarted || playerPoints >= 21 || tokens < 0 || gameOver}
            >
                Hit
            </button>
            {/*Button that the player used to stand*/}
            <button 
                className={styles.button} 
                onClick={playerStands} 
                disabled={!gameStarted || gameOver}
            >
                Stand
            </button>
            {/*Message that displays the outcome of the game*/}
            {message && <div className={styles.message}>{message}</div>}
        </div>
        </>
    );
};

export {Blackjack};