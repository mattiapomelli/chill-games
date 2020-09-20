import React, { useContext, useState } from "react"
import AuthService from '../services/AuthService'
import { AuthContext } from "../context/AuthContext"

const Login = (props) => {
    const [username, setUsername] = useState('')
    const {setLoggedUser, setIsAuthenticated} = useContext(AuthContext)

    const loginUser = (e) => {
        e.preventDefault()
        const user = {username}
        AuthService.login(user).then( data => {
            const {isAuthenticated, loggedUser} = data
            if(isAuthenticated){
                setLoggedUser(loggedUser)
                setIsAuthenticated(isAuthenticated)
                props.history.push('/')  
            }
        })
    }

    const onChange = (e) => {
        setUsername(e.target.value)
    }

    return (
        <div>
            <form onSubmit={loginUser}>
                Login:
                <input placeholder="Username" value={username} onChange={onChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login