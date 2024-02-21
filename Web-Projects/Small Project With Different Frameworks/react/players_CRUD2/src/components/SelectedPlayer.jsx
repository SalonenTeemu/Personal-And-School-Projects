/** @format
 *
 * Student instructions:
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */

import { useState } from "react";

export const SelectedPlayer = ({ player, handleUpdate, handleDelete }) => {
  if (!player) {
    return null;
  }
  const [checkBoxState, setCheckBoxState] = useState(player.isActive);

  const handleCheckBoxChange = () => {
    const newActiveStatus = !checkBoxState;
    setCheckBoxState(newActiveStatus);
  };

  return (
    <div id="selected-player">
      <div id="player-id" className="player-id">
        {player.id}
      </div>
      <div id="player-name">{player.name}</div>
      <div id="player-status">
        <label id="checkbox-label">
          {checkBoxState ? "active" : "inactive"}
          <input
            type="checkbox"
            id="checkbox"
            checked={checkBoxState}
            onChange={handleCheckBoxChange}
          />
          <span className="checkmark"></span>
        </label>
      </div>
      <button
        className="btn-update"
        onClick={(e) => handleUpdate(e, player.id, checkBoxState)}
        disabled={checkBoxState === player.isActive}
      >
        Update
      </button>
      <button
        className="btn-delete"
        onClick={(e) => handleDelete(player.id, e)}
      >
        Delete
      </button>
    </div>
  );
};
