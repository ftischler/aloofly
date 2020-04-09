import React, { useState } from 'react';

import './game.scss';
import { RouteComponentProps } from 'react-router-dom';
import Dice from '../dice/dice';

export interface GameProps {
  gameId: string;
  playerId: string;
}

export const Game = (props: RouteComponentProps<GameProps>) => {
  const {match: {params: {gameId, playerId}}} = props;

  const [lives] = useState(6);

  return (
    <div>
      <h1>Welcome {playerId} in the game {gameId} </h1>
      <div>
        <p>Meine Leben</p>
        <Dice value={lives} canRoll={false}></Dice>
      </div>
    </div>
  );
};

export default Game;
