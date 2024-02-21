/** @format 
 * 
 *
  Copy paste your code from the SelectedPlayer.jsx file here from the previous exercise.

	BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.

	Here are the thunks that you can use to update the redux store:
	- deleteSelectedPlayer, found in src\redux\actionCreators\thunks\SelectedPlayer.jsx
	- updateSelectedPlayer, found in src\redux\actionCreators\thunks\SelectedPlayer.jsx

*/
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSelectedPlayer,
  updateSelectedPlayer,
} from "../redux/actionCreators/thunks/SelectedPlayer";

export const SelectedPlayer = () => {
  const selectedPlayer = useSelector((state) => state.selectedPlayer);
  const dispatch = useDispatch();
  const [checkBoxState, setCheckBoxState] = useState(
    selectedPlayer?.isActive || false
  );

  if (!selectedPlayer) {
    return null;
  }

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSelectedPlayer());
  };

  const handleUpdate = (e, updatedActivity) => {
    e.preventDefault();
    dispatch(updateSelectedPlayer(updatedActivity));
  };

  const handleCheckBoxChange = () => {
    const newActiveStatus = !checkBoxState;
    setCheckBoxState(newActiveStatus);
  };

  return (
    <div id="selected-player">
      <div id="player-id" className="player-id">
        {selectedPlayer.id}
      </div>
      <div id="player-name">{selectedPlayer.name}</div>
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
        onClick={(e) => handleUpdate(e, checkBoxState)}
        disabled={checkBoxState === selectedPlayer.isActive}
      >
        Update
      </button>
      <button className="btn-delete" onClick={(e) => handleDelete(e)}>
        Delete
      </button>
    </div>
  );
};
