let outputText;
let winningsText;
let winnings = 10;


let slotstate = [];
let slotnum = 7;
let rows = 3;
let symbols = ["🍌", "🍎", "🍒", "🎰", "🍏", "🍊", "🍋", "🍉", "🍇", "🍓", "🍍", "💰"];

let ready = true;

function roll(){
    for(let i = 0; i < slotnum; i++){
        slotstate[i] = Math.floor(Math.random() * symbols.length);
    }
}

function display(showslots){
    let str = "";
    for(let row = 0; row < rows; row++){
        for(let col = 0; col < slotnum; col++){
            str += symbols[
                (col < showslots) ? (slotstate[col] + row) % symbols.length : Math.floor(Math.random() * symbols.length)
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
    for(let i = 0; i < slotnum; i++){
        setTimeout(function(event){
            //when it becomes time to reveal this slot
            showslot++;
            if (i == slotnum - 1){ //this is the last slot?
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

function ofakind(n){
    for(let baseslot = 0; baseslot < slotnum; baseslot++){
        let val = slotstate[baseslot];
        let count = 0;
        for(let i = 0; i < slotnum; i ++){
            if(slotstate[i] == val)
                count++;
        }
        if(count==n) return true;
    }
    return false;
}

function lineup(n){
    for(let start = 0; start < slotnum - n; start++){
        let val = slotstate[start];
        let count = 0;
        for(let i = 0; i < n; i++){
            if(slotstate[start + i] == val){
                count++;
            }
        }
        if(count==n) return true;
    }
    return false;
}
function lineup_sp(n, symbol){
    for(let start = 0; start < slotnum - n; start++){
        let count = 0;
        for(let i = 0; i < n; i++){
            if(slotstate[start + i] == symbol){
                count++;
            }
        }
        if(count == n) return true;
    }
    return false;
}
function broken_threes(symbol){
    let v = true;
    for (i = 0; i < 3; i++)
        v &&= slotstate[0] == symbol;
    for (i = 4; i < 7; i++)
        v &&= slotstate[i] == symbol;
    return v;
}

function diagonalDown(n){
    for(let start = 0; start<slotnum-n; start++){
        let val = slotstate[start];
        for(let i = 0; i < n; i++){
            if(slotstate[start + i] == (val + i) % symbols.length){
                count++;
            }
        }
        if(count == n) return true;
    }
    return false;
}
function diagonalUp(n){
    for(let start = 0; start<slotnum-n; start++){
        let val = slotstate[start];
        for(let i = 0; i < n; i++){
            if(slotstate[start + i] == (val - i) % symbols.length){
                count++;
            }
        }
        if(count == n) return true;
    }
    return false;
}
function diagonal(n){
    return diagonalDown(n) || diagonalUp(n);
}

function payout(){
    //           🍌,🍎, 🍒,  🎰, 🍏,🍊,🍋,🍉,🍇,🍓,🍍,💰
    let worth = [50, 10, 100, 500, 10, 25, 0, 0, 0, 25,  50, 200];
    let bonus = [ 0,  0,   0,   0,  0,  0, 0, 0, 0, 75, 100,   0];
    for(let s = 0; s < symbols.length; s++){
        if(broken_threes(s)){
            winnings += worth[s] * 2 + bonus[s];
        } else if(lineup_sp(7, s)){
            winnings += worth[s] * 5 + bonus[s];
        } else if(lineup_sp(6, s)){
            winnings += worth[s] * 4 + bonus[s];
        } else if(lineup_sp(5, s)){
            winnings += worth[s] * 3 + bonus[s];
        } else if(lineup_sp(4, s)){
            winnings += worth[s] * 2 + bonus[s];
        } else if(lineup_sp(3, s)){
            winnings += worth[s] + bonus[s];
        }
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