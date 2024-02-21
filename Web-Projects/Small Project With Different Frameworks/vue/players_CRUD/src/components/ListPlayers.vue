<!-- 
  Copy paste your code from the ListPlayer.vue file here from the previous exercise. No changes are needed if you managed to get the component to work properly in the previous exercise.
 -->

 <template>
  <div>
    <ul id="players-list">
      <ListPlayer
        v-for="player in players"
        :key="player.id"
        :player="player"
        @player-clicked="handlePlayerClicked"
      />
    </ul>
  </div>
</template>

<script>
import ListPlayer from './ListPlayer.vue';

export default {
  props: {
    getPlayer: Function,
    players: Array,
  },
  components: {
    ListPlayer,
  },
  methods: {
    handlePlayerClicked(playerId) {
      // Call the getPlayer prop function with the id of the clicked player
      this.getPlayer(playerId);
    },
  },
};
</script>