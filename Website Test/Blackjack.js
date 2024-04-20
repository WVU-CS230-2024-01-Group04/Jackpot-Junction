// amount of tokens the player has (temp)
// in the future each player should have their token balance linked to their profile
let playerTokens = 100;

const cardImages = {
    '2C': { img: 'blackjack cards/2_of_clubs.png', value: 2 },
    '2D': { img: 'blackjack cards/2_of_diamonds.png', value: 2 },
    '2H': { img: 'blackjack cards/2_of_hearts.png', value: 2 },
    '2S': { img: 'blackjack cards/2_of_spades.png', value: 2 },
    '3C': { img: 'blackjack cards/3_of_clubs.png', value: 3 },
    '3D': { img: 'blackjack cards/3_of_diamonds.png', value: 3 },
    '3H': { img: 'blackjack cards/3_of_hearts.png', value: 3 },
    '3S': { img: 'blackjack cards/3_of_spades.png', value: 3 },
    '4C': { img: 'blackjack cards/4_of_clubs.png', value: 4 },
    '4D': { img: 'blackjack cards/4_of_diamonds.png', value: 4 },
    '4H': { img: 'blackjack cards/4_of_hearts.png', value: 4 },
    '4S': { img: 'blackjack cards/4_of_spades.png', value: 4 },
    '5C': { img: 'blackjack cards/5_of_clubs.png', value: 5 },
    '5D': { img: 'blackjack cards/5_of_diamonds.png', value: 5 },
    '5H': { img: 'blackjack cards/5_of_hearts.png', value: 5 },
    '5S': { img: 'blackjack cards/5_of_spades.png', value: 5 },
    '6C': { img: 'blackjack cards/6_of_clubs.png', value: 6 },
    '6D': { img: 'blackjack cards/6_of_diamonds.png', value: 6 },
    '6H': { img: 'blackjack cards/6_of_hearts.png', value: 6 },
    '6S': { img: 'blackjack cards/6_of_spades.png', value: 6 },
    '7C': { img: 'blackjack cards/7_of_clubs.png', value: 7 },
    '7D': { img: 'blackjack cards/7_of_diamonds.png', value: 7 },
    '7H': { img: 'blackjack cards/7_of_hearts.png', value: 7 },
    '7S': { img: 'blackjack cards/7_of_spades.png', value: 7 },
    '8C': { img: 'blackjack cards/8_of_clubs.png', value: 8 },
    '8D': { img: 'blackjack cards/8_of_diamonds.png', value: 8 },
    '8H': { img: 'blackjack cards/8_of_hearts.png', value: 8 },
    '8S': { img: 'blackjack cards/8_of_spades.png', value: 8 },
    '9C': { img: 'blackjack cards/9_of_clubs.png', value: 9 },
    '9D': { img: 'blackjack cards/9_of_diamonds.png', value: 9 },
    '9H': { img: 'blackjack cards/9_of_hearts.png', value: 9 },
    '9S': { img: 'blackjack cards/9_of_spades.png', value: 9 },
    '10C': { img: 'blackjack cards/10_of_clubs.png', value: 10 },
    '10D': { img: 'blackjack cards/10_of_diamonds.png', value: 10 },
    '10H': { img: 'blackjack cards/10_of_hearts.png', value: 10 },
    '10S': { img: 'blackjack cards/10_of_spades.png', value: 10 },
    'JC': { img: 'blackjack cards/jack_of_clubs2.png', value: 10 },
    'JD': { img: 'blackjack cards/jack_of_diamonds2.png', value: 10 },
    'JH': { img: 'blackjack cards/jack_of_hearts2.png', value: 10 },
    'JS': { img: 'blackjack cards/jack_of_spades2.png', value: 10 },
    'QC': { img: 'blackjack cards/queen_of_clubs2.png', value: 10 },
    'QD': { img: 'blackjack cards/queen_of_diamonds2.png', value: 10 },
    'QH': { img: 'blackjack cards/queen_of_hearts2.png', value: 10 },
    'QS': { img: 'blackjack cards/queen_of_spades2.png', value: 10 },
    'KC': { img: 'blackjack cards/king_of_clubs2.png', value: 10 },
    'KD': { img: 'blackjack cards/king_of_diamonds2.png', value: 10 },
    'KH': { img: 'blackjack cards/king_of_hearts2.png', value: 10 },
    'KS': { img: 'blackjack cards/king_of_spades2.png', value: 10 },
    'AC': { img: 'blackjack cards/ace_of_clubs.png', value: 11 },
    'AD': { img: 'blackjack cards/ace_of_diamonds.png', value: 11 },
    'AH': { img: 'blackjack cards/ace_of_hearts.png', value: 11 },
    'AS': { img: 'blackjack cards/ace_of_spades.png', value: 11 }
};

// deck creation and shuffling
function createAndShuffleDeck() {
    const cards = ['2C','2D','2H','2S', '3C','3D','3H','3S', '4C','4D','4H','4S', '5C','5D','5H','5S', '6C','6D','6H','6S', '7C','7D','7H','7S', '8C','8D','8H','8S', '9C','9D','9H','9S', '10C','10D','10H','10S', 'JC','JD','JH','JS', 'QC','QD','QH','QS', 'KC','KD','KH','KS', 'AC','AD','AH','AS'];
    let deck = [...cards];
    deck.sort(() => Math.random() - 0.5);
    return deck;
}

// your deck of cards 
let deckOfCards = createAndShuffleDeck();

// arrays to keep track of both dealer and player hands
let playerHand = [], dealerHand = [];

// initial points at the begining of the game
let playerPoints = 0, dealerPoints = 0;

// gets a random card from the deck
function getRandomCard() {
    if (deckOfCards.length < 10) {
        deckOfCards = createAndShuffleDeck();
    }
    return deckOfCards.pop();
}

// sets the ace value
function setAceValue(value) {
    for (let i = playerHand.length - 1; i >= 0; i--) {
        if (playerHand[i] === 11) { 
            if (value === 1) {
                playerHand[i] = 1; 
            }
            break;
        }
    }
    updatePlayerPoints(); 

    console.log(`Player chooses Ace as ${value}, now has ${playerPoints} points.`);
    document.getElementById('hitButton').disabled = false;
    document.getElementById('standButton').disabled = false;
    document.getElementById('aceOneButton').style.display = 'none';
    document.getElementById('aceElevenButton').style.display = 'none';
    updatePointsDisplay();
    checkPlayerOutcome();
}

// updates your points after a turn
function updatePointsDisplay() {
    document.getElementById('playerPoints').innerText = `Player points: ${playerPoints}`;
    document.getElementById('dealerPoints').innerText = `Dealer points: ${dealerPoints}`;
}

// updates your token display after a game
function updateTokensDisplay() {
    document.getElementById('playerTokens').innerText = `Player tokens: ${playerTokens}`;
    console.log(`Player tokens after the game: ${playerTokens}`);
}
// lets the user know what cards they recieved
function dealCardToPlayer() {
    let card = getRandomCard();
    playerHand.push(card);
    if (card === 0) {
        console.log(`Player draws an Ace.`);
        document.getElementById('hitButton').disabled = true;
        document.getElementById('standButton').disabled = true;
        document.getElementById('aceOneButton').style.display = 'inline';
        document.getElementById('aceElevenButton').style.display = 'inline';
    } else {
        updatePlayerPoints(); 
        displayCard('Player', card);
        checkPlayerOutcome();
    }
}
// lets the user know what card number the dealer has
function dealCardToDealer() {
    let card = getRandomCard();
    dealerHand.push(card);
    updateDealerPoints(); 
    displayCard('Dealer', card);
}
// updates the players points according to their hand
function updatePlayerPoints() {
    playerPoints = calculatePoints(playerHand);
    updatePointsDisplay();
}
// updates the dealer's points according to their hand
function updateDealerPoints() {
    dealerPoints = calculatePoints(dealerHand);
    updatePointsDisplay();
}

// calculates points including aces
function calculatePoints(hand) {
    let sum = 0;
    let aces = 0;
    for (let cardCode of hand) {
        let cardValue = cardImages[cardCode].value;
        if (cardValue === 11) { 
            aces += 1;
        } else {
            sum += cardValue;
        }
    }
    for (let i = 0; i < aces; i++) {
        if (sum + 11 > 21) {
            sum += 1; 
        } else {
            sum += 11;
        }
    }
    return sum;
}


// point distribution
// ties dont impact the score, wins get your betamount back, losses make you lose your bet amount
function adjustTokens(result) {
    if (result === "win") playerTokens += betAmount;
    else if (result === "lose") playerTokens -= betAmount;
    updateTokensDisplay();
}

// hit function
function playerAction(hit) {
    if (hit) {
        dealCardToPlayer(); 
    } else {
        console.log("Player stands.");
        dealerTurn();
    }
}

// checks the outcome of the game
function checkPlayerOutcome() {
    if (playerPoints > 21) {
        console.log("Player busts! Dealer wins.");
        adjustTokens("lose");
        endGame();
    } else if (playerPoints === 21) {
        console.log("Player hits 21! Player wins.");
        adjustTokens("win");
        endGame();
    }
}

// dealer's turn 
function dealerTurn() {
    document.getElementById('hitButton').disabled = true;
    document.getElementById('standButton').disabled = true;

    dealCardToDealer();

    while (dealerPoints < 17) {
        dealCardToDealer(); 
        if (dealerPoints > 21) {
            console.log("Dealer busts! Player wins.");
            adjustTokens("win");
            endGame();
            return;
        }
    }
    finalizeGame();
}

// compares scores and says who the winner is
function finalizeGame() {
    if (playerPoints > dealerPoints || dealerPoints > 21) {
        console.log(dealerPoints > 21 ? "Dealer busts! Player wins!" : "Player wins!");
        adjustTokens("win");
    } else if (dealerPoints === playerPoints) {
        console.log("It's a draw.");
    } else {
        console.log("Dealer wins.");
        adjustTokens("lose");
    }
    endGame();
}

// ends the turn
function endPlayerTurn() {
    dealerTurn();
}

// starts the game 
function startGame() {
    if (betAmount > 0) {
        document.getElementById('log').innerHTML = "";
        playerPoints = dealerPoints = 0;
        document.getElementById('hitButton').disabled = false;
        document.getElementById('standButton').disabled = false;

        // clears card display
        document.getElementById('playerCards').innerHTML = "";
        document.getElementById('dealerCards').innerHTML = "";
        
        playerHand = [], dealerHand = [];
        dealCardToPlayer();
        dealCardToPlayer();
        dealCardToDealer();
        updatePointsDisplay();
    } else {
        alert("Please enter and confirm your bet to start the game.");
    }
}

// ends the game automatically when someone busts
function endGame() {
    document.getElementById('hitButton').disabled = true;
    document.getElementById('standButton').disabled = true;
    document.getElementById('betAmount').disabled = false;
    document.getElementById('confirmBet').disabled = false;
    document.getElementById('startGame').disabled = true;
}

// displays each recieved card
function displayCard(participant, cardCode) {
    const cardDetails = cardImages[cardCode]; // use cardCode to fetch card details
    const cardImage = `<img src="${cardDetails.img}" alt="${cardCode}" />`; // self-closing tag
    document.getElementById(`${participant.toLowerCase()}Cards`).innerHTML += cardImage;
}

// listeners for buttons ._.
document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('hitButton').addEventListener('click', () => playerAction(true));
document.getElementById('standButton').addEventListener('click', () => playerAction(false));
document.getElementById('aceOneButton').addEventListener('click', () => setAceValue(1));
document.getElementById('aceElevenButton').addEventListener('click', () => setAceValue(11));

document.getElementById('confirmBet').addEventListener('click', function() {
    betAmount = parseInt(document.getElementById('betAmount').value);
    // ensures the bet amount isn't too much
    if (betAmount > playerTokens) {
        alert("You cannot bet more tokens than you have.");
        return;
    }
    if (betAmount <= 0) {
        alert("Bet amount must be greater than 0.");
        return;
    }
    document.getElementById('betAmount').disabled = true;
    this.disabled = true;
    document.getElementById('startGame').disabled = false;
});

// displays console logging
(function enhanceConsoleLog() {
    const oldLog = console.log;
    console.log = function (message) {
        oldLog.apply(console, arguments);
        const logElem = document.getElementById('log');
        if (logElem) {
            logElem.innerHTML += `<span class="log-message">${message}</span><br>`;
            logElem.scrollTop = logElem.scrollHeight;
        }
    };
})();