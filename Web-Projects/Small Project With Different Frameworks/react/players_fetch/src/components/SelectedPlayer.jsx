/** @format
 *
 * Student instructions:
 * This component is used to display the selected player. It receives a player as props.
 * 
 * Create the component that you did in Vue now with React. Use provided props to handle user events. Find and replace functionality with React equivalents.

 * NOTE: use the same ids, classes and html elements as you did in Vue. Refer to tests in the __tests__ folder to pass the unit tests, and to the cypress/e2e folder for the end-to-end tests.
 */

export const SelectedPlayer = ({ player }) => {
  if (!player) {
    return null;
  }

  return (
    <div id="selected-player">
      <div id="player-name">{player.name}</div>
      <div id="player-status">{player.isActive ? "active" : "inactive"}</div>
    </div>
  );
};
