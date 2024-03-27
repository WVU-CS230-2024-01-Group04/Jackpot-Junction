import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import FrontPage from './pages/FrontPage';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import SlotsPage from './pages/SlotsPage';
import CardsPage from './pages/CardsPage';
import Slots1 from './games/slots1';
import Blackjack from './games/blackjack';

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
          <Route path="/user" element={<UserPage/>}/>
          <Route path="/slots" element={<SlotsPage/>}/>
          <Route path="/cards" element={<CardsPage/>}/>

          <Route path="/slots1" element={<Slots1/>}/>

          <Route path="/blackjack" element={<Blackjack/>}/>
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App; 
