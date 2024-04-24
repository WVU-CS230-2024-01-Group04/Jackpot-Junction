import React, { useState } from "react";
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { useAuthenticator } from '@aws-amplify/ui-react';

const SlotslikeGame = () =>
{
    //default parameters
    let cols = 7; let rows = 1;
        let symbols = ["🍌", "🍎", "🍒", "🎰", "🍏", "🍊", "🍋", "🍉", "🍇", "🍓", "🍍", "💰"];
        let scoring = () =>
        {
            let score = 0;
            //           🍌,🍎, 🍒,  🎰, 🍏,🍊,🍋,🍉,🍇,🍓,🍍,💰
            let worth = [50, 10, 100, 500, 10, 25, 0, 0, 0, 25,  50, 200];
            let bonus = [ 0,  0,   0,   0,  0,  0, 0, 0, 0, 75, 100,   0];
            for(let s = 0; s < symbols.length; s++){
                if(broken_threes(s)){
                    score += worth[s] * 2 + bonus[s];
                } else if(lineup_sp(7, s)){
                    score += worth[s] * 5 + bonus[s];
                } else if(lineup_sp(6, s)){
                    score += worth[s] * 4 + bonus[s];
                } else if(lineup_sp(5, s)){
                    score += worth[s] * 3 + bonus[s];
                } else if(lineup_sp(4, s)){
                    score += worth[s] * 2 + bonus[s];
                } else if(lineup_sp(3, s)){
                    score += worth[s] + bonus[s];
                }
            }
            return score;
        }
    let costToPlay = 1;

    

    const [output, setOutput] = useState("");
    const [winnings, setWinnings] = useState(0);
    const [ready, setReady] = useState(true);
    const [slotstate, setslotstate] = useState(Array(cols).fill(0).map(() => Math.floor(Math.random()* symbols.length)));

    const [initializedBal, setBalInited] = useState(false);
    const [gottenID, setID] = useState("undef");

    const {user} = useAuthenticator((context) => [context.user]);
    const client = generateClient();
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
                        setWinnings(u.Balance);
                    }
                }
            });
        })
    }

    function pushBal(newBal){
        console.log(gottenID);
        if(gottenID === "undef")
            return;
        client.graphql({ query: mutations.updateUser, variables: { input: {
            id: gottenID,
            Balance: newBal
        }}});
    }
    
    function roll(){
        let localbuildstate = [];
        for(let i = 0; i < cols; i++){
            localbuildstate[i] = Math.floor(Math.random() * symbols.length);
        }
        setslotstate(localbuildstate);
    }
    
    function display(showslots){
        let str = "";
        for(let row = 0; row < rows; row++){
            for(let col = 0; col < cols; col++){
                str += symbols[
                    (col < showslots) ? (slotstate[col] + row) % symbols.length : Math.floor(Math.random() * symbols.length)
                ];
                if(col !== cols-1)
                    str += " ";
            }
            if(row !== rows-1)
                str += "\n";
        }
        return str;
    }
    
    function reveal(){
        let showslot = 0;
        let interval;
        for(let i = 0; i < cols; i++){
            setTimeout(function(event){
                //when it becomes time to reveal this slot
                showslot++;
                if (i === cols - 1){ //this is the last slot?
                    clearInterval(interval);
                    setOutput(display(cols));
                    let score = scoring()
                    setWinnings(n => n + score);
                    pushBal(winnings - costToPlay + score);
                    setReady(true);
                }
            }, (i+1)*1000);
        }
    
        interval = setInterval(function(event){
            setOutput(display(showslot));
        }, 10)
    }
    
    function ofakind(n){
        for(let baseslot = 0; baseslot < cols; baseslot++){
            let val = slotstate[baseslot];
            let count = 0;
            for(let i = 0; i < cols; i ++){
                if(slotstate[i] === val)
                    count++;
            }
            if(count===n) return true;
        }
        return false;
    }
    
    function lineup(n){
        for(let start = 0; start < cols - n; start++){
            let val = slotstate[start];
            let count = 0;
            for(let i = 0; i < n; i++){
                if(slotstate[start + i] === val){
                    count++;
                }
            }
            if(count===n) return true;
        }
        return false;
    }
    function lineup_sp(n, symbol){
        for(let start = 0; start < cols - n; start++){
            let count = 0;
            for(let i = 0; i < n; i++){
                if(slotstate[start + i] === symbol){
                    count++;
                }
            }
            if(count === n) return true;
        }
        return false;
    }
    function broken_threes(symbol){
        let v = true;
        for (let i = 0; i < 3; i++)
            v &&= slotstate[0] === symbol;
        for (let i = 4; i < 7; i++)
            v &&= slotstate[i] === symbol;
        return v;
    }
    
    function diagonalDown(n){
        for(let start = 0; start<cols-n; start++){
            let val = slotstate[start];
            let count = 0;
            for(let i = 0; i < n; i++){
                if(slotstate[start + i] === (val + i) % symbols.length){
                    count++;
                }
            }
            if(count === n) return true;
        }
        return false;
    }
    function diagonalUp(n){
        for(let start = 0; start<cols-n; start++){
            let val = slotstate[start];
            let count = 0;
            for(let i = 0; i < n; i++){
                if(slotstate[start + i] === (val - i) % symbols.length){
                    count++;
                }
            }
            if(count === n) return true;
        }
        return false;
    }
    function diagonal(n){
        return diagonalDown(n) || diagonalUp(n);
    }

    function buttonOnClick(){
        if(ready){
            if (winnings > 0){
                setReady(false);
                setWinnings(n => (n - costToPlay));
                if (false) pushBal();
                roll();
                reveal();
            } else {
                setOutput("insufficient funds!");
            }
        }
    }
    return(
        <div>
            <div><h1>Slots:</h1></div>
            <button onClick={buttonOnClick}>Gamble!</button>
            <div><p>{output}</p></div>
            <div><p>{winnings}</p></div>
        </div>
    )
}

export default SlotslikeGame;