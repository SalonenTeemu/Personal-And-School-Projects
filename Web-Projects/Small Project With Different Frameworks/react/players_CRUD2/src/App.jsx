/** @format
 * Copy paste your code from the App.jsx file here from the previous exercise.
 *
 * Use similar logic as in the Vue CRUD2 exercise and add authentication to the app.
 * 
 * Backend is still using Basic Auth, so you must use the same logic as in the Vue exercise. 
 * 
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise in the same places to pass the tests. Remember to pass in the appropriate props to the child components. 

 * BEWARE: The component props may be different from the Vue exercise and the tests will not pass if you use the wrong props.
 */

import { useState, useEffect } from "react";
import { REQ_STATUS } from "../cypress/e2e/constants.js";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";
import { AddPlayer } from "./components/AddPlayer.jsx";
import { AuthUser } from "./components/AuthUser.jsx";

const url = "http://localhost:3001/api/players";

function App() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [requestStatus, setRequestStatus] = useState(REQ_STATUS.loading);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCredentials, setUserCredentials] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAllPlayers();
    }
  }, [isLoggedIn]);

  const fetchAllPlayers = async () => {
    try {
      setRequestStatus(REQ_STATUS.loading);
      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${btoa(`${userCredentials.username}:${userCredentials.password}`)}`,
        },
      });
      const data = await response.json();
      console.log(data)
      setPlayers(data);
      setRequestStatus(REQ_STATUS.success);
    } catch (error) {
      console.error("Error fetching players:", error);
      setRequestStatus(REQ_STATUS.error);
    }
  };

  const getPlayer = async (playerId) => {
    try {
      setRequestStatus(REQ_STATUS.loading);
      const response = await fetch(`${url}/${playerId}`, {
        headers: {
          Authorization: `Basic ${btoa(`${userCredentials.username}:${userCredentials.password}`)}`,
        },
      });
      const data = await response.json();
      setSelectedPlayer(data);
      setRequestStatus(REQ_STATUS.success);
    } catch (error) {
      console.error("Error fetching player:", error);
      setRequestStatus(REQ_STATUS.error);
    }
  };

  const addPlayer = async (newPlayerName, e) => {
    e.preventDefault();
    try {
      setRequestStatus(REQ_STATUS.loading);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${userCredentials.username}:${userCredentials.password}`)}`,
        },
        body: JSON.stringify({ name: newPlayerName }),
      });
      const data = await response.json();
      setPlayers([...players, data]);
      setRequestStatus(REQ_STATUS.success);
    } catch (error) {
      console.error("Error adding player:", error);
      setRequestStatus(REQ_STATUS.error);
    }
  };

  const deletePlayer = async (playerId, e) => {
    e.preventDefault();
    try {
      setRequestStatus(REQ_STATUS.loading);
      const response = await fetch(`${url}/${playerId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${btoa(`${userCredentials.username}:${userCredentials.password}`)}`,
        },
      });
      if (response.ok) {
        setPlayers(players.filter((player) => player.id !== playerId));
        setSelectedPlayer(null);
        setRequestStatus(REQ_STATUS.success);
      } else {
        setRequestStatus(REQ_STATUS.error);
      }
    } catch (error) {
      console.error("Error deleting player:", error);
      setRequestStatus(REQ_STATUS.error);
    }
  };

  const updatePlayer = async (e, playerId, newPlayerState) => {
    e.preventDefault();
    try {
      setRequestStatus(REQ_STATUS.loading);
      const response = await fetch(`${url}/${playerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${userCredentials.username}:${userCredentials.password}`)}`,
        },
        body: JSON.stringify({ isActive: newPlayerState }),
      });
      const updatedPlayer = await response.json();
      setPlayers(
        players.map((player) =>
          player.id === updatedPlayer.id ? updatedPlayer : player
        )
      );
      setRequestStatus(REQ_STATUS.success);
    } catch (error) {
      console.error("Error updating player:", error);
      setRequestStatus(REQ_STATUS.error);
    }
  };

  const registerUser = async (username, password) => {
    try {
      setRequestStatus(REQ_STATUS.loading);
      const response = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        setUserCredentials({ username, password });
        setIsLoggedIn(true);
        setRequestStatus(REQ_STATUS.success);
      } else {
        setRequestStatus(REQ_STATUS.error);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setRequestStatus(REQ_STATUS.error);
    }
  };

  const loginUser = async (username, password) => {
    try {
      setRequestStatus(REQ_STATUS.loading);
      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      if (response.ok) {
        setUserCredentials({ username, password });
        setIsLoggedIn(true);
        setRequestStatus(REQ_STATUS.success);
      } else {
        setRequestStatus(REQ_STATUS.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setRequestStatus(REQ_STATUS.error);
    }
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setUserCredentials(null);
    setPlayers([]);
    setSelectedPlayer(null);
    setRequestStatus(REQ_STATUS.success);
  };

  return (
    <div>
      <div>
        <h2>Authentication</h2>
        <AuthUser
          isLoggedIn={isLoggedIn}
          onLogin={loginUser}
          onRegister={registerUser}
          onLogout={logoutUser}
        />
      </div>

      <div>
        <h2>Request Status</h2>
        <RequestStatus>{requestStatus}</RequestStatus>
      </div>

      {isLoggedIn && (
        <div>
          <h2>Add Player</h2>
          <AddPlayer handleSubmit={addPlayer} />
        </div>
      )}

      {isLoggedIn && (
        <div>
          <h2>List of Players</h2>
          <ListPlayers players={players} getPlayer={getPlayer} />
        </div>
      )}

      {isLoggedIn && (
        <div>
          <h2>Selected Player</h2>
          <SelectedPlayer
            player={selectedPlayer}
            handleUpdate={updatePlayer}
            handleDelete={deletePlayer}
          />
        </div>
      )}
    </div>
  );
}

export default App;
