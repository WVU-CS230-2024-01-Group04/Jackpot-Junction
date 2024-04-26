import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import StatsPage from './UserPage'

const UserPageAuthenticator = () =>
{
    return(
        <Authenticator.Provider>
            <StatsPage />
        </Authenticator.Provider>
    )
}

export default UserPageAuthenticator;