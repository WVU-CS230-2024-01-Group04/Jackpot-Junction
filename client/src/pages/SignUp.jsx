import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import backgroundImage from "../images/backgroundImage.jpg"; 
import MainPage from "./MainPage"; 

const SignUp = () => {
    const navigate = useNavigate();
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleAgreeToTerms = () => {
        setAgreedToTerms(true);
        
    }

    const handleSignIn = () => {
        navigate("/main");
    }

    return (
        <div>
            <Navbar currentPage="login/signup"/>
            <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '50%' }}>
                    <img src={require("../images/vegas.png")} className="img-fluid icon" style={{ width: '100%', height: 'auto' }} alt="Icon" />
                </div>
                {!agreedToTerms && (
                    <div className="col-md-6" style={{ backgroundColor: '#f4f4f4', padding: '30px 40px', borderRadius: '20px', marginRight: '30px' }}> 
                        <form onSubmit={handleAgreeToTerms}>
                            <h1>Terms of Service</h1>
                            <p>Please read and agree to the terms of service before signing up.</p>
                            <ul style={{ listStyle: 'inside', paddingLeft: '20px' , textAlign:'left'}}>
                                <li>Rule 1: Have fun</li>
                                <li>Rule 2: Gamble responsibly</li>
                                <li>If you or someone you know has a gambling problem, call 1-800-GAMBLER for help</li>
                            </ul>
                            <label>
                                <input type="checkbox" required /> I agree to the terms of service
                            </label>
                            <div></div>
                            <button type="submit" className="btn btn-primary">Agree and Continue</button>
                        </form>
                    </div>
                )}
                {agreedToTerms && (
                    <Authenticator style={{ marginLeft: '20px' }}>
                        {({ user }) => (
                            <React.Fragment>
                                {user && (
                                    <MainPage user={user} /> 
                                )}
                                {user && handleSignIn()}
                            </React.Fragment>
                        )}
                    </Authenticator>
                )}
            </div>
        </div>
    );
}

export default SignUp;
