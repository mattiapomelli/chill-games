import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from './context/AuthContext'
import { GameProvider } from './context/GameContext'

ReactDOM.render(
    <AuthProvider>
    <GameProvider>
      <App />
    </GameProvider>
    </AuthProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
