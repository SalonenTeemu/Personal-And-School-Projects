<!-- 
  Copy paste your code from the ListPlayer.vue file here from the players_CRUD exercise of the Vue week.

  BEWARE: Only the player is passed to this component as a prop from now on. All the other data is fetched and updated in the redux store. Meaning you need to implement a method in the Pinia store that fetches the player when it is clicked and selects it as the selected player.
-->

<template>
  <li :id="'player-' + player.id" @click="handlePlayerClick" @keydown.enter="handlePlayerClick">
    <a href="#">
      {{ player.name }}
    </a>
  </li>
</template>

<script>
import { usePlayerStore } from '../pinia/playerStore';
export default {
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const store = usePlayerStore();

    const handlePlayerClick = () => {
      store.setSelectedPlayer(props.player);
      emit('player-clicked', props.player);
    };

    return {
      handlePlayerClick
    };
  }
};
</script>
