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
            //           🍌,🍎, 🍒,  🎰, 🍏,🍊,🍋,🍉,🍇,🍓,🍍,💰
            let worth = [50, 10, 100, 500, 10, 25, 0, 0, 0, 25,  50, 200];
            let bonus = [ 0,  0,   0,   0,  0,  0, 0, 0, 0, 75, 100,   0];
            for(let s = 0; s < symbols.length; s++){
                if(broken_threes(s)){
                    setWinnings(winnings + worth[s] * 2 + bonus[s]);
                } else if(lineup_sp(7, s)){
                    setWinnings(winnings + worth[s] * 5 + bonus[s]);
                } else if(lineup_sp(6, s)){
                    setWinnings(winnings + worth[s] * 4 + bonus[s]);
                } else if(lineup_sp(5, s)){
                    setWinnings(winnings + worth[s] * 3 + bonus[s]);
                } else if(lineup_sp(4, s)){
                    setWinnings(winnings + worth[s] * 2 + bonus[s]);
                } else if(lineup_sp(3, s)){
                    setWinnings(winnings + worth[s] + bonus[s]);
                }
            }
        }


    

    const [output, setOutput] = useState("");
    const [winnings, setWinnings] = useState(10);
    const [ready, setReady] = useState(true);
    const [slotstate, setslotstate] = useState(Array(cols).fill(0).map(() => Math.floor(Math.random()* symbols.length)));

    const {user, signOut} = useAuthenticator((context) => [context.user]);
    const client = generateClient();
    const users = client.graphql({ query: queries.listUsers });
    users.then((value) => {
        //console.log(users);
        //console.log(value);
        //console.log(value.data.listUsers);
        console.log(value.data.listUsers.items);
        //console.log(value.data.listUsers.items[0]);
        console.log(user);
        if(user != null && user.username != null)
        value.data.listUsers.items.forEach((u) => {
            if(u.Username === user.username){
                console.log(u);
                setWinnings(u.balance);
            }
        });
    })
      
      const createdUser = client.graphql({
        query: mutations.createUser,
        variables: { input: {
            Username: 'dummy'
          } }
      });

    //const updateBal = client.graphql({query: mutations.createUser, variables:{input: {id: "testing", Username: "test_user", Balance: 99999}}})
    
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
                    scoring();
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
                setWinnings(winnings - 1);
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