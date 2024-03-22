import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import FrontPage from './pages/FrontPage';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';

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
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
