import "bootstrap/dist/css/bootstrap.css"
import React from "react"
import { Link } from "react-router-dom"

const Navbar = ({currentPage}) =>
{ 
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
      
    <div className="navbar-nav" style={{marginLeft: '10px'}}>
      <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {currentPage === 'frontpage' && (
              <>
                <li>
                  <Link className="navbar-brand" to="/">Jackpot Junction</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </>
            )}
            {currentPage === 'login/signup' && (
              <>
                <li>
                  <Link className="navbar-brand" to="/">Jackpot Junction</Link>
                </li>
              </>
            )}
            {currentPage === 'main' && (
              <>
                <li>
                  <Link className="navbar-brand" to="/main">Jackpot Junction</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user">User</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/slots">Slot Games</Link>
                </li>
              </>
            )}
            {currentPage === 'user' && (
              <>
                <li>
                  <Link className="navbar-brand" to="/main">Jackpot Junction</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/main">Main</Link>
                </li>
              </>
            )}
            {currentPage === 'slots' && (
              <>
                <li>
                  <Link className="navbar-brand" to="/main">Jackpot Junction</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/main">Main</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user">User</Link>
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