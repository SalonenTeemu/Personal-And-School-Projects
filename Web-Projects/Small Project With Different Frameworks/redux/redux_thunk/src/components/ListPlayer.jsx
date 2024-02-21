/** @format
 * Copy paste your code from the ListPlayer.jsx file here from the previous exercise
 * BEWARE: Only the player passed to this component as prop. All the other data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - getSelectedPlayer, found in src\redux\actionCreators\thunks\ListPlayer.jsx
 */
import { useDispatch } from "react-redux";
import { getSelectedPlayer } from "../redux/actionCreators/thunks/ListPlayer";

export const ListPlayer = ({ name, id }) => {
  const dispatch = useDispatch();

  const handlePlayerClick = (e) => {
    e.preventDefault();
    dispatch(getSelectedPlayer(id));
  };

  return (
    <li id={`player-${id}`}>
      <a
        href="#"
        onClick={handlePlayerClick}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handlePlayerClick();
          }
        }}
        tabIndex="0"
      >
        {name}
      </a>
    </li>
  );
};
