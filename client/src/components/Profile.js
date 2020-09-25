import React, {useState, useEffect, useContext, Fragment} from "react"
import { GameContext } from "../context/GameContext"
import { AuthContext } from "../context/AuthContext"
import AuthService from "../services/AuthService"
import axios from "axios"
import "../css/profile.css"
import { Link } from "react-router-dom"

const Profile = (props) => {
    const {setIsAuthenticated, setLoggedUser, loggedUser } = useContext(AuthContext)
    const {setFinalScore} = useContext(GameContext)
    const [user, setUser] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [currentGame, setCurrentGame] = useState('zombiegame')    //game the statistics are related to

    useEffect(() => {
        axios.get("/user/" + props.match.params.id)
        .then(res => {
            setUser(res.data)
            setLoaded(true)
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
    
    const onTabClick = (event) => {
        setCurrentGame(event.target.name)

        event.target.classList.add('active')
        let tabs = document.getElementsByClassName('game-tab')
        for (let tab of tabs) {
            tab !== event.target && tab.classList.remove('active')
        }
    }

    const camelCaseToSentence = (text) => {
        let result = text.replace( /([A-Z])/g, " $1" );
        let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        return finalResult
    }

    return (
        <div className="page-container">
            
            { loaded ?
            <Fragment>
            {props.location.state && <Link to={{pathname: "/ranking", state: {position: props.location.state.position, tab: props.location.state.tab}}} className="backto-link">&lt;- Back</Link>} 
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile"/>
                        <h1>{user.username}</h1>
                    </div>
                    <div className="joined-date">
                        <div>Joined on</div>
                        <h4>{user.created.substring(0, 10)}</h4>
                    </div>           
                </div>

                <div className="profile-body">
                    <div className="tabs-container">
                        <button onClick={onTabClick} className="game-tab tab active" name="zombiegame">Zombie Game</button>
                        <button onClick={onTabClick} className="game-tab tab" name="cargame">Car Game</button>
                    </div>
                    <div className="profile-statistics">
                        <h2>Best Score: {user[currentGame].bestScore}</h2>
                        {
                            
                            Object.keys(user[currentGame].stats).map((keyName, keyIndex) => {
                                return(
                                    <h4 key={keyIndex}>{camelCaseToSentence(keyName)}: {user[currentGame].stats[keyName]}</h4>
                                )
                            })     
                        }
                    </div>
                </div>
                
                { user._id === loggedUser._id && <button className="logout-button secondary-button" onClick={logOut}>Logout</button>}
                
            </div>
            </Fragment>
            
            : "Loading..." }
        </div>
    )
}

export default Profile