import React from 'react';
import GameSquare from './GameSquare';

function Game(props) {
  const { game, onMakeMove, onEndGame } = props;
  const { board, turn, winner } = game;

  const handleMakeMove = (row, col) => {
    if (!winner && board[row][col] === null) {
      onMakeMove(row, col);
    }
  };

  const renderGameSquare = (row, col) => {
    const value = board[row][col];
    return (
      <GameSquare key={`${row},${col}`} value={value} onClick={() => handleMakeMove(row, col)} />
    );
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (turn) {
    status = `Next player: ${turn}`;
  } else {
    status = 'Game over.';
  }

  return (
    <>
      <h2>{status}</h2>
      <table className="game-board">
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, colIndex) => renderGameSquare(rowIndex, colIndex))}
            </tr>
          ))}
        </tbody>
      </table>
      {winner || !turn ?
        <button onClick={onEndGame}>End Game</button>
        :
        null
      }
    </>
  );
}

export default Game;
