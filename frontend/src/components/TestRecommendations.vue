<template>
  <div>
    <Skeletor v-if="fetching" width="100%" height="300" class="rounded-lg" />

    <v-card flat v-else>
      <v-card-title primary-title> Recommendation </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div v-for="n in 8" :key="n">
          <accordion></accordion>
          <v-divider v-if="n != 8" class="my-4"></v-divider>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";
import Accordion from "./Accordion.vue";
export default {
  components: { Accordion, Skeletor },
  data() {
    return {
      fetching: false,
    };
  },
  methods: {
    getOverviews() {
      axios.post("/test-overview/:slug");
    },
  },
};
</script>

<style>
</style>