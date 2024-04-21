import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import FrontPage from './pages/FrontPage';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import SlotsPage from './pages/SlotsPage';
import SlotsRules from './pages/SlotsRules';
import BlackjackPage from './pages/BlackjackPage';
import CardsPage from './pages/CardsPage';
import Slots1 from './games/slots1';
import Blackjack1 from './games/blackjack1';
import ChanceGamesPage from './pages/ChanceGamesPage'
import Roulette from './games/roulette'
import RouletteRulesPage from './pages/RouletteRulesPage'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FrontPage/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/main" element={<MainPage/>}/>
          <Route path="/user" element={<UserPage/>}/>
          <Route path="/slots" element={<SlotsPage/>}/>
          <Route path="/blackjack" element={<BlackjackPage/>}/>
          <Route path="/cards" element={<CardsPage/>}/>
          <Route path="/chance" element={<ChanceGamesPage/>}/>
          
          <Route path="/slotsrules" element={<SlotsRules/>}/>
          <Route path="/slots1" element={<Slots1/>}/>

          <Route path="/blackjack1" element={<Blackjack1/>}/>

          <Route path="/rouletterules" element={<RouletteRulesPage/>}/>
          <Route path="/roulette" element={<Roulette/>}/>
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App; 