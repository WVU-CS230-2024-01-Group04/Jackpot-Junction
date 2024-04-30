// Imports CSS for styling, bootstap, and react components
import "bootstrap/dist/css/bootstrap.css"
import React from "react"
import { Link } from "react-router-dom"

// Navbar component for all the pages in jackpot junction
const Navbar = ({currentPage}) =>
{ 
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
      
      {/* This is the navbar stuff, most of it comes from bootstrap */}
    <div className="navbar-nav" style={{marginLeft: '10px'}}>
      <div className="collapse navbar-collapse" id="navbarNav">
        {/* This is a list of presets for the navbar based on a string parameter. The string determines what preset is shown. */}
          <ul className="navbar-nav ml-auto">
            {/* Here is the preset for the front page of the site. It will show the Jackpot Junction in the top left and a link to the login/signup page. */}
            {/* All subsequent presets work like this one with different links for different pages. */}
            {currentPage === 'frontpage' && (
              <>
                <li>
                  <Link className="navbar-brand" to="/">Jackpot Junction</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Login/Signup</Link>
                </li>
              </>
            )}
            {/*Navbar for the login/signup page*/}
            {currentPage === 'login/signup' && (
              <>
                <li>
                  <Link className="navbar-brand" to="/">Jackpot Junction</Link>
                </li>
              </>
            )}
            {/*Navbar for the main page along with the game pages*/}
            {currentPage === 'main' && (
              <>
                <li>
                  <Link className="navbar-brand" to="/main">Jackpot Junction</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/userpage">User</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/slots">Slot Games</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cards">Card Games</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/chance">Chance Games</Link>
                </li>
              </>
            )}
            {/*Navbar for the user page, excludes the link to the user page*/}
            {currentPage === 'userpage' && (
              <>
              <li>
                <Link className="navbar-brand" to="/main">Jackpot Junction</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/slots">Slot Games</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cards">Card Games</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chance">Chance Games</Link>
              </li>
            </>
            )}
          </ul>
        </div>
    </div>
  </nav>
  )
}

export default Navbar