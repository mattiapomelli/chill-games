import React, {createContext, useCallback, useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import axios from "axios"

export const GameContext = createContext()

export const GameProvider = ({ children }) => {      
    const [gameOver, setGameOver] = useState(false)
    const [finalScore, setFinalScore] = useState(0)
    const [stats, setStats] = useState({})
    const [activeGame, setActiveGame] = useState('')
    const {isAuthenticated, loggedUser} = useContext(AuthContext)
    const [gameMessage, setGameMessage] = useState('')

    const endGame = useCallback((score, gameStats, game) => {
        setGameMessage('')
        setGameOver(true)
        if(isAuthenticated){
            axios.put(`/user/${loggedUser._id}`, {
                game: game,
                score: score,
                stats: gameStats
            }).then(res => setGameMessage(res.data.message)) //to keep only if I want to update user record on screen
        } else {
            setFinalScore(score)
            setStats(gameStats)
            setActiveGame(game)
        }
    }, [isAuthenticated, loggedUser._id])

    return ( 
        <GameContext.Provider value={{gameOver, setGameOver, finalScore, endGame, stats, setFinalScore, activeGame, gameMessage}}>
            { children }  {/*Here will go th App component*/}
        </GameContext.Provider>
    )
}