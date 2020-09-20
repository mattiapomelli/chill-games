import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from './context/AuthContext'
import { GameProvider } from './context/GameContext'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <GameProvider>
      <App />
    </GameProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
