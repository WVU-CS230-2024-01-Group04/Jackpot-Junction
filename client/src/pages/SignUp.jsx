import React from "react"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';




const SignUp = () => {
    return(
        <div>
            <Navbar currentPage="login/signup"/>

            <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
            <Link to="/main">Main</Link>
        </div>
    )
}

export default SignUp;