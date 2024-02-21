/** @format
 * Copy paste your code from the ListPlayers.jsx file here from the previous exercise
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - getPlayers, found in src\redux\actionCreators\thunks\ListPlayers.jsx
 */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListPlayer } from "./ListPlayer";
import { getPlayers } from "../redux/actionCreators/thunks/ListPlayers";

export const ListPlayers = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players);

  useEffect(() => {
    dispatch(getPlayers());
  }, [dispatch]);

  return (
    <div>
      <ul id="players-list">
        {players && players.length > 0 ? (
          players.map((player) => (
            <ListPlayer key={player.id} id={player.id} name={player.name} />
          ))
        ) : (
          <li>No players available</li>
        )}
      </ul>
    </div>
  );
};
