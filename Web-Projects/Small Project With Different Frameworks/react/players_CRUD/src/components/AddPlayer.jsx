/** @format
 *
 * Student instructions:
 * Create a AddPlayer component similar to the AddPlayer component in the Vue exercise.
 *
 * handleSubmit is a prop function that will be called when the form is submitted.
 *
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise in the same places to pass the tests.
 *
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
