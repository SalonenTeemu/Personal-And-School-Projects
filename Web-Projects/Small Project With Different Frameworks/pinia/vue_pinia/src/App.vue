<!-- 
 * You can copy paste the App.vue file logic from the players-CRUD Vue-exercise to get started. In this exercise, you will be introducing pinia, which is a Vue 3 store that is inspired by Vuex. You will be using pinia to manage the state of the application.
 *
 * Since all the state will be managed by pinia, you will need to remove the state management code from the App.vue file. You will also need to remove the fetch functions from the App.vue file. The fetch functions will be moved into Pinia's store. Each action in pinia will be responsible for handling the request while keeping the application up to date with loading, success, and failure actions. You can name the action creators anything, but it is recommended to name them based on the component that will be using them.
 *
 * You can find the template file for the store in src/pinia/playerStore.js. You will need to create the actions to handle the HTTP requests, and getters to access the store data. You will also need to create the getters to get the state of the application.

 Once you are finished, the Application should still work the same way as it did before, meaning you can add, delete, and select players. The only difference is that the state will be managed by pinia.
 -->

<script>
import { defineComponent, onMounted } from 'vue';
import { usePlayerStore } from './pinia/playerStore';
import AddPlayer from './components/AddPlayer.vue';
import RequestStatus from './components/RequestStatus.vue';
import ListPlayers from './components/ListPlayers.vue';
import SelectedPlayer from './components/SelectedPlayer.vue';
import AppTitle from './AppTitle.vue';

export default defineComponent({
    setup() {
        const store = usePlayerStore();
        const players = store.players;
        const selectedPlayer = store.selectedPlayer;
        const requestStatus = store.reqStatus;
        const getPlayer = store.fetchPlayer;
        const addPlayer = store.addPlayer;
        const deletePlayer = store.deletePlayer;
        const updatePlayer = store.updatePlayer;

        onMounted(() => {
            store.fetchPlayers();
        });

        return {
            players,
            selectedPlayer,
            requestStatus,
            getPlayer,
            addPlayer,
            deletePlayer,
            updatePlayer
        };
    },
    components: { AppTitle, ListPlayers, SelectedPlayer, RequestStatus, AddPlayer }
});
</script>

<template>
  <div>
    <AppTitle/>
    <RequestStatus />
    <AddPlayer />
    <ListPlayers />
    <SelectedPlayer/>
  </div>
</template>