import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import UserPfp from "../components/userpfp.jsx";
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

    //user data stuff
    const [initializedBal, setBalInited] = useState(false);
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const client = generateClient();
    const [money, setMoney] = useState(0);
    const [username, setUsername] = useState("");
    const [gottenID, setID] = useState("undef");
    const [slotSpins, setSlotSpins] = useState("0");
    const [rouletteSpins, setRouletteSpins] = useState("0");
    const [jackLosses, setJackLosses] = useState("0");
    const [jackWins, setJackWins] = useState("0");
    const [jackGames, setJackGames] = useState("0");


    // (Oskar Engen) function to get players balance
    getPlayersBal();
    function getPlayersBal(){
        const users = client.graphql({ query: queries.listUsers });
        users.then((value) => {
            if(user != null && user.username != null)
            value.data.listUsers.items.forEach((u) => {
                if(u.Username === user.username){
                    if(!initializedBal){
                        setBalInited(true);
                        setMoney(u.Balance);
                        setJackGames(u.GamesPlayedBlackjack);
                        setSlotSpins(u.TotalSpinsSlots);
                        setRouletteSpins(u.TotalSpinsRoullette);
                        setJackLosses(u.LossesBlackJack);
                        setJackWins(u.WinsBlackJack);
                        setID(u.id);
                        setUsername(u.Username);
                    }
                }
            });
        })
    }
    const blackJackWinRate = Math.round((jackWins/jackGames) * 100);
    const jackDraws = jackGames-(jackWins+jackLosses);

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
    Stashed changes
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <UserPfp/>
                            <h4>Username: {username}</h4>
                            <h4>Balance: {money}</h4>
                            <button className="btn btn-primary" onClick={openPopup}>Get More Tokens</button>
                            <button className="btn btn-primary">Edit Profile</button>
                            <button className="btn btn-primary" onClick={handleSignOut}>Sign out</button>
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
                            <p>Games Played: {slotSpins}</p>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="card-body">
                            <h3>Blackjack</h3>
                            <p>Games Played: {jackGames}</p>
                            <p>Wins: {jackWins}</p>
                            <p>Losses: {jackLosses}</p>
                            <p>Draws: {jackDraws}</p>
                            <p>Average Win Rate: {blackJackWinRate}%</p>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="card-body">
                            <h3>Roulette</h3>
                            <p>Games Played: {rouletteSpins}</p>
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
