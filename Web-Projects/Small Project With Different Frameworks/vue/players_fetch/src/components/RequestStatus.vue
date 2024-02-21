<!-- 
  Useful to read:
  https://vuejs.org/guide/scaling-up/sfc.html
  https://vuejs.org/guide/components/slots.html
  
  Student instructions:

  This component is used to display the status of the request to the API.

  1. Create an element with an id attribute set to "request-status" and use it to display the status message. The "status" message should be passed as template content to the component, as slot named "status". 

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
