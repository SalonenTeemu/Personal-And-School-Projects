/** @format THUNK*/

import { REQ_STATUS } from "../../../../cypress/e2e/constants";
import { removePlayer, updatePlayer } from "../playersActions";
import { clearSelectedPlayer } from "../selectedPlayerActions";
import { setStatus } from "../statusActions";

/**
 * @description thunk for deleting the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - removePlayer-action with selectedPlayer.id as param
 * - clearSelectedPlayer-action with no parameters
 *
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @return {Function} - thunk with dispatch as param
 *
 * Hint: You have to get the required details of the selected player from the store.
 */
export const deleteSelectedPlayer = () => {
  return async (dispatch, getState) => {
    dispatch(setStatus(REQ_STATUS.loading));

    const { id } = getState().selectedPlayer;

    try {
      const res = await fetch(`http://localhost:3001/api/players/${id}`, {
        method: "DELETE",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      dispatch(setStatus(REQ_STATUS.success));
      dispatch(removePlayer(data.id));
      dispatch(clearSelectedPlayer());
    } catch {
      dispatch(setStatus(REQ_STATUS.error));
    }
  };
};

/**
 * @description thunk for updating the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - updatePlayer-action with updated player as param
 * - clearSelectedPlayer-action with no parameters
 * Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @param {Boolean} updatedActivity - the new activity status of the player
 * @return {Function} - thunk with dispatch as param
 * @example
 * // returns a thunk that updates the selected player's activity status to false:
 * updateSelectedPlayer(false)
 * // returns a thunk that updates the selected player's activity status to true:
 * updateSelectedPlayer(true)
 *
 * Hint: You have to get required details of the selected player from the store.
 *
 */
export const updateSelectedPlayer = (updatedActivity) => {
  return async (dispatch, getState) => {
    dispatch(setStatus(REQ_STATUS.loading));

    const { id, name } = getState().selectedPlayer;

    try {
      const res = await fetch(`http://localhost:3001/api/players/${id}`, {
        method: "PUT",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({ isActive: updatedActivity, name: name, id: id }),
      });
      const data = await res.json();
      dispatch(setStatus(REQ_STATUS.success));
      dispatch(updatePlayer(data));
      dispatch(clearSelectedPlayer());
    } catch {
      dispatch(setStatus(REQ_STATUS.error));
    }
  };
};
