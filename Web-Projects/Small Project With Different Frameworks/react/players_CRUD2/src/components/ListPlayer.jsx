/** @format
 *
 * Student instructions:
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
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
