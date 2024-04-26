import React from "react";
import Navbar from "../components/Navbar";
import logo from "../images/Jackpot_Junction_Logo.png";
import GameCard from "../components/GameCard";
import { Link } from "react-router-dom";
import { Authenticator } from '@aws-amplify/ui-react';

const MainPage = () => {
    
    return (
        <div>
            <Navbar currentPage="main" />
            <Authenticator>
                {({ user }) => (
                    <div>
                        <img src={logo} alt="logo" width="800" height="500" />
                        <div>
                            <h1>Welcome to Jackpot Junction, {user.username}!</h1>
                        </div>
                        <div className="mainpage">
                            <h2>Favorites</h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '25px' }}>
                                <GameCard image="..." link="..." title="Game #1" description="The player's top most played game" />
                                <GameCard image="..." link="..." title="Game #2" description="The player's 2nd most played game" />
                                <GameCard image="..." link="..." title="Game #3" description="The player's 3rd most played game" />
                                <GameCard image="..." link="..." title="Game #4" description="The player's 4th most played game" />
                                <Link to="/user">See More...</Link>
                            </div>
                        </div>
                        <div className="mainpage">
                            <h2>Quick Stats</h2>
                            <div>
                                <p>User Stats</p>
                                
                            </div>
                            <div className="social">
                                { /* get info from social page, basically a quick guide to friends, make it scroll down */}
                            </div>
                            <div className="bet_info">
                                { /* list of bets, get info from games */}
                            </div>
                        </div>
                    </div>
                )}
            </Authenticator>
        </div>
    );
};

export default MainPage;
