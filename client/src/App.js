import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import FrontPage from './pages/FrontPage';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import MainPage from './pages/MainPage';
import UserPageAuthenticator from './pages/UserPageAuthenticator';
import SlotsPage from './pages/SlotsPage';
import SlotsRules from './pages/SlotsRules';
import Slots2Rules from './pages/Slots2Rules';
import BlackjackPage from './pages/BlackjackPage';
import CardsPage from './pages/CardsPage';
import Slots1 from './games/slots1';
import Slots2 from './games/slots2';
import Blackjack1 from './games/blackjack1';
import ChanceGamesPage from './pages/ChanceGamesPage'
import RouletteGame from './games/roulettegame'
import RouletteRulesPage from './pages/RouletteRulesPage'

import { Amplify } from 'aws-amplify';

import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FrontPage/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/main" element={<MainPage/>}/>
          <Route path="/userpage" element={<UserPageAuthenticator/>}/>
          <Route path="/slots" element={<SlotsPage/>}/>
          <Route path="/blackjack" element={<BlackjackPage/>}/>
          <Route path="/cards" element={<CardsPage/>}/>
          <Route path="/chance" element={<ChanceGamesPage/>}/>
          
          <Route path="/slotsrules" element={<SlotsRules/>}/>
          <Route path="/slots1" element={<Slots1/>}/>
          <Route path="/slots2rules" element={<Slots2Rules/>}/>
          <Route path="/slots2" element={<Slots2/>}/>

          <Route path="/blackjack1" element={<Blackjack1/>}/>

          <Route path="/rouletterules" element={<RouletteRulesPage/>}/>
          <Route path="/roulette" element={<RouletteGame/>}/>
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App; 