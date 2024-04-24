import React from "react";
import SlotslikeGame from "../components/SlotslikeGame";
import { Authenticator } from '@aws-amplify/ui-react';

const slots1 = () =>
{

    return(
        <Authenticator.Provider>
            <SlotslikeGame />
        </Authenticator.Provider>
    )
}

export default slots1