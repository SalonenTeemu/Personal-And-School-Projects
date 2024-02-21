<!-- 
  Student instructions to create this component:

  1. Create a form with an id of "submit-player" for submitting a new player. It emits an event called "add-player" with the name of the new player as a parameter when submitted.

  2. Create an input field with an id of "input-player" where the name of the new player should be added. Optionally Add a placeholder attribute for the input.

  3. Create a button with a class of "btn-add" that will submit the form when clicked.


  While you might pass the unit tests, there may be some extra attributes or functionality that you need to add in order to get the component to work properly in the e2e tests. Please refer to the e2e tests for more details (found in cypress/e2e).

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
