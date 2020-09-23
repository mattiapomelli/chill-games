import React from "react"
import { Link } from "react-router-dom"

const Landing = () => {

    return (
      <div>
        <h1>Zombie Game</h1>
        <Link to="/zombiegame">Play</Link>
        <h1>Car Game</h1>
        <Link to="/cargame">Play</Link>
      </div>
    )
}

export default Landing