import React from 'react';
import Landing from "./components/Landing"
import ZombieGame from './components/ZombieGame';
import CarGame from './components/CarGame';
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Register from './components/Register';
import Ranking from './components/Ranking';
import Profile from './components/Profile'
import PrivateRoute from './hocs/PrivateRoute'
import UnPrivateRoute from './hocs/UnPrivateRoute'
import {Route, useLocation} from 'react-router-dom'

import "./style.css"



function App() {
	let location = useLocation()

  	return (
    	<div className="App">
			{
				location.pathname !== '/login' && location.pathname !== '/register' && !location.pathname.match(/^\/game.*/) && <Navbar />
			}
			<PrivateRoute exact path="/" component={Landing}/>
			<UnPrivateRoute path="/login" component={Login}/>
			<UnPrivateRoute path="/register" component={Register}/>
			<PrivateRoute path="/game/zombiegame" component={ZombieGame}/>
			<PrivateRoute path="/game/cargame" component={CarGame}/>
			<Route path="/ranking" component={Ranking}/>
			<PrivateRoute path="/user/:id" component={Profile}/>
    	</div>
  	);
}

export default App;
