<!-- 
  Useful to read:
  https://vuejs.org/guide/scaling-up/sfc.html
  https://vuejs.org/guide/essentials/conditional.html

  Student instructions:

  This component is used to display the selected player. It receives a player prop.

  Create an element with an id attribute set to "selected-player", and inside it create two more elements, one with an id attribute set to "player-name" and another with an id attribute set to "player-status"

  Display the value of the name property of the player prop inside the element with the id of "player-name" 

  Display the value of the isActive property of the player prop inside the element with the id of "player-status". If the value of the isActive property is true, display the text "active". If the value of the isActive property is false, display the text "inactive".

  Use template logic to check if the player prop is null or not. If it is null, don't render the component.
 -->

<template>
  <div v-if="player" id="selected-player">
    <div id="player-name">{{ player.name }}</div>
    <div id="player-status">
      {{ player.isActive ? 'active' : 'inactive' }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: Object,
  },
};
</script>