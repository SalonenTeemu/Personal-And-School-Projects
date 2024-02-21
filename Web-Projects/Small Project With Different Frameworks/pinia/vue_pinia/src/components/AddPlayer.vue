<!-- 
Student instructions:
 Copy contents for this file from the players_CRUD exercise of the Vue week.
 
 BEWARE: No props are passed to this component from now on. Instead, all the state is managed by pinia.
 

  Student instructions to create this component (if you did not copy it from the players_CRUD exercise of the vue week)

  1. This week, we are introducing Pinia, a state management library for Vue.js. In this component, we will use Pinia to add a new player to the players array.

  2. Create a form with an id of "submit-player" for submitting a new player. When the form is submitted, it should call a method that adds the new player's name to the playerStore.

  3. Keep the input field with an id of "input-player" where the name of the new player should be added. Optionally Add a placeholder attribute for the input.

  4. Remember to include a button with a class of "btn-add" that will submit the form when clicked.

  5. In the script section, import the `usePlayerStore` from Pinia and use it to add a new player when the form is submitted.

  While you might pass the unit tests, there may be some extra attributes or functionality that you need to add in order to get the component to work properly in the e2e tests. Please refer to the e2e tests for more details (found in cypress/e2e).

 -->

 <script>
 import { ref } from 'vue';
 import { usePlayerStore } from '../pinia/playerStore';
 
 export default {
   setup() {
     const playerName = ref('');
     const store = usePlayerStore();
 
     const submitPlayer = (event) => {
       event.preventDefault();
       store.addPlayer(playerName.value);
       playerName.value = '';
     };
 
     return {
       playerName,
       submitPlayer,
     };
   },
 };
 </script>
 
 <template>
   <form id="submit-player" @submit="submitPlayer">
     <label for="input-player"><b>Add player:</b></label>
     <input
       id="input-player"
       v-model="playerName"
       type="text"
       placeholder="Enter player name"
       required
     />
     <button class="btn-add" type="submit">Add Player</button>
   </form>
 </template>
