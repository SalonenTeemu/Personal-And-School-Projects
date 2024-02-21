/** @format
 *
 * Student instructions:
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */

import { useState } from "react";

export const AddPlayer = ({ handleSubmit }) => {
  const [newPlayerName, setNewPlayerName] = useState("");

  return (
    <form
      id="submit-player"
      onSubmit={(e) => {
        handleSubmit(newPlayerName, e);
        setNewPlayerName("");
      }}
    >
      <input
        type="text"
        id="input-player"
        value={newPlayerName}
        onChange={(e) => setNewPlayerName(e.target.value)}
        placeholder="Enter player name"
      />
      <button type="submit" className="btn-add">
        Add Player
      </button>
    </form>
  );
};
