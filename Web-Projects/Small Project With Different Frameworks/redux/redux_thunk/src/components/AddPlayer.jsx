/** @format
 *
 * Student instructions:
 * Copy contents for this file from the react_redux exercise
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - postPlayer, found in src\redux\actionCreators\thunks\AddPlayer.jsx
 */

import { useState } from "react";
import { useDispatch } from "react-redux";
import { postPlayer } from "../redux/actionCreators/thunks/AddPlayer";

export const AddPlayer = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (name, e) => {
    e.preventDefault();

    dispatch(postPlayer(name));

    setName("");
  };

  return (
    <form
      id="submit-player"
      onSubmit={(e) => {
        handleSubmit(name, e);
      }}
    >
      <input
        type="text"
        id="input-player"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter player name"
      />
      <button type="submit" className="btn-add">
        Add Player
      </button>
    </form>
  );
};
