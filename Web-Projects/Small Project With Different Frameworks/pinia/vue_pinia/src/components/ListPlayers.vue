<!-- 

  Copy paste your code from the ListPlayers.vue file here from the players_CRUD exercise of the Vue week.

  BEWARE: No props are passed to this component from now on. Instead, all the needed data is fetched and updated in the Pinia store. Therefore, use it to get the players array from the store.
 -->
 <template>
  <p><b>List of players:</b></p>
  <ul id ="players-list">
    <ListPlayer
      v-for="player in players"
      :key="player.id"
      :player="player"
      @player-clicked="handlePlayerClicked"
    />
  </ul>
</template>

<script>
import { usePlayerStore } from '../pinia/playerStore';
import ListPlayer from "./ListPlayer.vue";
import { computed } from 'vue'

export default {
  components: {
    ListPlayer
  },
  setup() {
    const store = usePlayerStore();

    const handlePlayerClicked = (player) => {
      store.fetchPlayer(player.id);
    };

    const players = computed(() => store.getPlayers);

    return {
      players,
      handlePlayerClicked 
    };
  }
};
</script>
