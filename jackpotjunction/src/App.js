import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import FrontPage from './pages/FrontPage';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import SlotsPage from './pages/SlotsPage';
import Slots1 from './games/slots1';

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

          <Route path="/slots1" element={<Slots1/>}/>
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
