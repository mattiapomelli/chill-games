import React, { useContext, useState } from "react"
import AuthService from '../services/AuthService'
import { AuthContext } from "../context/AuthContext"
import {Link} from "react-router-dom"
import Message from './Message'
import "../css/login.css"

const Login = (props) => {
    const [user, setUser] = useState({username: "", password: ""})
    const [message, setMessage] = useState("")
    const {setLoggedUser, setIsAuthenticated, setIsGuest} = useContext(AuthContext)

    const loginUser = (e) => {
        setMessage('')
        e.preventDefault()
        AuthService.login(user).then( data => {
            const {isAuthenticated, loggedUser, message} = data
            if(isAuthenticated){
                setLoggedUser(loggedUser)
                setIsAuthenticated(isAuthenticated)
                setIsGuest(false)
                props.history.push('/')  
            } else {
                setMessage(message.msgBody)
            }
        })
    }

    const signAsGuest = () => {
        setUser({username: "", password: "", password2:""}) // to secure that if user entered a password is not exposed
        setIsGuest(true);
        props.history.push('/')
    }

    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <form className="login-form" onSubmit={loginUser}>
                    <h1>Login</h1>

                    <div className="input-container">
                        <span className="material-icons input-icon">person_outline</span>
                        <input name="username" placeholder="Username" value={user.username} onChange={onChange}/>
                    </div>
                    <div className="input-container">
                        <span className="material-icons input-icon">lock_outline</span>
                        <input name="password" placeholder="Password" value={user.password} onChange={onChange} type="password"/>
                    </div>


                    <button type="submit">Sign In</button>
                </form>

                <p className="redirect-text">Don't have an account? <Link to="/register">Sign up</Link></p>

            </div>
            
            <p className="guest-text" onClick={signAsGuest}> Continue as a guest </p>

            <Message message={message}/>
        </div>
    )
}

export default Login