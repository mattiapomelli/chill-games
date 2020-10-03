import React from "react"
import { Link } from "react-router-dom"
import "../css/landing.css"

const Landing = () => {

    return (
		<div className="page-container scrollable-container">
			<div className="games-container">
				<div className="poster-container">
					<img src="/images/covers/zombiegame.jpg" alt="game poster"></img>
					<h1>Zombie Game</h1>
					<Link to="/game/zombiegame">Play</Link>
				</div>
				
				<div className="poster-container">
					<img src="/images/covers/cargame.jpg" alt="game poster"></img>
					<h1>Car Game</h1>
					<Link to="/game/cargame">Play</Link>
				</div>
			</div>
		</div>
    )
}

export default Landing