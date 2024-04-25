import React from "react";
import {SlotslikeGame} from "../components/SlotslikeGame";
import { Authenticator } from '@aws-amplify/ui-react';
import Navbar from "../components/Navbar"

const slots1 = () =>
{

    return(
            <Authenticator.Provider>
                <Navbar currentPage="slots"/>
                <SlotslikeGame />
            </Authenticator.Provider>
    )
}

export default slots1