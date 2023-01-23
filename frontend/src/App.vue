<template>
  <v-app>
    <v-main class="w-full">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script >
import Home from "./pages/Home.vue";
import MySubscription from "./pages/MySubscription.vue";
import Profile from "./pages/Profile.vue";
import Settings from "./pages/Settings.vue";
import axios from "axios";
import TestOverview from "./pages/TestOverview.vue";
export default {
  components: { Home, TestOverview, Profile, MySubscription, Settings },
  watch: {
    $route() {
      this.setToken();
      this.authMiddleware();
    },
  },
  methods: {
    // userMiddleware(){

    // }
    redirectToLogin() {
      this.$router.push("/login");
    },
    setToken() {
      let AUTH_TOKEN = "Bearer " + localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    },
    authMiddleware() {
      this.setToken();
      if (
        this.$route.path !== "/" &&
        this.$route.path !== "/login" &&
        this.$route.path !== "/register" &&
        this.$route.path !== "/test"
      ) {
        axios.post("/user").catch((errors) => {
          this.redirectToLogin();
        });
      }
    },
  },
  mounted() {
    this.setToken();
    axios.defaults.baseURL = "http://localhost:5000";
    // this.authMiddleware();

    // axios.defaults.headers.post["Authorization"] =
    //  "Bearer " + localStorage.getItem("token");
    // axios.post("/profile").then((response) => {
    //   console.log(response.data);
    // });
  },
};
</script>

