/** @format
 *
 * @description
 * Student instructions:
 *
 * Copy contents for this file from the players_fetch exercise of the react week. There are no changes to this file otherwise
 *
 *
 *
 */

export const ListPlayer = ({ player, onClick }) => {
  const handlePlayerClick = () => {
    onClick(player.id);
  };

  return (
    <li id={`player-${player.id}`}>
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
        {player.name}
      </a>
    </li>
  );
};
