import React from "react";
import {Blackjack} from "../components/blackjackgame";
import { Authenticator } from '@aws-amplify/ui-react';
import Navbar from "../components/Navbar"

const blackJack1 = () =>
{

    return(
            <Authenticator.Provider>
                <Navbar currentPage="main"/>
                <Blackjack />
            </Authenticator.Provider>
    )
}

export default blackJack1 