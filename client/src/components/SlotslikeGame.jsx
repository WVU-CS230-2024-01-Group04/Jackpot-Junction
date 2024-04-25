import React, { useState } from "react";
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { useAuthenticator } from '@aws-amplify/ui-react';
import "./slots.css";

const SlotslikeGame = ({
    cols = 7, rows = 1,
    reel = [  0,    1,     2,    3,     4,    5,     6,    7,     8,    9,    10,   11],
    symbols = ["🍌", "🍎", "🍒", "🎰", "🍏", "🍊", "🍋", "🍉", "🍇", "🍓", "🍍", "💰"],
    scoring = (state) =>
    {
        let score = 0;
        //           🍌,🍎, 🍒,  🎰, 🍏,🍊,🍋,🍉,🍇,🍓,🍍,💰
        let worth = [50, 10, 100, 500, 10, 25, 0, 0, 0, 25,  50, 200];
        let bonus = [ 0,  0,   0,   0,  0,  0, 0, 0, 0, 75, 100,   0];
        for(let s = 0; s < symbols.length; s++){
            if(SlotsScoring.broken_threes(state,s)){
                score += worth[s] * 2 + bonus[s];
            } else if(SlotsScoring.lineup_sp(state, 7, s)){
                score += worth[s] * 5 + bonus[s];
            } else if(SlotsScoring.lineup_sp(state, 6, s)){
                score += worth[s] * 4 + bonus[s];
            } else if(SlotsScoring.lineup_sp(state, 5, s)){
                score += worth[s] * 3 + bonus[s];
            } else if(SlotsScoring.lineup_sp(state, 4, s)){
                score += worth[s] * 2 + bonus[s];
            } else if(SlotsScoring.lineup_sp(state, 3, s)){
                score += worth[s] + bonus[s];
            }
        }
        return score;
    },
    costToPlay = 5,
    revealPeriod = 250
}) =>
{
    //default parameters
    /*let cols = 7; let rows = 1;
        let reel =    [  0,    1,     2,    3,     4,    5,     6,    7,     8,    9,    10,   11];
        let symbols = ["🍌", "🍎", "🍒", "🎰", "🍏", "🍊", "🍋", "🍉", "🍇", "🍓", "🍍", "💰"];
        let scoring = (state) =>
        {
            let score = 0;
            //           🍌,🍎, 🍒,  🎰, 🍏,🍊,🍋,🍉,🍇,🍓,🍍,💰
            let worth = [50, 10, 100, 500, 10, 25, 0, 0, 0, 25,  50, 200];
            let bonus = [ 0,  0,   0,   0,  0,  0, 0, 0, 0, 75, 100,   0];
            for(let s = 0; s < symbols.length; s++){
                if(SlotsScoring.broken_threes(state,s)){
                    score += worth[s] * 2 + bonus[s];
                } else if(SlotsScoring.lineup_sp(state, 7, s)){
                    score += worth[s] * 5 + bonus[s];
                } else if(SlotsScoring.lineup_sp(state, 6, s)){
                    score += worth[s] * 4 + bonus[s];
                } else if(SlotsScoring.lineup_sp(state, 5, s)){
                    score += worth[s] * 3 + bonus[s];
                } else if(SlotsScoring.lineup_sp(state, 4, s)){
                    score += worth[s] * 2 + bonus[s];
                } else if(SlotsScoring.lineup_sp(state, 3, s)){
                    score += worth[s] + bonus[s];
                }
            }
            return score;
        }
    let costToPlay = 1;
    let revealPeriod = 1000;*/
    

    const [output, setOutput] = useState("🎰");
    const [winnings, setWinnings] = useState(0);
    const [ready, setReady] = useState(true);
    const [slotstate, setslotstate] = useState(Array(cols).fill(0).map(() => Math.floor(Math.random()* reel.length)));

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
        if(gottenID === "undef")
            return;
        client.graphql({ query: mutations.updateUser, variables: { input: {
            id: gottenID,
            Balance: newBal
        }}});
    }

    function compileStateToSymbols(state){
        return state.map((colRot) => {
            let a = [];
            for (let i = 0; i < rows; i++){
                a[i] = reel[(colRot + i) % reel.length];
            }
            return a;
        })
    }
    
    function roll(){
        let localbuildstate = [];
        for(let i = 0; i < cols; i++){
            localbuildstate[i] = Math.floor(Math.random() * reel.length);
        }
        setslotstate(localbuildstate);
        return localbuildstate;
    }
    
    function display(showslots, state=slotstate){
        let str = "";
        for(let row = 0; row < rows; row++){
            for(let col = 0; col < cols; col++){
                str += symbols[
                    (col < showslots) ? reel[(state[col] + row) % reel.length] : Math.floor(Math.random() * symbols.length)
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
                    let score = scoring(compileStateToSymbols(slotstate));
                    setWinnings(n => n + score);
                    pushBal(winnings - costToPlay + score);
                    setReady(true);
                }
            }, (i+1)*revealPeriod);
        }
    
        interval = setInterval(function(event){
            setOutput(display(showslot));
        }, 10)
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
        <div className="slotsgame">
            <div><h1>Slots:</h1></div>
            <button onClick={buttonOnClick} className="slotsbutton">Gamble!</button>
            <div className="slotsoutput"><p>{output}</p></div>
            <div><p>{winnings}</p></div>
        </div>
    )
}
const SlotsScoring = {
    ofakind: (slotstate, n) => {
        let cols = slotstate.length;
        for(let baseslot = 0; baseslot < cols; baseslot++){
            let val = slotstate[baseslot][0];
            let count = 0;
            for(let i = 0; i < cols; i ++){
                if(slotstate[i][0] === val)
                    count++;
            }
            if(count===n) return true;
        }
        return false;
    },
    
    lineup: (slotstate, n) => {
        let cols = slotstate.length;
        for(let start = 0; start < cols - n; start++){
            let val = slotstate[start][0];
            let count = 0;
            for(let i = 0; i < n; i++){
                if(slotstate[start + i][0] === val){
                    count++;
                }
            }
            if(count===n) return true;
        }
        return false;
    },
    lineup_sp: (slotstate, n, symbol)=>{
        let cols = slotstate.length;
        for(let start = 0; start < cols - n; start++){
            let count = 0;
            for(let i = 0; i < n; i++){
                if(slotstate[start + i][0] === symbol){
                    count++;
                }
            }
            if(count === n) return true;
        }
        return false;
    }, 
    broken_threes: (slotstate, symbol) => {
        let v = true;
        for (let i = 0; i < 3; i++)
            v &&= slotstate[0][0] === symbol;
        for (let i = 4; i < 7; i++)
            v &&= slotstate[i][0] === symbol;
        return v;
    },
    
    diagonalDown: (slotstate, n) => {
        let cols = slotstate.length;
        let rows = slotstate[0].length;
        if (n > cols || n > rows)
            return false;
        for(let startrow = 0; startrow < rows-n; startrow++){
            for(let start = 0; start<cols-n; start++){
                let val = slotstate[start][startrow];
                let count = 0;
                for(let i = 0; i < n; i++){
                    if(slotstate[start + i][startrow + i] === val){
                        count++;
                    }
                }
                if(count === n) return true;
            }
        }
        return false;
    },
    diagonalUp: (slotstate, n) => {
        let cols = slotstate.length;
        let rows = slotstate[0].length;
        if (n > cols || n > rows)
            return false;
        for(let startrow = 0; startrow < rows - n; startrow++){
            for(let start = 0; start<cols-n; start++){
                let val = slotstate[start][startrow];
                let count = 0;
                for(let i = 0; i < n; i++){
                    if(slotstate[start + i][startrow] === val){
                        count++;
                    }
                }
                if(count === n) return true;
            }
        }
        return false;
    },
    diagonal: (state, n) =>{
        return SlotsScoring.diagonalDown(state, n) || SlotsScoring.diagonalUp(state, n);
    }
}


export default {SlotslikeGame, SlotsScoring};
export {SlotslikeGame};