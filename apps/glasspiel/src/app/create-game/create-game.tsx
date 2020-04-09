import React, { ChangeEvent, FormEvent, useState } from 'react';

import './create-game.scss';

import { Player } from '../models/player';
import { createGame } from '../services/game.service';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const initialPlayer: Player = {
  id: '123456'
};

export const CreateGame = (props: RouteComponentProps) => {
  const [player, setPlayer] = useState(initialPlayer);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const gameId: string = await createGame(player);
    props.history.push(`/${gameId}/${player.id}`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPlayer: Player = {
      ...player,
      name: event.target.value
    };

    setPlayer(newPlayer);
  };

  return (
    <div>
      <h1>Glasspiel sein Vater</h1>
      <form onSubmit={handleSubmit}>
        <input id="spielername" placeholder="Spielername" type="text" onChange={handleChange}/>
        <button type="submit">Spiel erstellen</button>
      </form>
    </div>
  );
};

export default withRouter(CreateGame);
