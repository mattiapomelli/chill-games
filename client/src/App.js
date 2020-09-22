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
import {BrowserRouter as Router, Route} from 'react-router-dom'

import "./style.css"



function App() {

  	return (
    	<div className="App">
		<Router>
			<Navbar />
			<PrivateRoute exact path="/" component={Landing}/>
			<PrivateRoute path="/zombiegame" component={ZombieGame}/>
			<UnPrivateRoute path="/login" component={Login}/>
			<UnPrivateRoute path="/register" component={Register}/>
			<Route path="/ranking" component={Ranking}/>
			<PrivateRoute path="/user/:id" component={Profile}/>
		</Router>
    	</div>
  	);
}

export default App;
