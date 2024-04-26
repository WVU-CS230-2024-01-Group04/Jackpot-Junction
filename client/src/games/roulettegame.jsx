import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import Roulette from '../components/roulette';

const RouletteGame = () =>
{
    return(
        <Authenticator.Provider>
            <Roulette />
        </Authenticator.Provider>
    )
}

export default RouletteGame;