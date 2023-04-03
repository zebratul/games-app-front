import React from 'react';

function GameList(props) {
  const { games, onJoinGame } = props;

  return (
    <>
      <h2>Game List:</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Game ID</th>
            <th>Game Type</th>
            <th>Join Game</th>
          </tr>
        </thead>
        <tbody>
          {games.map(game => (
            <tr key={game.gameId}>
              <td>{game.gameId}</td>
              <td>{game.game.gameType}</td>
              <td><button onClick={() => onJoinGame(game.gameId)}>Join Game</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default GameList;
