import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from './context/AuthContext'
import { GameProvider } from './context/GameContext'
import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
    <AuthProvider>
    <GameProvider>
      <Router>
       <App />
      </Router>
    </GameProvider>
    </AuthProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
