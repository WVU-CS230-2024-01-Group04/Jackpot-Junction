let outputText;
let winningsText;
let winnings = 10;

/*let slot1state = 0;
let slot2state = 0;
let slot3state = 0;*/
let slotstate = [];
let slotnum = 5;
let symbols = ["🍌", "🍎", "🍒", "🎰", "🍏", "🍊", "🍋", "🍉", "🍇", "🍓", "🍍", "💰"];

let ready = true;

function roll(){
    /*slot1state = Math.floor(Math.random() * symbols.length);
    slot2state = Math.floor(Math.random() * symbols.length);
    slot3state = Math.floor(Math.random() * symbols.length);*/
    for(let i = 0; i<slotnum;i++){
        slotstate[i] = Math.floor(Math.random() * symbols.length);
    }
}

function reveal(){
    /*let show1 = false;
    let show2 = false;
    let show3 = false;*/
    let showslot = [];
    let interval;
    for(let i = 0; i<slotnum;i++){
        showslot[i] = false;
        setTimeout(function(event){
            showslot[i] = true;
            if (i == slotnum-1){
                clearInterval(interval);
                let str = "";
                for(let j = 0; j<slotnum-1; j++){
                    str += symbols[slotstate[j]]+" ";
                }
                str+= symbols[slotstate[slotnum-1]];
                outputText.innerText = str;
                payout();
                winningsText.innerText = winnings;
                ready = true;
            }
        }, (i+1)*1000);
    }

    interval = setInterval(function(event){
        str = "";
        for(let j = 0; j<slotnum-1; j++){
            str+=symbols[showslot[j] ? slotstate[j] : Math.floor(Math.random()*symbols.length)];
            str+=" ";
        }
        str+= symbols[showslot[slotnum-1] ? slotstate[slotnum-1] : Math.floor(Math.random()*symbols.length)];
        outputText.innerText = str;
        /*outputText.innerText = symbols[ show1 ? slot1state : Math.floor(Math.random()*symbols.length)]+" "+
        symbols[show2 ? slot2state : Math.floor(Math.random()*symbols.length)]+" "+
        symbols[show3 ? slot3state : Math.floor(Math.random()*symbols.length)];*/
    }, 10)

    /*setTimeout(function(event){
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
    }, 3000);*/
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