import React from 'react';
import Game from "./components/Game"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import {BrowserRouter as Router, Route} from 'react-router-dom'

import "./style.css"


function App() {

  	return (
    	<div className="App">
		<Router>
			<Navbar />
			<Route exact path="/" component={Game}/>
			<Route path="/login" component={Login}/>
		</Router>
    	</div>
  	);
}

export default App;
