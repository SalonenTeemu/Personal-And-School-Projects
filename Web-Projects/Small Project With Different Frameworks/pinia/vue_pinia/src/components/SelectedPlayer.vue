<!--


  Copy paste your code from the RequestStatus.vue file here from the players_CRUD exercise of the Vue week.

  BEWARE: No props are passed to this component from now on. Instead, all the needed data fetching and updating is done directly with the Pinia store. Therefore, use it to get the selected player and update/delete it.

  Instructions for creating the `SelectedPlayer` Component (If not copied from the players-CRUD Vue-exercise))

  This component is supposed to display and manage the status of the selected player.
  It is fully integrated with the Pinia store for centralized state management.

  Features:
  1. Display Player's ID:
     - Utilize an element with the class "player-id" to display the player's ID from the Pinia store.

  2. Player Status with Checkbox:
     - Within an element with the ID "player-status", include:
       a. A label with the ID "checkbox-label". This label should display "active" or "inactive" based on the player's status.
       b. A checkbox within this label with the ID "checkbox". 
          - The checkbox's checked state is bound to the player's active status (checked for active, unchecked for inactive).
          - Add a span with the class "checkmark" inside the label for styling purposes.
          - Attach a change event listener to the checkbox to handle status changes.

  3. Update Button:
     - Add a button with the class "btn-update".
     - This button should be disabled if there's no change in the player's active status.
     - On click, trigger an update to the player's active status through the Pinia store's action.

  4. Delete Button:
     - Include a button with the class "btn-delete".
     - On click, trigger the deletion of the player using the Pinia store's action


 All interactions with the player data should be managed via the Pinia store, promoting efficient and centralized state management.
-->
<script>
import { ref, watch } from 'vue';
import { usePlayerStore } from '../pinia/playerStore';

export default {
  setup() {
    const store = usePlayerStore();
    const isActive = ref(false);
    const isUpdateButtonEnabled = ref(false);

    const updatePlayer = () => {
      store.updateSelectedPlayer(isActive.value);
      isUpdateButtonEnabled.value = false;
    };

    const deletePlayer = () => {
      store.deleteSelectedPlayer(); 
    };

    const updateIsActive = () => {
      isActive.value = !isActive.value;
    };

    watch(() => store.getSelectedPlayer, (newSelectedPlayer) => {
      if (newSelectedPlayer !== null) {
        isActive.value = newSelectedPlayer.isActive;
      }
    });

    watch(isActive, (newIsActive) => {
      if (store.getSelectedPlayer !== null) {
        isUpdateButtonEnabled.value = newIsActive !== store.selectedPlayer.isActive;
      }
    });

    return {
      isActive,
      deletePlayer,
      updatePlayer,
      isUpdateButtonEnabled,
      updateIsActive,
      store
    };
  },
};
</script>

<template>
  <div v-if="store.getSelectedPlayer !== null" id="selected-player">
    <div class="player-id">{{ store.selectedPlayer.id }}</div>
    <div id="player-name">{{ store.selectedPlayer.name }}</div>
    <div id="player-status">
      <label for="checkbox" id="checkbox-label">
        <input type="checkbox" id="checkbox" :checked="isActive" @change="updateIsActive" />
        <span class="checkmark"></span>
        {{ isActive ? 'active' : 'inactive' }}
      </label>
    </div>
    <button class="btn-update" :disabled="!isUpdateButtonEnabled" @click="updatePlayer">Update</button>
    <button class="btn-delete" @click="deletePlayer">Delete</button>
  </div>
</template>