import React, {useState, useEffect, useContext} from "react"
import { GameContext } from "../context/GameContext"
import { AuthContext } from "../context/AuthContext"
import AuthService from "../services/AuthService"
import axios from "axios"

const Profile = (props) => {
    const {setIsAuthenticated, setLoggedUser } = useContext(AuthContext)
    const {setFinalScore} = useContext(GameContext)
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get("/user/" + props.match.params.id)
        .then(res => {
            setUser(res.data)
        }).catch(err => console.log(err))
    }, [props.match.params.id]) //so when we go from an user profile to another user's profile since props change the component re-fetches data and re-mounts

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
            <h1>{user.username}</h1>
            <button onClick={logOut}>Logout</button>
        </div>
    )
}

export default Profile