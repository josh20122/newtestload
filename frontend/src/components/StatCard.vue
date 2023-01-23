<template>
  <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
    <Skeletor
      v-show="fetching"
      v-for="n in 4"
      :key="n"
      width="100%"
      height="130px"
      class="rounded-lg"
    />

    <div
      v-for="n in 4"
      v-show="!fetching"
      :key="n"
      class="rounded-md p-3 bg-white text-sm grid gap-y-2"
    >
      <div>Active Sessions</div>
      <div class="font-bold">49</div>
      <div class="flex justify-between">
        <div>
          <div>Last 24 hour</div>
          <div>43</div>
        </div>
        <div
          :class="Math.random() > 0.5 ? 'text-red-600' : 'text-green-500'"
          class="text-green-500"
        >
          &#8593;28.88%
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";
export default {
  components: { Skeletor },
  data() {
    return {
      fetching: false,
    };
  },
};
</script>

<style>
</style>