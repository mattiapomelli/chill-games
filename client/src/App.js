import React from 'react';
import Game from "./components/Game"
import ZombieGame from './components/ZombieGame';
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Ranking from './components/Ranking';
import PrivateRoute from './hocs/PrivateRoute'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import "./style.css"



function App() {

  	return (
    	<div className="App">
		<Router>
			<Navbar />
			<PrivateRoute exact path="/" component={Game}/>
			<Route path="/zombiegame" component={ZombieGame}/>
			<Route path="/login" component={Login}/>
			<Route path="/ranking" component={Ranking}/>
		</Router>
    	</div>
  	);
}

export default App;
