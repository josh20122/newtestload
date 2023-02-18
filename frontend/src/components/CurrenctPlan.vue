<template>
  <v-card flat>
    <v-card-text class="w-full">
      <div class="grid grid-cols-2 w-full justify-between">
        <div class="flex flex-col gap-y-4">
          <Skeletor v-if="fetching" width="200" height="20" pill />
          <div class="text-gray-600" v-else>Current plan</div>
          <div class="flex w-full gap-4">
            <Skeletor v-if="fetching" width="150" height="20" pill />

            <div class="font-extrabold text-xl" v-else>Basic trial</div>
            <div>
              <Skeletor v-if="fetching" width="94" height="30" />

              <v-btn
                v-else
                color=""
                class="text-orange-darken-2 bg-orange-lighten-4"
                flat
                size="small"
              >
                <div class="normal-case">$00/month</div>
              </v-btn>
            </div>
          </div>
          <div class="space-y-1">
            <Skeletor v-if="fetching" width="50" height="20" pill />

            <div class="text-gray-600" v-else>Status</div>

            <div class="inline-flex gap-x-2">
              <!-- <span> -->
              <Skeletor v-if="fetching" size="20" circle="" />

              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="green"
                class="mt-1"
                viewBox="0 0 16 16"
              >
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                />
              </svg>
              <!-- </span> -->
              <Skeletor v-if="fetching" width="150" height="20" pill />
              <span v-else>Active</span>
            </div>
          </div>
          <div>
            <Skeletor v-if="fetching" width="250" height="20" pill />

            <span v-else class="text-gray-600">Member Since</span>
            <Skeletor
              v-if="fetching"
              class="mt-4"
              width="250"
              height="20"
              pill
            />

            <span v-else class="text-gray-800"> June 1, 2022</span>
          </div>
          <Skeletor v-if="fetching" width="250" height="20" pill />

          <div v-else>
            <span class="text-gray-600">Next billing Period on</span>
            <span class="text-gray-800"> July 1, 2022</span>
          </div>
        </div>
        <div class="flex align-end flex-col gap-y-4">
          <div class="w-fit">
            <Skeletor class="mt-4" v-if="fetching" width="100" height="30" />

            <v-btn
              v-else
              color=""
              class="bg-secondaryBg w-fit"
              block
              flat
              @click="modal = false"
            >
              <div class="normal-case font-normal">Upgrade plan</div>
            </v-btn>
          </div>
          <Skeletor class="mt-1" v-if="fetching" width="100" height="30" />

          <div class="w-fit" v-else>
            <v-btn
              color=""
              variant="outlined"
              class="w-full"
              @click="modal = false"
            >
              <div class="normal-case font-normal text-gray-800">
                Cancel subscription
              </div>
            </v-btn>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
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