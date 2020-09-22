import React from 'react';
import Landing from "./components/Landing"
import ZombieGame from './components/ZombieGame';
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Ranking from './components/Ranking';
import Profile from './components/Profile'
import PrivateRoute from './hocs/PrivateRoute'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import "./style.css"



function App() {

  	return (
    	<div className="App">
		<Router>
			<Navbar />
			<PrivateRoute exact path="/" component={Landing}/>
			<PrivateRoute path="/zombiegame" component={ZombieGame}/>
			<Route path="/login" component={Login}/>
			<Route path="/ranking" component={Ranking}/>
			<PrivateRoute path="/user/:id" component={Profile}/>
		</Router>
    	</div>
  	);
}

export default App;
