<!-- 
  COPY AND PASTE YOUR CODE FROM THE PREVIOUS EXERCISE HERE. Also implement the following:

  1. Create a method for adding a new player. This method should handle the logic for adding a new player to the database and updating the players array. This method should also reset the form only if the request was successful. This method should be called when the add player form is submitted.

  2. Create a method for deleting a player. This method should handle the logic for deleting a player from the database and updating the players array. This method should be called when the delete button is clicked in the SelectedPlayer component.

  3. Create a method for updating a player. This method should handle the logic for updating a player in the database and updating the players array. This method should be called when the update button is clicked in the SelectedPlayer component.
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

    <!-- Display the AddPlayer component with a title and appropriate method -->
    <div>
      <h2>Add Player</h2>
      <AddPlayer @add-player="addPlayer"></AddPlayer>
    </div>

    <!-- Display the ListPlayers component with a title and appropriate props -->
    <div>
      <h2>List of Players</h2>
      <ListPlayers :getPlayer="getPlayer" :players="players"></ListPlayers>
    </div>

    <!-- Display the SelectedPlayer component with a title and appropriate prop -->
    <div>
      <h2>Selected Player</h2>
      <SelectedPlayer
        :player="selectedPlayer"
        @delete-player="deletePlayer"
        @put-player="updatePlayer"
      ></SelectedPlayer>
    </div>

  </div>
</template>

<script>
import RequestStatus from './components/RequestStatus.vue';
import ListPlayers from './components/ListPlayers.vue';
import SelectedPlayer from './components/SelectedPlayer.vue';
import AddPlayer from './components/AddPlayer.vue';

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
    AddPlayer,
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

    // Method to add a new player
    async addPlayer(newPlayerName) {
      try {
        // Set loading status
        this.requestStatus = REQ_STATUS.loading;

        // Make API call to add a new player
        const response = await fetch('http://localhost:3001/api/players', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newPlayerName }),
        });

        const data = await response.json();

        // Update players array with the new player
        this.players.push(data);

        // Set success status
        this.requestStatus = REQ_STATUS.success;
      } catch (error) {
        // Set error status
        this.requestStatus = REQ_STATUS.error;
        console.error('Error adding player:', error);
      }
    },

    // Method to delete a player
    async deletePlayer(playerId) {
      try {
        // Set loading status
        this.requestStatus = REQ_STATUS.loading;

        // Make API call to delete a player
        await fetch(`http://localhost:3001/api/players/${playerId}`, {
          method: 'DELETE',
        });

        // Update players array by removing the deleted player
        this.players = this.players.filter((player) => player.id !== playerId);

        // Set success status
        this.requestStatus = REQ_STATUS.success;
      } catch (error) {
        // Set error status
        this.requestStatus = REQ_STATUS.error;
        console.error('Error deleting player:', error);
      }
    },

    // Method to update a player
    async updatePlayer(newPlayerState) {
      try {
        // Set loading status
        this.requestStatus = REQ_STATUS.loading;

        // Make API call to update a player
        const response = await fetch(`http://localhost:3001/api/players/${this.selectedPlayer.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isActive: newPlayerState }),
        });

        const updatedPlayer = await response.json();

        // Update players array with the updated player
        this.players = this.players.map((player) =>
          player.id === updatedPlayer.id ? updatedPlayer : player
        );

        // Set success status
        this.requestStatus = REQ_STATUS.success;
      } catch (error) {
        // Set error status
        this.requestStatus = REQ_STATUS.error;
        console.error('Error updating player:', error);
      }
    },
  },
};
</script>
