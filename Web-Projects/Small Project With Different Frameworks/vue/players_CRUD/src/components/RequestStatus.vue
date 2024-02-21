<!-- 
  Copy paste your code from the ListPlayer.vue file here from the previous exercise. No changes are needed if you managed to get the component to work properly in the previous exercise.
 -->

<template>
  <div id="request-status">
    <slot name="status"></slot>
  </div>
</template>

<script>
export default {
  props: {
    status: String,
  },
};
</script>
