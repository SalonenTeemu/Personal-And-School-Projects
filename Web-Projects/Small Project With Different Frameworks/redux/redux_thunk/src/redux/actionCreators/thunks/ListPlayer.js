/** @format THUNK*/

import { REQ_STATUS } from "../../../../cypress/e2e/constants";
import { setSelectedPlayer } from "../selectedPlayerActions";
import { setStatus } from "../statusActions";

/**
 * @description thunk for getting the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - setSelectedPlayer-action with player-object as param
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @param {Number | String} id - id of the player
 * @return {Function} - thunk
 */
export const getSelectedPlayer = (id) => {
  return async (dispatch) => {
    dispatch(setStatus(REQ_STATUS.loading));

    try {
      const res = await fetch(`http://localhost:3001/api/players/${id}`, {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      dispatch(setStatus(REQ_STATUS.success));
      dispatch(setSelectedPlayer(data));
    } catch {
      dispatch(setStatus(REQ_STATUS.error));
    }
  };
};
