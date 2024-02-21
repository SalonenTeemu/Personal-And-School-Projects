<!-- 

  Useful to read: 
  - https://vuejs.org/guide/scaling-up/sfc.html
  - https://vuejs.org/guide/essentials/component-basics.html
  - https://vuejs.org/guide/components/props.html
  - https://vuejs.org/guide/components/events.html
  

  Student instructions: 

  This component is used to display a single player from the list of players.
  
  1. Create a list item with id "player-" + player's id. Example: "player-2", where 2 is the id. As a child element, add an anchor.

  2. Display the player's name as text content inside the anchor. When clicked, the anchor should send a "player-clicked" event to its parent, with the player's id as an argument. 
  
  3. Make sure the anchor will be focusable via the keyboard (for accessibility)

  e2e tests: 
  Although you might pass the unit tests, there may be some extra attributes or functionality that you need to add in order to get the component to work properly in the e2e tests. Please refer to the e2e tests for more details (found in cypress/e2e).
 -->

<template>
  <li :id="'player-' + player.id">
    <a
      href="#"
      @click.prevent="handlePlayerClick"
      @keydown.enter="handlePlayerClick"
      tabindex="0"
    >
      {{ player.name }}
    </a>
  </li>
</template>

<script>
export default {
  props: {
    player: Object,
  },
  methods: {
    handlePlayerClick() {
      // Emit a "player-clicked" event with the player's id as an argument
      this.$emit('player-clicked', this.player.id);
    },
  },
};
</script>