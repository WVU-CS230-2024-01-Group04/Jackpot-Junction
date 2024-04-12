// amount of tokens the player has (temp)
// in the future each player should have their token balance linked to their profile
let playerTokens = 100;

// deck creation and shuffling
function createAndShuffleDeck() {
    const cards = [2,2,2,2, 3,3,3,3, 4,4,4,4, 5,5,5,5, 6,6,6,6, 7,7,7,7, 8,8,8,8, 9,9,9,9, 10,10,10,10, 0,0,0,0];
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
    for (let card of hand) {
        if (card === 0) { 
            aces += 1;
        } else {
            sum += card;
        }
    }
    for (let i = 0; i < aces; i++) {
        if (sum + 11 <= 21) {
            sum += 11;
        } else {
            sum += 1;
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
    document.getElementById('log').innerHTML = "";

    playerPoints = dealerPoints = 0;
    document.getElementById('hitButton').disabled = false;
    document.getElementById('standButton').disabled = false;
    playerHand = [], dealerHand = [];
    // deals cards one by one
    dealCardToPlayer();
    dealCardToPlayer();
    dealCardToDealer();
    updatePointsDisplay(); 
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
function displayCard(participant, card) {
    console.log(`${participant} received card: ${card}`);
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