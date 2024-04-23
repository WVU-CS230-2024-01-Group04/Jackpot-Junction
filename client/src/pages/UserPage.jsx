import React from "react";
import Navbar from "../components/Navbar";
import kermitImage from "../images/kermit.webp";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Authenticator } from '@aws-amplify/ui-react';


const StatsPage = () => {

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

    return (
        <Authenticator>
 {({ signOut,user }) => (
                    

        <div>
        <Navbar currentPage="userpage" />

        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <img src={kermitImage} alt="Profile" className="img-fluid rounded-circle mb-3" style={{ width: '150px' }} />
                            <h4>Username: {user.username}</h4>
                            <button className="btn btn-primary">Report User</button>
                            <button className="btn btn-primary">Edit Profile</button>
                            <button onClick={signOut}>Sign out</button>
                        </div>
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
    </div>
                )}




        </Authenticator>

    );
};

export default StatsPage;
