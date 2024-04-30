import "bootstrap/dist/css/bootstrap.css"
import React from "react"
import { Link } from "react-router-dom"

const GameCard = ({image, link, title, description}) =>
{
    return(

        <div style={{ padding: '10px' }}>
            <div class="card" style={{ width: "18rem" }}>

        {/* This component is a gamecard taken from bootstrap and modified to fit the needs of our site. */}
        {/* The card has parameters for showing an image for the game, accompanying text, and a button with a link specified. */}
                <div class="card-body">
                    <img className="card-img-top img-fluid" src={image} alt={title}/>
                    <h5 class="card-title">{title}</h5>
                    <p class="card-text">{description}</p>
                    <Link className="btn btn-primary" to={link}>Play</Link>
                </div>

            </div>
        </div>
    )
}

export default GameCard