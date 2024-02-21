<!-- 
  The Vue projects for this course are expected to be made using Single File Components (SFCs). You can get started by going through the following sections from the Vue documentation (https://vuejs.org/guide/introduction.html):
  - Getting Started
  - Essentials
  - Components In-Depth

  Once you are familiar with the basics of Vue, you can start working on the project. The project is divided into 4 parts, each with its own set of instructions. The first part is the main component of the application, the second part is the component (and its child component) that displays the list of players, and the third part is the component that displays the selected player. The fourth part is displaying the status of the request to the API.

  Student instructions:

  This is the main component of the application. It is used to fetch and store the players data upon creation, and to display the list of players and the selected player.

  1. Inside the root div element, import and add the  RequestStatus, ListPlayers, and SelectedPlayer components as child elements. Remember to pass in the appropriate props and content to the child components.

  2. Create two methods for fetching all players and fetching one specific player. The first method should handle the logic for fetching all the players and displaying them in the players array. The second method should handle the logic for fetching a specific player and relaying that specific player to the SelectedPlayer component. Use the REQ_STATUS object to display the appropriate status message when the request is loading, when it is successful, and when it fails. 
  
  The URLS for fetching all players and fetching a specific player remain the same throughout the course (http://localhost:3001/api/players, http://localhost:3001/api/players/:id). Once the backend is running, you can visit http://localhost:3001 to see the API documentation.

  3. Whenever the page is refreshed, fetch players data, store and display it.
 -->

<template>
  <div>
    <!-- Display the RequestStatus component with a title -->
    <div>
      <h2>Request Status</h2>
      <RequestStatus>
        <template v-slot:status>
          <div>{{ requestStatus }}</div>
        </template>
      </RequestStatus>
    </div>

    <!-- Display the ListPlayers component with a title and appropriate props -->
    <div>
      <h2>List of Players</h2>
      <ListPlayers :getPlayer="getPlayer" :players="players"></ListPlayers>
    </div>

    <!-- Display the SelectedPlayer component with a title and appropriate prop -->
    <div>
      <h2>Selected Player</h2>
      <SelectedPlayer :player="selectedPlayer"></SelectedPlayer>
    </div>
  </div>
</template>

<script>
import RequestStatus from './components/RequestStatus.vue';
import ListPlayers from './components/ListPlayers.vue';
import SelectedPlayer from './components/SelectedPlayer.vue';

const REQ_STATUS = {
  loading: "Loading...",
  success: "Finished!",
  error: "An error has occurred!!!",
};

export default {
  components: {
    RequestStatus,
    ListPlayers,
    SelectedPlayer,
  },
  data() {
    return {
      players: [],
      selectedPlayer: null,
      requestStatus: REQ_STATUS.loading,
    };
  },
  created() {
    // Fetch players data and display it upon component creation
    this.fetchAllPlayers();
  },
  methods: {
    // Method to fetch all players
    async fetchAllPlayers() {
      try {
        // Set loading status
        this.requestStatus = REQ_STATUS.loading;

        // Make API call to fetch all players
        const response = await fetch('http://localhost:3001/api/players');
        const data = await response.json();

        // Update players array with fetched data
        this.players = data;

        // Set success status
        this.requestStatus = REQ_STATUS.success;
      } catch (error) {
        // Set error status
        this.requestStatus = REQ_STATUS.error;
        console.error('Error fetching players:', error);
      }
    },

    // Method to fetch a specific player
    async getPlayer(playerId) {
      try {
        // Set loading status
        this.requestStatus = REQ_STATUS.loading;

        // Make API call to fetch a specific player
        const response = await fetch(`http://localhost:3001/api/players/${playerId}`);
        const data = await response.json();

        // Update selectedPlayer with fetched data
        this.selectedPlayer = data;

        // Set success status
        this.requestStatus = REQ_STATUS.success;
      } catch (error) {
        // Set error status
        this.requestStatus = REQ_STATUS.error;
        console.error('Error fetching player:', error);
      }
    },
  },
};
</script>
