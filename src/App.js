import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import GameList from './components/GameList';
import LoginForm from './components/LoginForm';
import CreateGameForm from './components/CreateGameForm';
import Game from './components/Game';
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io.connect('http://localhost:5000');

function App() {
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [gameList, setGameList] = useState([]);
  const [creatingGame, setCreatingGame] = useState(false);
  const [game, setGame] = useState(null);

  useEffect(() => {
    socket.on('gameList', (data) => {
      setGameList(data.games);
    });
    socket.emit('listGames');
  }, []);

  const handleLogin = (username) => {
    setUsername(username);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUsername('');
    setLoggedIn(false);
  };

  const handleCreateGame = (gameType) => {
    setCreatingGame(true);
    socket.emit('createGame', { gameType });
  };

  const handleJoinGame = (gameId) => {
    socket.emit('joinGame', { gameId });
  };

  const handleMakeMove = (row, col) => {
    socket.emit('makeMove', { gameId: game.gameId, row, col });
  };

  const handleEndGame = () => {
    setGame(null);
  };

  useEffect(() => {
    socket.on('gameCreated', (data) => {
      setGame(data.game);
      setCreatingGame(false);
    });

    socket.on('gameJoined', (data) => {
      setGame(data.game);
    });

    socket.on('gameUpdated', (data) => {
      setGame(data.game);
    });

    socket.on('gameEnded', () => {
      setGame(null);
    });

    socket.on('errorMessage', (data) => {
      alert(data.message);
    });
  }, []);

  return (
    <div className="container">
      {loggedIn ?
        <>
          {creatingGame ?
            <div>Creating game...</div>
            :
            <>
              <h1>Welcome, {username}!</h1>
              <GameList games={gameList} onJoinGame={handleJoinGame} />
              <CreateGameForm onCreateGame={handleCreateGame} />
            </>
          }
          {game ?
            <Game game={game} onMakeMove={handleMakeMove} onEndGame={handleEndGame} />
            :
            null
          }
          <button onClick={handleLogout}>Logout</button>
        </>
        :
        <LoginForm onLogin={handleLogin} />
      }
    </div>
  );
}

export default App;
