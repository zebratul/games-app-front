import React, { useState } from 'react';

function CreateGameForm({ onCreateGame }) {
  const [gameType, setGameType] = useState('tic-tac-toe');

  const handleGameTypeChange = (event) => {
    setGameType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreateGame(gameType);
  };

  return (
    <div className="create-game-form">
      <form onSubmit={handleSubmit}>
        <h2>Create Game</h2>
        <label>
          Game Type:
          <select value={gameType} onChange={handleGameTypeChange}>
            <option value="tic-tac-toe">Tic-Tac-Toe</option>
            <option value="ultimate-tic-tac-toe">Ultimate Tic-Tac-Toe</option>
          </select>
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateGameForm;
