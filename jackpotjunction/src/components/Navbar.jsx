import "bootstrap/dist/css/bootstrap.css"
import React from "react"
import { Link } from "react-router-dom"

const Navbar = ({currentPage}) =>
{ 
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
      
    <div className="navbar-nav" style={{marginLeft: '10px'}}>
      <Link className="navbar-brand" to="/">Jackpot Junction</Link>

      <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {currentPage === 'frontpage' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </>
            )}
            {currentPage === 'login/signup' && (
              <></>
            )}
            {currentPage === 'main' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/user">User</Link>
                </li>
              </>
            )}
            {currentPage === 'user' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/main">Main</Link>
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