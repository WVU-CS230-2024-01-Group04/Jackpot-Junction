import React from "react";
import SlotslikeGame from "../components/SlotslikeGame";
import { Authenticator } from '@aws-amplify/ui-react';
import Navbar from "../components/Navbar"

const slots1 = () =>
{

    return(
        <div>
            <Authenticator.Provider>
                <Navbar currentPage="slots"/>
                <SlotslikeGame />
            </Authenticator.Provider>
        </div>
    )
}

export default slots1