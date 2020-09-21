import React, {createContext, useCallback, useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import axios from "axios"

export const GameContext = createContext()

export const GameProvider = ({ children }) => {      
    const [gameOver, setGameOver] = useState(false)
    const [finalScore, setFinalScore] = useState(0)
    const [stats, setStats] = useState({})
    const {isAuthenticated, loggedUser} = useContext(AuthContext)

    const endGame = useCallback((score, gameStats) => {
        console.log("STATS:", score, gameStats)
        setGameOver(true)
        if(isAuthenticated){
            console.log('update score');
            axios.put(`/user/${loggedUser._id}`, {
                score: score,
                stats: gameStats
            })
        } else {
            setFinalScore(score)
            setStats(gameStats)
        }
    }, [isAuthenticated, loggedUser._id])

    return (    //
        <div>
            <GameContext.Provider value={{gameOver, setGameOver, finalScore, setFinalScore, endGame, stats, setStats}}>
                { children }  {/*Here will go th App component*/}
            </GameContext.Provider>
        </div>
    )
}