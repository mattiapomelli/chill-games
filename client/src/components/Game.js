import React from "react"
import { Link } from "react-router-dom"

const Game = () => {
    //const {gameOver, setGameOver, setFinalScore, setStats} = useContext(GameContext)
    //const {isAuthenticated, loggedUser, setLoggedUser} = useContext(AuthContext)
    //const [gameLaunched, setGameLaunched] = useState(false)


    // const endGame = (score, gameStats) => {
    //   setFinalScore(score)
    //   setStats(gameStats)
    //   setGameOver(true)
    //   if(isAuthenticated){
    //     updateUserScore(score, gameStats)
    //   }
    // }

    // const updateUserScore = (score, stats) => {

    //   //if(score > loggedUser.bestScore) {
    //   axios.put(`/user/${loggedUser._id}`, {
    //     score: score,
    //     stats: stats
    //   }).then(res => {
    //     if(score > loggedUser.bestScore)
    //       setLoggedUser({...loggedUser, bestScore: score})
    //   })


    return (
          <Link to="/zombiegame">Play</Link>
    )
}

export default Game