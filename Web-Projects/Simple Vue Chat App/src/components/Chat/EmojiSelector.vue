<script setup>
import Button from "../generic/form/Button.vue";

const emit = defineEmits(["send"]);

/**
 * Sends an emoji.
 * @param {String} name
 */
function sendEmoji(name) {
  emit("send", name);
}
</script>

<template>
  <div class="emoji-selector shadow-1">
    <Button icon="shrug" @click="sendEmoji('shrug')" />
    <Button icon="octopus" @click="sendEmoji('octopus')" />
    <Button icon="mushroom" @click="sendEmoji('mushroom')" />
    <Button icon="tent" @click="sendEmoji('tent')" />
    <Button icon="fire" @click="sendEmoji('fire')" />
  </div>
</template>

<style scoped>
.emoji-selector {
  background-color: #f0f0f0; /* Updated background color */
  border-radius: 3rem; /* Adjusted border-radius for a softer look */
  padding: 0.5rem 1rem; /* Increased padding for better spacing */
  margin-bottom: 0;
  display: inline-block;
}

.emoji-selector:deep(button.button) {
  box-shadow:0.25rem; /* Adjusted button padding for consistency */
}

</style>
