<template>
  <div id="container" class="h-full w-full">
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
          <img class="w-8 h-8 mr-2" src="/assets/logo.png" alt="logo" />
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
              Create an account
            </h1>

            <div>
              <label for="">Username</label>

              <v-text-field
                name="username"
                outline
                v-model="form.username"
                density="comfortable"
                :error-messages="errors.username"
                variant="outlined"
                :rules="validate(rules.required)"
                persistent-placeholder
                placeholder="Enter your username"
              ></v-text-field>
            </div>
            <div>
              <label for="">Email</label>
              <v-text-field
                name="email"
                outline
                v-model="form.email"
                density="comfortable"
                :error-messages="errors.email"
                variant="outlined"
                :rules="validate(rules.required, rules.email)"
                persistent-placeholder
                placeholder="Enter your email name"
              ></v-text-field>
            </div>

            <div>
              <label for="">Password</label>
              <v-text-field
                name="name"
                outline
                v-model="form.password"
                density="comfortable"
                variant="outlined"
                :error-messages="errors.password"
                persistent-placeholder
                placeholder="Enter your password"
              ></v-text-field>
            </div>
            <div>
              <label for="">Password confirmation</label>
              <v-text-field
                name="name"
                outline
                v-model="form.password_confirmation"
                :rules="validate(rules.required, rules.passwordConfirmation)"
                density="comfortable"
                :error-messages="errors.password_confirmation"
                variant="outlined"
                persistent-placeholder
                placeholder="Confirm password"
              ></v-text-field>
            </div>
            <div>
              <button
                type="submit"
                @click="submit()"
                class="
                  w-full
                  mt-6
                  text-white
                  bg-blue-500
                  hover:bg-blue-400
                  focus:ring-4 focus:outline-none focus:ring-primary-300
                  font-medium
                  rounded-lg
                  text-sm
                  px-5
                  py-2.5
                  text-center
                "
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      valid: false,
      errors: {},
      rules: {
        email: (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Invalid email address",
        required: (v) => !!v || "This field is required",
        passwordConfirmation: (v) =>
          v === this.form.password || "Password does not match",
        length10: (v) =>
          v.length <= 10 || "Name must be less than 10 characters",
      },
      firstname: null,
      form: {
        username: null,
        email: null,
        password_confirmation: null,
        password: null,
      },
    };
  },
  methods: {
    validate(rule1, rule2, rule3, rule4) {
      var rules = [];
      rules.push(rule1, rule2, rule3, rule4);
      return rules;
    },
    setErrors(errors) {
      this.errors = errors;
      return true;
    },

    submit() {
      var here = this;
      axios
        .post("/register", this.form)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", response.data.user);
          this.$router.push("/subscription");
        })
        .catch((errors) => {
          this.errors = errors.response.data;
        });
    },
  },
};
</script>

<style scoped>
#container {
  background-image: url("/assets/asset12.png");
  background-size: 100%;
  height: 100%;
}
</style>