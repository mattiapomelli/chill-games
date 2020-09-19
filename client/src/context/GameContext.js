import React, {createContext, useState } from 'react'

export const GameContext = createContext()

export const GameProvider = ({ children }) => {      
    const [gameOver, setGameOver] = useState(false)
    const [finalScore, setFinalScore] = useState(0)

    return (    //
        <div>
            <GameContext.Provider value={{gameOver, setGameOver, finalScore, setFinalScore}}>
                { children }  {/*Here will go th App component*/}
            </GameContext.Provider>
        </div>
    )
}