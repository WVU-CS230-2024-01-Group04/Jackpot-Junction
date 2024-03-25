let outputText;
let winningsText;
let winnings = 10;

let slot1state = 0;
let slot2state = 0;
let slot3state = 0;
let symbols = ["🍌", "🍎", "🍒", "🎰"]

let ready = true;

function roll(){
    slot1state = Math.floor(Math.random() * symbols.length);
    slot2state = Math.floor(Math.random() * symbols.length);
    slot3state = Math.floor(Math.random() * symbols.length);
}

function reveal(){
    let show1 = false;
    let show2 = false;
    let show3 = false;

    let interval = setInterval(function(event){
        outputText.innerText = symbols[ show1 ? slot1state : Math.floor(Math.random()*symbols.length)]+" "+
        symbols[show2 ? slot2state : Math.floor(Math.random()*symbols.length)]+" "+
        symbols[show3 ? slot3state : Math.floor(Math.random()*symbols.length)];
    }, 10)

    setTimeout(function(event){
        show1 = true;
    }, 1000);
    setTimeout(function(event){
        show2 = true;
    }, 2000);
    setTimeout(function(event){
        show3 = true;
        clearInterval(interval);
        outputText.innerText = symbols[slot1state]+" "+symbols[slot2state]+" "+symbols[slot3state];
        payout();
        winningsText.innerText = winnings;
        ready = true;
    }, 3000);
}

function payout(){
    if(slot1state == slot2state && slot2state == slot3state){
        winnings += 2*(slot1state+1)
    } else if(slot1state == slot2state || slot2state == slot3state){
        winnings += slot2state+1;
    }
}

document.addEventListener("DOMContentLoaded", function(){
    outputText = document.getElementById("output");
    winningsText = document.getElementById("winnings");

    outputText.innerText = winnings;
    
    document.getElementById("button").addEventListener("click", function(event){
        if(ready){
            if (winnings > 0){
                ready = false;
                winningsText.innerText = --winnings;
                roll();
                reveal();
            } else {
                outputText.innerText = "insufficient funds!";
            }
        } else {
            console.log("not ready");
        }
    })
})