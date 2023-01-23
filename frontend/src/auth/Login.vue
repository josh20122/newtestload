<template>
  <div class="main">
    <section class="dark:bg-gray-900">
      <div
        class="
          flex flex-col
          items-center
          justify-center
          px-6
          py-8
          mx-auto
          md:h-screen
          lg:py-0
        "
      >
        <a
          href="#"
          class="
            flex
            items-center
            mb-6
            text-2xl
            font-semibold
            text-gray-900
            dark:text-white
          "
        >
          <img class="w-8 h-8 mr-2" src="/assets/logo.png" alt="" />
          <span class="text-white">TestLoad</span>
        </a>
        <div
          class="
            w-full
            bg-white
            rounded-lg
            shadow
            dark:border
            md:mt-0
            sm:max-w-md
            xl:p-0
            dark:bg-gray-800 dark:border-gray-700
          "
        >
          <div class="p-6 sm:p-8">
            <h1
              class="
                text-xl
                font-bold
                leading-tight
                tracking-tight
                text-gray-900
                md:text-2xl
                dark:text-white
              "
            >
              Sign in to your account
            </h1>

            <div>
              <label for="">Username</label>

              <v-text-field
                name="name"
                outline
                density="comfortable"
                :rules="validate(rules.required, rules.length10)"
                variant="outlined"
                v-model="form.username"
                persistent-placeholder
                :error-messages="errors.username"
                placeholder="Enter your first name"
              ></v-text-field>
            </div>
            <div>
              <label for="">Password </label>
              <v-text-field
                name="name"
                outline
                density="comfortable"
                :rules="validate(rules.required, rules.length10)"
                variant="outlined"
                v-model="form.password"
                persistent-placeholder
                :error-messages="errors.password"
                placeholder="Enter your first name"
              ></v-text-field>
            </div>

            <div class="-mt-2">
              <button
                @click="submit()"
                type="submit"
                class="
                  w-full
                  text-white
                  mt-6
                  bg-blue-600
                  hover:bg-primary-700
                  focus:ring-4 focus:outline-none focus:ring-blue-500
                  font-medium
                  rounded-lg
                  text-sm
                  px-5
                  py-2.5
                  text-center
                "
              >
                Sign in
              </button>
            </div>
            <p class="text-sm pt-4 font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <router-link to="/register">
                <span
                  href="#"
                  class="
                    font-medium
                    text-primary-600
                    hover:underline
                    dark:text-primary-500
                  "
                  >Sign up</span
                >
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    validate(rule1, rule2, rule3, rule4) {
      var rules = [];
      rules.push(rule1, rule2, rule3, rule4);
      return rules;
    },
    redirect() {
      this.$router.push("/dashboard");
    },
    submit() {
      axios
        .post("/login", this.form)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          // console.log(localStorage.getItem("token"));
          this.$router.push("/test-overview");
        })
        .catch((errors) => {
          if (errors.response) {
            this.errors = errors.response.data;
          }
        });
    },
  },
  data() {
    return {
      rules: {
        email: (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Invalid email address",
        required: (v) => !!v || "This field is required",
        length10: (v) =>
          v.length <= 10 || "Name must be less than 10 characters",
      },
      errors: {},
      form: {
        email: null,
        password: null,
      },
    };
  },
};
</script>
<style>
.main {
  background-image: url("/assets/asset12.png");
}
</style>