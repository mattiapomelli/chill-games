import React, {createContext, useState } from 'react'

export const GameContext = createContext()

export const GameProvider = ({ children }) => {      
    const [gameOver, setGameOver] = useState(false)
    const [finalScore, setFinalScore] = useState(0)
    const [stats, setStats] = useState({})

    return (    //
        <div>
            <GameContext.Provider value={{gameOver, setGameOver, finalScore, setFinalScore, stats, setStats}}>
                { children }  {/*Here will go th App component*/}
            </GameContext.Provider>
        </div>
    )
}