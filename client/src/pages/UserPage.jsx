import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import kermitImage from "../images/kermit.webp";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthenticator, AccountSettings } from '@aws-amplify/ui-react';
import { DeleteUser } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import Popup from '../components/popup'


import * as mutations from '../graphql/mutations';


import { deleteUser } from '../graphql/mutations';



const StatsPage = ({setAgreedToTerms}) => {
    const navigate = useNavigate();

   
    //fake data until database is up 
    const slotsStats = {
        gamesPlayed: 20,
        wins: 15,
        losses: 5,
        totalBetAmount: 1000,
        totalWinnings: 1500,
        highestWin: 500,
        averagePayout: 1.5
    };

    const blackjackStats = {
        gamesPlayed: 50,
        wins: 30,
        losses: 20,
        totalBetAmount: 2000,
        totalWinnings: 2500,
        totalPushes: 10,
        totalBusts: 5,
        winningStreaks: 7,
        losingStreaks: 4,
        averageWinRate: 60
    };

    //user data stuff
    const [initializedBal, setBalInited] = useState(false);
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const client = generateClient();
    const [money, setMoney] = useState(0);
    const [username, setUsername] = useState("");
    const [gottenID, setID] = useState("undef");

    // (Oskar Engen) function to get players balance
    getPlayersBal();
    function getPlayersBal(){
        const users = client.graphql({ query: queries.listUsers });
        users.then((value) => {
            console.log(value.data.listUsers.items);
            if(user != null && user.username != null)
            value.data.listUsers.items.forEach((u) => {
                if(u.Username === user.username){
                    if(!initializedBal){
                        setBalInited(true);
                        setMoney(u.Balance);
                        setID(u.id);
                        setUsername(u.Username);
                    }
                }
            });
        })
    }

    // (Oskar Engen) function to push an updated balance to the user
    function pushBal(newBal){
        if(gottenID === "undef")
            return;
        client.graphql({ query: mutations.updateUser, variables: { input: {
            id: gottenID,
            Balance: newBal
        }}});
    }

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => 
    {
        setIsPopupOpen(true);
        console.log("guggua");
    }

    const closePopup = () => 
    {
      setIsPopupOpen(false);
    }

    const submitPopup = () =>
    {
        setMoney(money + 1000);
        pushBal(money + 1000);
        setIsPopupOpen(false);
    }

    //handle success for password change
    const handleSuccess = () => {
        alert('password is successfully changed!')
      }

    

      //delete user also in database as well
      const handleDeleteSuccess = async () => {
        
       await client.graphql({
            query: deleteUser,
            variables: {
                input: {
                    id: user.username
                }
            }
            
            
        });
        alert('Account successfully deleted!');
        signOut();
        navigate("/");
      }; 

      const handleSignOut = async () => {
        await signOut();
        setAgreedToTerms
        navigate("/");
    }; 
    
      
      
      

    return (
    <div>

    <Navbar currentPage="userpage" />
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <img src={kermitImage} alt="Profile" className="img-fluid rounded-circle mb-3" style={{ width: '150px' }} />
                            <h4>Username: {username}</h4>
                            <h4>Balance: {money}</h4>
                            <button className="btn btn-primary" onClick={openPopup}>Get More Tokens</button>
                            <button className="btn btn-primary">Edit Profile</button>
                            <button onClick={handleSignOut}>Sign out</button>
                            <AccountSettings.DeleteUser onSuccess={handleDeleteSuccess} />


                        </div>
                        <AccountSettings.ChangePassword onSuccess={handleSuccess}/>


                    </div>
                </div>
                <div className="col-md-8">
                    <h1>Stats</h1>

                    <div className="card mb-3">
                        <div className="card-body">
                            <h3>Slots</h3>
                            <p>Games Played: {slotsStats.gamesPlayed}</p>
                            <p>Wins: {slotsStats.wins}</p>
                            <p>Losses: {slotsStats.losses}</p>
                            <p>Total Bet Amount: ${slotsStats.totalBetAmount}</p>
                            <p>Total Winnings: ${slotsStats.totalWinnings}</p>
                            <p>Highest Win: ${slotsStats.highestWin}</p>
                            <p>Average Payout: {slotsStats.averagePayout}</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h3>Blackjack</h3>
                            <p>Games Played: {blackjackStats.gamesPlayed}</p>
                            <p>Wins: {blackjackStats.wins}</p>
                            <p>Losses: {blackjackStats.losses}</p>
                            <p>Total Bet Amount: ${blackjackStats.totalBetAmount}</p>
                            <p>Total Winnings: ${blackjackStats.totalWinnings}</p>
                            <p>Total Pushes: {blackjackStats.totalPushes}</p>
                            <p>Total Busts: {blackjackStats.totalBusts}</p>
                            <p>Winning Streaks: {blackjackStats.winningStreaks}</p>
                            <p>Losing Streaks: {blackjackStats.losingStreaks}</p>
                            <p>Average Win Rate: {blackjackStats.averageWinRate}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Popup isOpen={isPopupOpen} onClose={closePopup} onSubmit={submitPopup}/>
    </div>
    );
};

export default StatsPage;
