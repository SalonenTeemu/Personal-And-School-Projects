/**
 * Copy paste your code from the SelectedPlayer.jsx file here from the previous exercise.
 *
 * Use similar logic as in the Vue CRUD exercise to call the "handleUpdate"
 * prop function when the update button is clickable and the user clicks it.
 * In the App.jsx, this should trigger the updating of the player in the backend.
 *
 * Likewise, add logic to call the "handleDelete" prop function when the user
 * clicks the delete button. In the App.jsx, this should trigger the deletion of the player in the backend.
 *
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
