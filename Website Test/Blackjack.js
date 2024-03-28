// amount of tokens the player has (temp)
// in the future each player should have their token balance linked to their profile
let playerTokens = 100;
// bet amount (temp)
// in the future will add an option for how much the player wants to bet
const betAmount = 10;

// Simplified deck creation and shuffling
function createAndShuffleDeck() {
    const cards = [2,2,2,2, 3,3,3,3 ,4,4,4,4, 5,
        5,5,5, 6,6,6,6, 7,7,7,7, 8,8,8,8, 9,9,9,9, 10,10,10,10, 11,11,11,11];
    let deck = [];
    for (let i = 0; i < 4; i++) {
        deck = deck.concat(cards);
    }
    // shuffles the cards
    deck.sort(() => Math.random() - 0.5); 
    return deck;
}

// your deck of cards
let deckOfCards = createAndShuffleDeck();

// initial points at the begining of the game
let playerPoints = 0, dealerPoints = 0;

// gets a random card from the deck
function getRandomCard() {
    // reshuffles deck when cards are low
    if (deckOfCards.length < 10) { 
        deckOfCards = createAndShuffleDeck();
    }
    return deckOfCards.pop();
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

// point distribution
// ties dont impact the score, wins multiply your betting amount by 2, losses make you lose your bet amount
function adjustTokens(result) {
    if (result === "win") playerTokens += betAmount * 2;
    else if (result === "lose") playerTokens -= betAmount;
    updateTokensDisplay();
}

// hit and bust function
function playerAction(hit) {
    if (hit) {
        playerPoints += getRandomCard();
        console.log(`Player hits and now has ${playerPoints} points.`);
        updatePointsDisplay();
        if (playerPoints > 21) {
            console.log("Player busts!");
            endPlayerTurn();
        }
    } else {
        console.log("Player stands.");
        endPlayerTurn();
    }
}

// dealer's turn (set so that if the dealer's points are below 17 they hit and if player points are less than theirs their turn ends)
function dealerTurn() {
    document.getElementById('hitButton').disabled = true;
    document.getElementById('standButton').disabled = true;
    while (dealerPoints < 17 && !(playerPoints < dealerPoints)) {
        dealerPoints += getRandomCard();
        console.log(`Dealer hits and now has ${dealerPoints} points.`);
        updatePointsDisplay();
    }
    finalizeGame();
}

// compares scores and says who the winner is
function finalizeGame() {
    if (dealerPoints > 21 || playerPoints > dealerPoints) {
        console.log(playerPoints > 21 ? "Dealer wins." : "Player wins!");
        adjustTokens(playerPoints > 21 ? "lose" : "win");
    } else if (dealerPoints === playerPoints) {
        console.log("It's a draw.");
        adjustTokens("tie");
    } else {
        console.log("Dealer wins.");
        adjustTokens("lose");
    }
}

function endPlayerTurn() {
    dealerTurn();
}

function startGame() {
    // clears the log after each game
    document.getElementById('log').innerHTML = "";

    playerPoints = dealerPoints = 0;
    document.getElementById('hitButton').disabled = false;
    document.getElementById('standButton').disabled = false;
    playerPoints += getRandomCard() + getRandomCard();
    dealerPoints += getRandomCard() + getRandomCard();
    updatePointsDisplay();
}

// buttons ._.
document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('hitButton').addEventListener('click', () => playerAction(true));
document.getElementById('standButton').addEventListener('click', () => playerAction(false));

// displays console logging
(function enhanceConsoleLog() {
    const oldLog = console.log;
    console.log = function (message) {
        oldLog.apply(console, arguments);
        const logElem = document.getElementById('log');
        if (logElem) {
            logElem.innerHTML += message + '<br>';
            logElem.scrollTop = logElem.scrollHeight;
        }
    };
})();