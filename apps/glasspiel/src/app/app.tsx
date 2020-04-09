import React from 'react';

import './app.scss';

import { Route } from 'react-router-dom';
import Game from './game/game';
import CreateGame from './create-game/create-game';

export const App = () => {
  return (
    <div className="app">
      <header>
        <h1>Willkommen beim Glasspiel</h1>
      </header>
      <Route
        path="/"
        exact
        component={CreateGame}
      />
      <Route
        path="/:gameId/:playerId"
        exact
        component={Game}
      />
    </div>
  );
};

export default App;
