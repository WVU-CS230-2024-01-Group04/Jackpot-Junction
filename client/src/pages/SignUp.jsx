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
            <Authenticator>
                {({ user }) => (
                    <React.Fragment>
                        {!user && !agreedToTerms && (
                            <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
                                <div className="container mt-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-6 text-center mb-4">
                                            <img src={require("../images/vegas.png")} className="img-fluid icon" style={{ width: '900px', height: 'auto' }} alt="Icon" />
                                        </div>
                                        <div className="col-md-6" style={{ backgroundColor: '#f4f4f4', padding: '30px', borderRadius: '20px' }}> 
                                            <form onSubmit={handleAgreeToTerms}>
                                                <h1>Terms of Service</h1>
                                                <p>Please read and agree to the terms of service before signing up.</p>
                                                <ul style={{ listStyle: 'inside', paddingLeft: '20px' }}>
                                                    <li>Rule 1</li>
                                                    <li>Rule 2</li>
                                                    <li>Rule 3</li>
                                                </ul>
                                                <label>
                                                    <input type="checkbox" required /> I agree to the terms of service
                                                </label>
                                                <div></div>
                                                <button type="submit" className="btn btn-primary">Agree and Continue</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {user && (
                            <MainPage user={user} /> 
                        )}
                        {user && handleSignIn()}
                    </React.Fragment>
                )}
            </Authenticator>
        </div>
    );
}

export default SignUp;
