<!-- 
  Copy paste your code from the ListPlayer.vue file here from the previous exercise. No changes are needed if you managed to get the component to work properly in the previous exercise.
 -->

 <template>
  <form id="submit-player" @submit.prevent="submitPlayer">
    <input
      type="text"
      id="input-player"
      v-model="newPlayerName"
      placeholder="Enter player name"
    />
    <button type="submit" class="btn-add">Add Player</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      newPlayerName: '', // Data property to store the new player's name
    };
  },
  methods: {
    submitPlayer() {
      // Emit the "add-player" event with the new player's name when the form is submitted
      this.$emit('add-player', this.newPlayerName);
      // Clear the input field after submitting
      this.newPlayerName = '';
    },
  },
};
</script>