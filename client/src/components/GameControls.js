import React, {Fragment, useContext} from "react"
import { GameContext } from "../context/GameContext"
import { AuthContext } from "../context/AuthContext"
import {Link } from "react-router-dom"
import Message from "./Message"
import "../css/games.css"

const GameControls = ({game, children}) => {
    const { gameOver, gameMessage} = useContext(GameContext)
    const {isAuthenticated} = useContext(AuthContext)

    const openCommands = () => {
        //pause the game
        let canvas = document.getElementById(`${game}Canvas`)
        const pauseEvent = new Event('pause');
        canvas.dispatchEvent(pauseEvent)
  
        //open modal
        const modal = document.getElementById(`comands`);
        modal.style.display = "block"
      }
  
      const closeCommands = () => {
        const modal = document.getElementById(`comands`);
        modal.style.display = "none"
    }

    return (
        <Fragment>
            <div className="controls-container">
                {gameOver && !isAuthenticated && <div className="gameover-message">Register to keep track of your scores and statistics</div>}
                {!gameOver && <div className="gameover-message">Press Esc to pause / unpause</div>}
                <div className="buttons-container">
                    {gameOver && !isAuthenticated && <Link to="/register" className="primary-button button">Sign up</Link>}
                    <span className="secondary-button button" onClick={openCommands}>Commands</span>
                    <Link to="/" className="secondary-button button">Exit</Link>
                </div>
            </div>

            <div id="comands" className="modal">
                <div className="modal-content">
                <span className="close" onClick={closeCommands}>&times;</span>
                {children}
                
              </div>

            </div>

            <Message message={gameMessage}/>
        </Fragment>
    )
}

export default GameControls