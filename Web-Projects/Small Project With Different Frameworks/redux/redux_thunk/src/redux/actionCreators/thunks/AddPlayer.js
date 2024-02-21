/** @format THUNK*/

import { REQ_STATUS } from "../../../../cypress/e2e/constants";
import { addPlayer } from "../playersActions";
import { clearSelectedPlayer } from "../selectedPlayerActions";
import { setStatus } from "../statusActions";

/**
 * @description thunk for posting a new player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - addPlayer-action with returned player-object
 * - clearSelectedPlayer-action with no parameters
 *
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @param {Object} newPlayer -  The player to be added
 * @return {Function} - thunk with dispatch as param
 */
export const postPlayer = (newPlayerName) => {
  return async (dispatch) => {
    dispatch(setStatus(REQ_STATUS.loading));

    try {
      const res = await fetch("http://localhost:3001/api/players", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({ name: newPlayerName }),
      });
      const data = await res.json();
      dispatch(setStatus(REQ_STATUS.success));
      dispatch(addPlayer(data));
      dispatch(clearSelectedPlayer());
    } catch {
      dispatch(setStatus(REQ_STATUS.error));
    }
  };
};
