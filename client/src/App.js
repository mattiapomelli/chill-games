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
			{isAuthenticated ?
				<div>
					<span>{loggedUser.username}</span>
					<span>Your record is: {loggedUser.bestScore}</span>
					<button onClick={logOut}>Logout</button>
				</div>
			: <div>
				<span>Guest</span>
				<button>Login</button>
			</div>}
			<Game />
    	</div>
  	);
}

export default App;
