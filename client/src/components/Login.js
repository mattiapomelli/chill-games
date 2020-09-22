import React, { useContext, useState } from "react"
import AuthService from '../services/AuthService'
import { AuthContext } from "../context/AuthContext"
import {Link} from "react-router-dom"
import "../css/login.css"

const Login = (props) => {
    const [username, setUsername] = useState('')
    const {setLoggedUser, setIsAuthenticated, setIsGuest} = useContext(AuthContext)

    const loginUser = (e) => {
        e.preventDefault()
        const user = {username}
        AuthService.login(user).then( data => {
            const {isAuthenticated, loggedUser} = data
            if(isAuthenticated){
                setLoggedUser(loggedUser)
                setIsAuthenticated(isAuthenticated)
                setIsGuest(false)
                props.history.push('/')  
            }
        })
    }

    const signAsGuest = () => {
        setIsGuest(true);
        props.history.push('/')
    }

    const onChange = (e) => {
        setUsername(e.target.value)
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <form className="login-form" onSubmit={loginUser}>
                    <h1>Login</h1>

                    <div className="input-container">
                        <span className="material-icons input-icon">person_outline</span>
                        <input placeholder="Username" value={username} onChange={onChange}/>
                    </div>


                    <button type="submit">Sign In</button>
                </form>

                <p className="redirect-text">Don't have an account? <Link to="/register">Sign up</Link></p>

            </div>
            
            <p className="guest-text" onClick={signAsGuest}> Continue as a guest </p>
        </div>
    )
}

export default Login