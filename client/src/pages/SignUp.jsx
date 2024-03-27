import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import SignUpForm from "../components/SignUpForm";


const SignUp = () => {
    return (
        <div>
            <SignUpForm />
         
        </div>
    );
}

export default withAuthenticator(SignUp);