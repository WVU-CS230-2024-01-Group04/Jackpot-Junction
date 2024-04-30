import React from "react";
import { SlotslikeGame, SlotsScoring} from "../components/SlotslikeGame";
import { Authenticator } from '@aws-amplify/ui-react';
import Navbar from "../components/Navbar"

const slots2 = () =>
{
    let symbols = ["♦", "♣", "♥", "♠"];
    let reel = [1, 2, 3, 1, 2, 0, 1, 3, 0, 2, 3, 0];
    function scoring(state){
        if(SlotsScoring.ofakind(state, 5)){
            return 50;
        } else if(SlotsScoring.ofakind(state, 4)){
            return 25;
        } else if(SlotsScoring.ofakind(state, 3)){
            return 5;
        }
        return 0;
    }
    return(
            <Authenticator.Provider>
                <Navbar currentPage="main"/>
                <SlotslikeGame cols={5} symbols={symbols} reel={reel} costToPlay={25} scoring={scoring}/>
            </Authenticator.Provider>
    )
}

export default slots2;