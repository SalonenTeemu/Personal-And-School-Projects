/** @format */

/** @format
 * @description
 * Student instructions:
 * Copy contents for this file from the react_fetch exercise of the react week.
 *
 * BEWARE: No props are passed to this component from now on. Instead, the selectedPlayer is fetched from the redux store.

 */

import { useSelector } from "react-redux";

export const SelectedPlayer = () => {
  const selectedPlayer = useSelector((state) => state.selectedPlayer);

  if (!selectedPlayer) {
    return null;
  }

  return (
    <div id="selected-player">
      <div id="player-name">{selectedPlayer.name}</div>
      <div id="player-status">
        {selectedPlayer.isActive ? "active" : "inactive"}
      </div>
    </div>
  );
};
