/** @format
 *
 * Copy paste your code from the App.jsx file here from the previous exercise.
 *
 * Use similar logic as in the Vue CRUD exercise to create a new player in the backend when the user submits the form in the AddPlayer component.
 *
 * Likewise, add logic to update the player in the backend when the user clicks the update button in the SelectedPlayer component.
 *
 * Finally, add logic to delete the player in the backend when the user clicks the delete button in the SelectedPlayer component.
 * 
 * HINT: Before the above logic, it may be better to start by updating the SelectedPlayer component to use the new props.
 * 
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise in the same places to pass the tests. Remember to pass in the appropriate props to the child components.

 * BEWARE: The component props may be different from the Vue exercise and the tests will not pass if you use the wrong props. Look at invididual component file descriptions and tests to see what props are expected.
 *
 */

import { useState, useEffect } from "react";
import { REQ_STATUS } from "../cypress/e2e/constants.js";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";
import { AddPlayer } from "./components/AddPlayer.jsx";

const url = "http://localhost:3001/api/players";

function App() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [requestStatus, setRequestStatus] = useState(REQ_STATUS.loading);

  useEffect(() => {
    const fetchAllPlayers = async () => {
      try {
        setRequestStatus(REQ_STATUS.loading);
        const response = await fetch(url);
        const data = await response.json();
        setPlayers(data);
        setRequestStatus(REQ_STATUS.success);
      } catch (error) {
        console.error("Error fetching players:", error);
        setRequestStatus(REQ_STATUS.error);
      }
    };
    fetchAllPlayers();
  }, []);

  const getPlayer = async (playerId) => {
    try {
      setRequestStatus(REQ_STATUS.loading);
      const response = await fetch(`${url}/${playerId}`);
      const data = await response.json();
      setSelectedPlayer(data);
      setRequestStatus(REQ_STATUS.success);
    } catch (error) {
      console.error("Error fetching player:", error);
      setRequestStatus(REQ_STATUS.error);
    }
  };

  const addPlayer = async (data, e) => {
    e.preventDefault();

    setRequestStatus(REQ_STATUS.loading);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data }),
    })
      .then((res) => res.json())
      .then((data) => {
        const newPlayers = players;
        newPlayers.push(data);
        setPlayers(newPlayers);
        setRequestStatus(REQ_STATUS.success);
      })
      .catch(() => setRequestStatus(REQ_STATUS.error));
  };

  const deletePlayer = async (playerId, e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${url}/${playerId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const newPlayers = players.filter((player) => player.id !== id);
        setPlayers(newPlayers);
        setSelectedPlayer(null);
        return setRequestStatus(REQ_STATUS.success);
      }
      return setRequestStatus(REQ_STATUS.error);
    } catch {
      setRequestStatus(REQ_STATUS.error);
    }
  };

  async function updatePlayer(e, playerId, newPlayerState) {
    e.preventDefault();
    try {
      setRequestStatus(REQ_STATUS.loading);
      const response = await fetch(`${url}/${playerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
  }

  return (
    <div>
      <div>
        <h2>Request Status</h2>
        <RequestStatus>{requestStatus}</RequestStatus>
      </div>

      <div>
        <h2>Add Player</h2>
        <AddPlayer handleSubmit={addPlayer} />
      </div>

      <div>
        <h2>List of Players</h2>
        <ListPlayers players={players} getPlayer={getPlayer} />
      </div>

      <div>
        <h2>Selected Player</h2>
        <SelectedPlayer
          player={selectedPlayer}
          handleUpdate={updatePlayer}
          handleDelete={deletePlayer}
        />
      </div>
    </div>
  );
}

export default App;
