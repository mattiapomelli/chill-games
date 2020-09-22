import React from 'react';
import Landing from "./components/Landing"
import ZombieGame from './components/ZombieGame';
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
				location.pathname !== '/login' && location.pathname !== '/register' && <Navbar />
			}
			<PrivateRoute exact path="/" component={Landing}/>
			<PrivateRoute path="/zombiegame" component={ZombieGame}/>
			<UnPrivateRoute path="/login" component={Login}/>
			<UnPrivateRoute path="/register" component={Register}/>
			<Route path="/ranking" component={Ranking}/>
			<PrivateRoute path="/user/:id" component={Profile}/>
    	</div>
  	);
}

export default App;
