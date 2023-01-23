<template>
  <user-navigation>
    <v-card flat>
      <v-card-title primary-title> My Login </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div
          class="
            py-2
            inline-flex
            md:justify-start md:gap-x-16
            justify-between
            w-full
          "
        >
          <div class="md:basis-3/12">
            <Skeletor width="200" pill height="22" v-if="fetching" />

            <div v-else>Email Address</div>
            <Skeletor
              class="mt-4"
              width="150"
              pill
              height="18"
              v-if="fetching"
            />
            <div class="font-semibold" v-else>{{ user.email }}</div>
          </div>
          <div>
            <Skeletor class="mt-4" width="50" height="30" v-if="fetching" />
            <v-btn flat @click="emailDialog = true" v-else>
              <div class="text-blue">EDIT</div>
            </v-btn>
          </div>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <div
          class="
            py-2
            inline-flex
            md:justify-start md:gap-x-16
            justify-between
            w-full
          "
        >
          <div class="md:basis-3/12">
            <Skeletor width="200" pill height="22" v-if="fetching" />
            <div v-else>Password</div>
            <Skeletor
              class="mt-4"
              width="150"
              pill
              height="22"
              v-if="fetching"
            />
            <div v-else class="font-semibold">**************</div>
          </div>
          <div>
            <Skeletor class="mt-4" width="50" height="30" v-if="fetching" />

            <v-btn v-else flat @click="passwordModal = true">
              <div class="text-blue">EDIT</div>
            </v-btn>
          </div>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <div
          class="
            py-2
            inline-flex
            md:justify-start md:gap-x-16
            justify-between
            w-full
          "
        >
          <div class="md:basis-3/12">
            <Skeletor width="200" pill height="22" v-if="fetching" />

            <div v-else>Account status</div>
            <Skeletor
              class="mt-4"
              width="150"
              pill
              height="22"
              v-if="fetching"
            />
            <div v-else class="font-semibold text-green-600">Verified</div>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <edit-password-modal
      @close="passwordModal = false"
      :show="passwordModal"
    ></edit-password-modal>
    <edit-email-modal
      @close="emailDialog = false"
      :user="user"
      :show="emailDialog"
    />
  </user-navigation>
</template>
  
  <script>
import UserNavigation from "@/components/UserNavigation.vue";
import EditEmailModal from "@/components/EditEmailModal.vue";
import EditPasswordModal from "@/components/EditPasswordModal.vue";
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";
import axios from "axios";

export default {
  components: { UserNavigation, Skeletor, EditEmailModal, EditPasswordModal },
  data() {
    return {
      emailDialog: false,
      passwordModal: false,
      fetching: true,
      user: {},
    };
  },
  methods: {
    getProfile() {
      this.fetching = true;
      axios
        .post("/user")
        .then((response) => {
          console.log(response.data);
          this.user = response.data.user;
          this.fetching = false;
        })
        .catch((errors) => {
          this.$router.push("/login");
        });
    },
  },
  mounted() {
    this.getProfile();
  },
};
</script>
  
  <style>
</style>
  