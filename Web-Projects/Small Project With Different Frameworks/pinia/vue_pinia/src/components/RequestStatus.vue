<!-- 
  Copy paste your code from the RequestStatus.vue file here from the players_CRUD exercise of the Vue week.

  BEWARE: No slots are passed to this component from now on. Instead, all the needed data is fetched from the Pinia store. Therefore, use it to get the request status from the store.
 -->

 <template>
  <div><b>Request status:</b></div>
  <div :id="statusId">{{ status }}</div>
</template>

<script>
import { usePlayerStore } from '../pinia/playerStore';
import { computed } from 'vue';

export default {
  props: {
    statusId: {
      type: String,
      default: "request-status",
    },
  },
  setup() {
    const store = usePlayerStore();
    const status = computed(() => store.getReqStatus);

    return {
      status
    };
  }
};
</script>