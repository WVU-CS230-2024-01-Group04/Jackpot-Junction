let outputText;
let winningsText;
let winnings = 10;


let slotstate = [];
let slotnum = 7;
let rows = 5;
let symbols = ["🍌", "🍎", "🍒", "🎰", "🍏", "🍊", "🍋", "🍉", "🍇", "🍓", "🍍", "💰"];

let ready = true;

function roll(){
    for(let i = 0; i<slotnum;i++){
        slotstate[i] = Math.floor(Math.random() * symbols.length);
    }
}

function display(showslots){
    let str = "";
    for(let row = 0; row<rows; row++){
        for(let col = 0; col<slotnum; col++){
            str += symbols[
                (col < showslots) ? (slotstate[col]+row)%symbols.length : Math.floor(Math.random()*symbols.length)
            ];
            if(col != slotnum-1)
                str += " ";
        }
        if(row != rows-1)
            str += "\n";
    }
    return str;
}

function reveal(){
    let showslot = 0;
    let interval;
    for(let i = 0; i<slotnum;i++){
        setTimeout(function(event){
            //when it becomes time to reveal this slot
            showslot++;
            if (i == slotnum-1){ //this is the last slot?
                clearInterval(interval);
                outputText.innerText = display(slotnum);
                payout();
                winningsText.innerText = winnings;
                ready = true;
            }
        }, (i+1)*1000);
    }

    interval = setInterval(function(event){
        outputText.innerText = display(showslot);
    }, 10)
}

function royalflush(){
    /*return slotstate.includes(symbols.length-1) &&
    slotstate.includes(symbols.length-2) &&
    slotstate.includes(symbols.length-3) &&
    slotstate.includes(symbols.length-4) &&
    slotstate.includes(symbols.length-5);*/
}

function ofakind(n){
    for(let baseslot = 0; baseslot<slotnum; baseslot++){
        let val = slotstate[baseslot];
        let count = 0;
        for(let i = 0; i<slotnum; i++){
            if(slotstate[i] == val)
                count++;
        }
        if(count==n) return true;
    }
    return false;
}

function lineup(n){
    for(let start = 0; start<slotnum-n; start++){
        let val = slotstate[start];
        let count = 0;
        for(let i = 0;i<n;i++){
            if(slotstate[start+i] == val){
                count++;
            }
        }
        if(count==n) return true;
    }
    return false;
}

function payout(){
    if(lineup(5)){
        winnings += 100 + slotstate[0];
    } else if(lineup(4)){
        winnings += 50 + slotstate[2];
    } else if(ofakind(4)){
        winnings += 40;
    } else if(lineup(3)){
        winnings += 25 + slotstate[2];
    } else if(ofakind(3)){
        winnings += 20;
    } else if(ofakind(2)){
        winnings += 10;
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