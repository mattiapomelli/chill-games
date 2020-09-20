import React, { useContext } from 'react';
import Game from "./components/Game"
import { AuthContext } from './context/AuthContext';
import AuthService from './services/AuthService'
import "./style.css"

function App() {
	const {loggedUser, setLoggedUser, setIsAuthenticated, isAuthenticated} = useContext(AuthContext)

	const logOut = () => {
		AuthService.logout().then(data => {
			if(data.success){
				setLoggedUser(data.user)        
                setIsAuthenticated(false)
			}
		})
	}

  	return (
    	<div className="App">
			<div>{isAuthenticated ? loggedUser.username : "Guest"}</div>
			<button onClick={logOut}>Logout</button>
			<Game />
    	</div>
  	);
}

export default App;
