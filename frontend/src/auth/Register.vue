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
                pb-2
                dark:text-white
              "
            >
              Create an account
            </h1>

            <FormKit
              #default="{ value, state: { valid } }"
              type="form"
              @submit="submit"
              v-model="form"
              id="registration-example"
              :actions="false"
            >
              <FormKit
                type="text"
                name="username"
                placeholder="jane"
                label="Your username"
                help="What is your preferred username"
                validation="required"
              />
              <div class="text-xs text-red-600">{{ errors.username }}</div>

              <FormKit
                type="text"
                name="email"
                label="Your email"
                placeholder="jane@example.com"
                help="What email should we use?"
                validation="required|email"
              />
              <div class="text-xs text-red-600">{{ errors.email }}</div>

              <div class="double">
                <FormKit
                  type="password"
                  name="password"
                  label="Password"
                  validation="required|length:6|matches:/[^a-zA-Z]/"
                  :validation-messages="{
                    matches: 'Please include at least one symbol',
                  }"
                  placeholder="Your password"
                  help="Choose a password"
                />
                <FormKit
                  type="password"
                  name="password_confirm"
                  label="Confirm password"
                  placeholder="Confirm password"
                  validation="required|confirm"
                  :error="isTaken ? 'That username is already taken' : null"
                  help="Confirm your password"
                  validation-name="Taco quantity"
                />
              </div>
              <div>
                <button :disabled="!valid" class="btn bg-blue-600 w-full">
                  Register
                </button>
              </div>
            </FormKit>
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
      isTaken: true,
      errors: {},
      rules: [
        (value) => {
          if (value) return true;
          return "You must enter a first name.";
        },
      ],

      firstname: null,
      form: {},
    };
  },
  watch: {
    valid(value) {
      console.log(value);
    },
  },
  methods: {
    setErrors(errors) {
      this.errors = errors;
      return true;
    },

    submit(form) {
      console.log(form);
      form.password_confirmation = form.password_confirm;
      axios
        .post("/register", form)
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