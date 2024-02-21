import { defineStore } from "pinia";
import { REQ_STATUS } from "../../cypress/e2e/constants";

/**
 * This is the store for the players. It will be used to manage the state of the players and the requests to the server.
 * The store will have the following state:
 * - players: an array of players
 * - selectedPlayer: the player selected to be updated
 * - reqStatus: the status of the request to the server
 * - playersURL: the URL of the players API
 *
 * DO NOT MODIFY THE STATE. State names are required to be the same as mentioned above to pass the tests.
 *
 * The names of the getters, actions and mutations are up to you.
 */

export const usePlayerStore = defineStore("playerStore", {
  state: () => ({
    players: [],
    selectedPlayer: null,
    reqStatus: REQ_STATUS.loading,
    playersURL: "http://localhost:3001/api/players",
  }),
  getters: {
    getSelectedPlayer: (state) => state.selectedPlayer,
    getURL: (state) => state.playersURL,
    getReqStatus: (state) => state.reqStatus,
    getPlayers: (state) => state.players
  },
  actions: {
    setReqStatus(status) {
      this.reqStatus = status;
    },
    setSelectedPlayer(player) {
      this.selectedPlayer = player;
    },
    setPlayers(players) {
      this.players = players;
    },

    async fetchPlayers() {
      try {
        this.setReqStatus(REQ_STATUS.loading);

        const response = await fetch(this.getURL);
        const data = await response.json();
        console.log(data);
        this.setPlayers(data);
        this.setReqStatus(REQ_STATUS.success);
      } catch (error) {
        console.error(error);
        this.setReqStatus(REQ_STATUS.error);
      }
    },

    async fetchPlayer(playerId) {
      try {
        this.setReqStatus(REQ_STATUS.loading);

        const response = await fetch(`${this.getURL}/${playerId}`);
        const data = await response.json();

        this.setSelectedPlayer(data);
        this.setReqStatus(REQ_STATUS.success);
      } catch (error) {
        console.error(error);
        this.setReqStatus(REQ_STATUS.error);
      }
    },

    async addPlayer(playerName) {
      const newPlayer = {name: playerName, isActive: false};
      try {
        this.setReqStatus(REQ_STATUS.loading);

        const response = await fetch(this.getURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPlayer),
        });

        if (response.ok) {
          await this.fetchPlayers();
        }
      } catch (error) {
        console.error(error);
        this.setReqStatus(REQ_STATUS.error);
      }
    },

    async deleteSelectedPlayer() {
      try {
        this.setReqStatus(REQ_STATUS.loading);

        const response = await fetch(`${this.getURL}/${this.selectedPlayer.id}`, {
          method: 'DELETE',
        });
      
        if (response.ok) {
          this.setSelectedPlayer(null);
          await this.fetchPlayers();
        }
      } catch (error) {
        console.error(error);
        this.setReqStatus(REQ_STATUS.error);
      }
    },

    async updateSelectedPlayer(status) {
      const player = this.selectedPlayer;
      player.isActive = status;
      try {
        this.setReqStatus(REQ_STATUS.loading);

        const response = await fetch(`${this.getURL}/${player.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(player),
        });

        if (response.ok) {
          await this.fetchPlayers();
        }
      } catch (error) {
        console.error(error);
        this.setReqStatus(REQ_STATUS.error);
      }
    },
  },
});

