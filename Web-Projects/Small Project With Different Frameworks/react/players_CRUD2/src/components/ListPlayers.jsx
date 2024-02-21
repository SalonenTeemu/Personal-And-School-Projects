/** @format
 *
 * Student instructions:
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
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
