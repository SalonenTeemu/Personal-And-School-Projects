/** @format 
 * 
 * Useful to read:
 * https://react.dev/
 * 
 * Student instructions:
 * Use the provided components to create a React app that fetches players from the provided API and displays them in a list when the App is first rendered. When a player is clicked in the list, fetch that player and display it in the selected player section. Give ListPlayer a function as its selectPlayer prop: it is used to fetch a specific player and should take a player id as its only argument. 
 * 
 * You can use the Vue exercise players_fetch as a reference and inspiration. More detailed descriptions of the components can also be found in the Vue exercises, but the components are not exactly the same.

	* REMEMBER: use the same ids, classes and attributes as in the Vue exercise in the same places to pass the tests. Remember to pass in the appropriate props to the child components.

	* BEWARE: The component props may be different from the Vue exercise and the tests will not pass if you use the wrong props.
	
  Hint: Use the provided REQ_STATUS object to update the request status when necessary. Use "loading" key for when the request is in progress, "success" key for when the request is successful, and "error" for when the request has failed. The REQ_STATUS object is now imported from the ../cypress/e2e/constants.js file and should not be modified.

*/

const url = "http://localhost:3001/api/players";
import { REQ_STATUS } from "../cypress/e2e/constants.js";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";
import { useState, useEffect } from 'react';

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
        console.error('Error fetching players:', error);
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
      console.error('Error fetching player:', error);
      setRequestStatus(REQ_STATUS.error);
    }
  };

  return (
    <div>
      <div>
        <h2>Request Status</h2>
        <RequestStatus>{requestStatus}</RequestStatus>
      </div>

      <div>
        <h2>List of Players</h2>
        <ListPlayers players={players} getPlayer={getPlayer} />
      </div>

      <div>
        <h2>Selected Player</h2>
        <SelectedPlayer player={selectedPlayer} />
      </div>
    </div>
  );
}

export default App;
