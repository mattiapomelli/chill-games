import React from "react"
import { Link } from "react-router-dom"

const Game = () => {

    return (
      <div>
        <h1>Zombie Game</h1>
        <Link to="/zombiegame">Play</Link>
      </div>
    )
}

export default Game