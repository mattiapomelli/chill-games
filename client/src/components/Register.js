import React, { useContext, useState } from "react"
import AuthService from '../services/AuthService'
import { AuthContext } from "../context/AuthContext"
import { GameContext } from "../context/GameContext"
import {Link} from "react-router-dom"

const Register = () => {
    const [username, setUsername] = useState('')
    const {finalScore, stats} = useContext(GameContext)
    const {setLoggedUser, setIsAuthenticated, setIsGuest} = useContext(AuthContext)

    const registerUser = (e) => {
        e.preventDefault()
        const user = {username, bestScore: finalScore, stats}
        AuthService.register(user).then( data => {
            const {isAuthenticated, loggedUser} = data
            if(isAuthenticated){
                setLoggedUser(loggedUser)
                setIsAuthenticated(isAuthenticated)
                setIsGuest(false)
            }
        })
    }

    const onChange = (e) => {
        setUsername(e.target.value)
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <form className="login-form" onSubmit={registerUser}>
                    <h1>Register</h1>

                    <div className="input-container">
                        <span className="material-icons input-icon">person_outline</span>
                        <input placeholder="Username" value={username} onChange={onChange}/>
                    </div>


                    <button type="submit">Sign up</button>

                    <p className="redirect-text">Don't have an account? <Link to="/login">Sign in</Link></p>
                </form>

            </div>

            <p className="guest-text"> Continue as a guest </p>
        </div>
    )
}

export default Register