/** @format */

/** @format
 *
 * Student instructions:
 *
 * This component is used to display a list of players. It receives getPlayer and players as props.
 *
 * Create the component that you did in Vue now with React. Use provided props to handle user events. Find and replace functionality with React equivalents.
 *
 * NOTE: use the same ids, classes and html elements as you did in Vue. Refer to tests in the __tests__ folder to pass the unit tests, and to the cypress/e2e folder for the end-to-end tests.
 *
 * BEWARE: some tests do not pass if you do not handle the case where the players prop is an empty array, or null.
 *
 */

import { ListPlayer } from "./ListPlayer.jsx";

export const ListPlayers = ({ players, getPlayer }) => {
  const handlePlayerClicked = (playerId) => {
    getPlayer(playerId);
  };

  return (
    <div>
      <ul id="players-list">
        {players && players.length > 0 ? (
          players.map((player) => (
            <ListPlayer
              key={player.id}
              player={player}
              onClick={handlePlayerClicked}
            />
          ))
        ) : (
          <li>No players available</li>
        )}
      </ul>
    </div>
  );
};
