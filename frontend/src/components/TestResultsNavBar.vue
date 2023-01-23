<template>
  <v-toolbar color="white">
    <v-toolbar-title>
      <div class="flex justify-between pr-4">
        <div class="inline-flex">
          <Skeletor
            v-if="fetching"
            width="100"
            height="25"
            class="rounded-lg"
          />

          <div class="font-semibold text-base" v-else>Test manager</div>
          <div class="">
            <Skeletor v-if="fetching" size="20" circle class="mx-4" />
            <v-icon color="grey-darken-3" v-else>mdi-chevron-right</v-icon>
          </div>
          <Skeletor
            v-if="fetching"
            width="170"
            height="25"
            class="rounded-lg"
          />

          <div v-else class="font-semibold text-base">Google</div>
          <div v-if="!fetching" class="font-base text-base text-gray-700 pl-2">
            (URL: www.google.com)
          </div>
        </div>

        <div class="inline-flex gap-x-3">
          <div class="md:inline-flex gap-x-3 hidden">
            <v-btn color="" class="bg-customBlue">
              <span class="normal-case font-normal">Download</span>
              <v-icon end>mdi-cloud-download-outline</v-icon>
            </v-btn>
            <v-btn color="" class="bg-grey-lighten-4 pa-0">
              <v-icon>mdi-share-variant-outline</v-icon>
            </v-btn>
          </div>
          <v-btn color="" class="bg-grey-lighten-4 pa-0">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </div>
      </div>
    </v-toolbar-title>
  </v-toolbar>
</template>
<script>
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";
export default {
  components: { Skeletor },
  data() {
    return {
      fetching: true,
    };
  },
  //
};
</script>
