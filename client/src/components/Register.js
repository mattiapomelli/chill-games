import React, { useContext, useState } from "react"
import AuthService from '../services/AuthService'
import Message from './Message'
import { AuthContext } from "../context/AuthContext"
import { GameContext } from "../context/GameContext"
import {Link} from "react-router-dom"

const Register = (props) => {
    const [user, setUser] = useState({username: "", password: "", password2:""})
    const [message, setMessage] = useState("")
    const {finalScore, stats, activeGame} = useContext(GameContext)
    const {setLoggedUser, setIsAuthenticated, setIsGuest} = useContext(AuthContext)

    const registerUser = (e) => {
        setMessage('')
        e.preventDefault()
        const newUser = {...user, bestScore: finalScore, stats, game: activeGame}
        console.log(newUser)
        AuthService.register(newUser).then( data => {
            const {isAuthenticated, loggedUser, message} = data
            if(isAuthenticated){
                setLoggedUser(loggedUser)
                setIsAuthenticated(isAuthenticated)
                setIsGuest(false)
            } else {
                setMessage(message.msgBody)
            }
        })
    }

    const signAsGuest = () => {
        setIsGuest(true);
        props.history.push('/')
    }

    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <form className="login-form" onSubmit={registerUser}>
                    <h1>Register</h1>

                    <div className="input-container">
                        <span className="material-icons input-icon">person_outline</span>
                        <input name="username" placeholder="Username" value={user.username} onChange={onChange}/>
                    </div>
                    <div className="input-container">
                        <span className="material-icons input-icon">lock_outline</span>
                        <input name="password" placeholder="Password" value={user.password} onChange={onChange} type="password"/>
                    </div>
                    <div className="input-container">
                        <span className="material-icons input-icon">lock_outline</span>
                        <input name="password2" placeholder="Confirm password" value={user.password2} onChange={onChange} type="password"/>
                    </div>


                    <button type="submit">Sign up</button>

                    <p className="redirect-text">Don't have an account? <Link to="/login">Sign in</Link></p>
                </form>

            </div>

            <p className="guest-text" onClick={signAsGuest}> Continue as a guest </p>

            <Message message={message}/>
        </div>
    )
}

export default Register