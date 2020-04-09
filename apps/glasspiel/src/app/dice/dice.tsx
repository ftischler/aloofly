import React, { useState } from 'react';

import './dice.scss';
import { randomDiceValue } from '../common/random-dice-value';

export interface DiceProps {
  value: number;
  canRoll: boolean;
}

export const Dice = (props: DiceProps = { value: 0, canRoll: true }) => {
  const [diceState, setDiceState] = useState<DiceProps>();
  const diceValue: number = props.value ?? diceState?.value;

  const rollDice = () => {
    setDiceState({
      value: randomDiceValue(),
      canRoll: false
    });
  }

  const renderButton = () => {
    if (diceState?.canRoll) {
      return <button onClick={rollDice}>Würfeln</button>
    }
  }

  return (
    <div className="dice">
      <div className={`dice-${diceValue}`}>
      </div>
      {renderButton()}
    </div>
  );
};

export default Dice;
