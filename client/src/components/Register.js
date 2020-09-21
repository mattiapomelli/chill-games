import React, { useContext, useState } from "react"
import AuthService from '../services/AuthService'
import { AuthContext } from "../context/AuthContext"
import { GameContext } from "../context/GameContext"

const Register = () => {
    const [username, setUsername] = useState('')
    const {finalScore, stats} = useContext(GameContext)
    const {setLoggedUser, setIsAuthenticated} = useContext(AuthContext)

    const registerUser = (e) => {
        e.preventDefault()
        const user = {username, bestScore: finalScore, stats}
        AuthService.register(user).then( data => {
            const {isAuthenticated, loggedUser} = data
            if(isAuthenticated){
                setLoggedUser(loggedUser)
                setIsAuthenticated(isAuthenticated)
            }
        })
    }

    const onChange = (e) => {
        setUsername(e.target.value)
    }

    return (
        <div>
            <form onSubmit={registerUser}>
                <input placeholder="Username" value={username} onChange={onChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register