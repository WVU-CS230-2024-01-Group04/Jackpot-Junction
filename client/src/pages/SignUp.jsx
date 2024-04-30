import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import backgroundImage from "../images/backgroundImage.jpg"; 
import MainPage from "./MainPage"; 

const SignUp = () => {
    //hook to navigate to different routes 
    const navigate = useNavigate(); 
    //state to track if user has agreed to terms of services 
    const [agreedToTerms, setAgreedToTerms] = useState(false); 

    //function when user agrees to terms 
    const handleAgreeToTerms = () => {
        setAgreedToTerms(true);
        
    }

    //function to navigate to main page once user has signed up or logged in 
    const handleSignIn = () => {
        navigate("/main"); 
    }

    return (
        <div>
            <Navbar currentPage="login/signup"/>
            {/*Container for background image*/}
            <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '50%' }}>
                    <img src={require("../images/vegas.png")} className="img-fluid icon" style={{ width: '100%', height: 'auto' }} alt="Icon" />
                </div>
                {/*Display terms of services if user has not yet agreed*/}
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
                {/*If user agreed to terms of services, show AWS amplify auth component for signup and login */}
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
