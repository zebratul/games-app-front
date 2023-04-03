import React from 'react';

function GameSquare(props) {
  const { value, onClick } = props;

  return (
    <button className="game-square" onClick={onClick}>
      {value}
    </button>
  );
}

export default GameSquare;
