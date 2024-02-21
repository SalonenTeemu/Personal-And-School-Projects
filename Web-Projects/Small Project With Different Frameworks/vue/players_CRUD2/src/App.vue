<!-- 
  COPY AND PASTE THE CODE FROM THE PREVIOUS EXERCISE, BUT:
  - Beware, the template is different: AuthUser is now a child of the root div element. When copy-pasting the logic to the new template, make sure to add the AuthUser component back in. 
  - You are no longer automatically fetching the players every time the App is rendered. Instead, you should only fetch the players when the user is logged in successfully.

  What is the function of the AuthUser component in the big picture?
  - Depending on the state of the AuthUser component, the other components should be displayed or hidden (except for the RequestStatus component, which is always visible). If the user is logged in, the AddPlayer, ListPlayers, and SelectedPlayer components should be displayed. If the user is not logged in, only the AuthUser component and the RequestStatus component should be displayed.

  1. Inside the root div element, give the AuthUser the appropriate props and event listeners. It should emit the "login", "register", and "logout" events. You need to give it the "isLoggedIn" prop, which is used to determine the state of the AuthUser component. If you removed the AuthUser componenet because you overwrote the whole template with the new one, remember to add it back in.

  2. Create a method for registering a user when the AuthUser component emits the "register" event. This method should handle the logic for registering a user. After a successful registration, save the user's username and password into the App's state. 
  
  The backend uses the HTTP Basic auth, which means that the username and password as sent in base64 encoded format in the Authorization header upon every request except for the registration request. 

  The header contents should be of the following format: "Basic <base64 encoded username:password>". The username and password should be separated by a colon. The username and password should be base64 encoded. You can use the btoa() function to encode the username and password. For example, if the username is "user" and the password is "password", the header could be generated with the following code: `Basic ${window.btoa(`user:password`)}`; 

  The backend will respond with 401 if the Authorization header is missing, and with a status of 403 if the credentials are invalid. 

  After a succesful registration, the app should attempt to fetch players from the database. If it fails to fetch the players, then the user should stay logged out. If it succeeds, the user should be logged in and the app state should be updated accordingly and the players list should be displayed. Notice that separate login is not required after a successful registration, because the user is already logged in.
  
  3. Create a method for logging in when the AuthUser component emits the "login" event. This method should handle the logic for logging in a user. As described earlier, the backend does not have a separate login endpoint. Instead, the app should try to fetch players from the database with the given credentials using Basic auth. If the request is successful, the user is logged in and the app state should be updated accordingly.

  4. Create a method for logging out when the AuthUser component emits the "logout" event. This method should handle the logic for logging out a user. This method should be called when the logout event is emitted from the AuthUser component. When the user logs out, the application should be reset to its initial state (ergo, remove all data that was fetched from the database)

  HINT: Remember to add the Authorization header to every request except the user registration. 

 -->

<template>
  <div>
    <!-- Display the AuthUser component with appropriate props and event listeners -->
    <div>
      <h2>Authentication</h2>
      <AuthUser :isLoggedIn="isLoggedIn" @login="loginUser" @register="registerUser" @logout="logoutUser"></AuthUser>
    </div>

    <!-- Display the RequestStatus component with a title -->
    <div>
      <h2>Request Status</h2>
      <RequestStatus>
        <template v-slot:status>
          <div>{{ requestStatus }}</div>
        </template>
      </RequestStatus>
    </div>

    <!-- Display the AddPlayer component with a title and appropriate method (if logged in) -->
    <div v-if="isLoggedIn">
      <h2>Add Player</h2>
      <AddPlayer @add-player="addPlayer"></AddPlayer>
    </div>

    <!-- Display the ListPlayers component with a title and appropriate props (if logged in) -->
    <div v-if="isLoggedIn">
      <h2>List of Players</h2>
      <ListPlayers :getPlayer="getPlayer" :players="players"></ListPlayers>
    </div>

    <!-- Display the SelectedPlayer component with a title and appropriate prop (if logged in) -->
    <div v-if="isLoggedIn">
      <h2>Selected Player</h2>
      <SelectedPlayer :player="selectedPlayer" @delete-player="deletePlayer" @put-player="updatePlayer"></SelectedPlayer>
    </div>

  </div>
</template>

<script>
import RequestStatus from './components/RequestStatus.vue';
import ListPlayers from './components/ListPlayers.vue';
import SelectedPlayer from './components/SelectedPlayer.vue';
import AddPlayer from './components/AddPlayer.vue';
import AuthUser from './components/AuthUser.vue';

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
    AuthUser,
  },
  data() {
    return {
      players: [],
      selectedPlayer: null,
      requestStatus: REQ_STATUS.loading,
      isLoggedIn: false,
      userCredentials: null,
    };
  },
  created() {
    // Fetch players data and display it upon component creation
    if (this.isLoggedIn) {
      this.fetchAllPlayers();
    }
  },
  methods: {
    // Method to fetch all players
    async fetchAllPlayers() {
      try {
        // Set loading status
        this.requestStatus = REQ_STATUS.loading;

        const response = await fetch('http://localhost:3001/api/players', {
          headers: {
            Authorization: `Basic ${btoa(`${this.userCredentials.username}:${this.userCredentials.password}`)}`,
          },
        });

        // Make API call to fetch all players
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
        const response = await fetch(`http://localhost:3001/api/players/${playerId}`, {
          headers: {
            Authorization: `Basic ${btoa(`${this.userCredentials.username}:${this.userCredentials.password}`)}`,
          },
        });
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
            Authorization: `Basic ${btoa(`${this.userCredentials.username}:${this.userCredentials.password}`)}`,
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
          headers: {
            Authorization: `Basic ${btoa(`${this.userCredentials.username}:${this.userCredentials.password}`)}`,
          },
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
            Authorization: `Basic ${btoa(`${this.userCredentials.username}:${this.userCredentials.password}`)}`,
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

    // Method to register a new user
    async registerUser({ username, password }) {
      try {
        // Set loading status
        this.requestStatus = REQ_STATUS.loading;

        // Make API call to register a new user
        const response = await fetch('http://localhost:3001/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        // Check if registration was successful
        if (response.ok) {
          // Save user credentials in the app's state
          this.userCredentials = { username, password };
          this.isLoggedIn = true; // Update isLoggedIn state

          // Fetch players after successful registration
          await this.fetchAllPlayers();

          // Set success status
          this.requestStatus = REQ_STATUS.success;
        } else {
          // Set error status
          this.requestStatus = REQ_STATUS.error;
        }
      } catch (error) {
        // Set error status
        this.requestStatus = REQ_STATUS.error;
        console.error('Error registering user:', error);
      }
    },

    // Method to log in a user
    async loginUser({ username, password }) {
      try {
        // Set loading status
        this.requestStatus = REQ_STATUS.loading;

        // Make API call to log in a user
        const response = await fetch('http://localhost:3001/api/players', {
          headers: {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`,
          },
        });

        // Check if login was successful
        if (response.ok) {
          // Save user credentials in the app's state
          this.userCredentials = { username, password };
          this.isLoggedIn = true; // Update isLoggedIn state

          // Set success status
          this.requestStatus = REQ_STATUS.success;
        } else {
          // Set error status
          this.requestStatus = REQ_STATUS.error;
        }
      } catch (error) {
        // Set error status
        this.requestStatus = REQ_STATUS.error;
        console.error('Error logging in:', error);
      }
    },

    // Method to log out a user
    async logoutUser() {
      // Reset the application to its initial state
      this.isLoggedIn = false;
      this.userCredentials = null;
      this.players = [];
      this.selectedPlayer = null;
      this.requestStatus = REQ_STATUS.success; // Resetting status to success
    },
  },
};
</script>
