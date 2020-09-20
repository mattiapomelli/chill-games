import React, {useContext} from "react"
import { AuthContext } from "../context/AuthContext"
import { GameContext } from "../context/GameContext"
import AuthService from "../services/AuthService"
import { Link } from "react-router-dom"


const Navbar = () => {
    const {isAuthenticated, loggedUser, setIsAuthenticated, setLoggedUser } = useContext(AuthContext)
    const {setFinalScore} = useContext(GameContext)

    const logOut = () => {
		AuthService.logout().then(data => {
			if(data.success){
				setFinalScore(0)
				setLoggedUser(data.user)        
				setIsAuthenticated(false)
			}
		})
	}

    return (
        <div>
            {isAuthenticated ?
				<div>
					<span>{loggedUser.username}</span>
					<span>Your record is: {loggedUser.bestScore}</span>
					<button onClick={logOut}>Logout</button>
				</div>
			: <div>
				<span>Guest</span>
				<Link to="/login">Login</Link>
			</div>}
        </div>
    )
}

export default Navbar