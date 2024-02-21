/** @format THUNK*/

import { REQ_STATUS } from "../../../../cypress/e2e/constants";
import { setPlayers } from "../playersActions";
import { setStatus } from "../statusActions";

/**
 * @description thunk for getting all players.
 * Whenever called, dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - setPlayers-action with response array as param
 * If Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @return {Function} - thunk with dispatch as param
 */
export const getPlayers = () => {
  return async (dispatch) => {
    dispatch(setStatus(REQ_STATUS.loading));

    try {
      const res = await fetch("http://localhost:3001/api/players", {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      dispatch(setStatus(REQ_STATUS.success));
      dispatch(setPlayers(data));
    } catch {
      dispatch(setStatus(REQ_STATUS.error));
    }
  };
};
