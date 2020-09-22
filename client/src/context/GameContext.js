import React, {createContext, useCallback, useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import axios from "axios"

export const GameContext = createContext()

export const GameProvider = ({ children }) => {      
    const [gameOver, setGameOver] = useState(false)
    const [finalScore, setFinalScore] = useState(0)
    const [stats, setStats] = useState({})
    const {isAuthenticated, loggedUser, setLoggedUser} = useContext(AuthContext)

    const endGame = useCallback((score, gameStats) => {
        console.log("STATS:", score, gameStats)
        setGameOver(true)
        setFinalScore(score)
        setStats(gameStats)
        if(isAuthenticated){
            console.log('update score');
            axios.put(`/user/${loggedUser._id}`, {
                score: score,
                stats: gameStats
            }).then(res => setLoggedUser(res.data)) //to keep only if I want to update user record on screen
        }
        // else {
            // setFinalScore(score)
            // setStats(gameStats)
        //}
    }, [isAuthenticated, loggedUser._id, setLoggedUser])

    return ( 
        <div>
            <GameContext.Provider value={{gameOver, setGameOver, finalScore, endGame, stats, setFinalScore}}>
                { children }  {/*Here will go th App component*/}
            </GameContext.Provider>
        </div>
    )
}