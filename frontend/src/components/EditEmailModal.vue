<template>
   <!-- Email Modal -->

   <v-dialog v-model="modal">
      <v-card max-width="360" class="mx-auto w-full">
        <v-card-text>
          <div class="flex justify-between">
            <div></div>
            <div class="text-center font-semibold">Edit email address</div>
            <div @click="modal=false">&#10005</div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>

            <label class="text-sm" for="">Current email address </label>
            <v-text-field
              name="currentEmail"
              placeholder="Current Email"
              id="id"
              :model-value="form.current_email"
              :error-messages="errors.current_email"

              disabled 
              variant="outlined"
              prepend-inner-icon="mdi-email-outline"
              density="compact"
            ></v-text-field>
            <label class="text-sm" for="">Enter new email address</label>
            <v-text-field
              name="currentEmail"
              placeholder="Email address"
              id="id"
              v-model="form.new_email_address"
              :error-messages="errors.new_email_address"
              :rules="validate(rules.required)"
              variant="outlined"
              prepend-inner-icon="mdi-email-outline"
              density="compact"
            ></v-text-field>


            <label class="text-sm" for="">Confirm new email address</label>
            <v-text-field
              name="currentEmail"
              v-model="form.confirm_email"
              placeholder="Email address"
              :error-messages="errors.confirm_email"

              :rules="validate(rules.required)"
              id="id"
              variant="outlined"
              prepend-inner-icon="mdi-email-outline"
              density="compact"
            ></v-text-field>
            <label class="text-sm" for="">Confirm password</label>
            <v-text-field
              name="currentEmail"
              type="password"
              :error-messages="errors.password"

              v-model="form.password"
              placeholder="Enter password"
              :rules="validate(rules.required)"
              id="id"
              variant="outlined"
              prepend-inner-icon="mdi-email-outline"
              density="compact"
            ></v-text-field>
      
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <div class="flex w-full justify-end gap-x-4 py-2">
            <div>
              <v-btn color="" variant="outlined" @click="modal=false">
                <div class="normal-case font-normal text-gray-800">
                  Cancel
                </div>
              </v-btn>
            </div>
            <div>
              <v-btn color="" class="bg-secondaryBg w-fit" block @click="submit()"
              >
              <div class="normal-case font-normal">
                Save changes
              </div>
              </v-btn
              >
            </div>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: ["show", "user"],
  data() {
    return {
      modal: this.show,
      errors: {},
      form: {
        current_email: this.user.email,
        new_email_address: null,
        confirm_email: null,
        password: null,
      },
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
    };
  },
  watch: {
    user(value) {
      this.form.current_email = value.email;
    },
    show(value) {
      this.modal = value;
    },
    modal(value) {
      if (value == false) {
        this.$emit("close");
      }
    },
  },

  mounted() {},

  methods: {
    submit() {
      axios.post("/email-change", this.form).catch((errors) => {
        if (errors.response.status === 302) {
          this.errors = errors.response.data;
        } else {
          this.$router.push("/login");
        }
      });
    },
    validate(rule1, rule2, rule3, rule4) {
      var rules = [];
      rules.push(rule1, rule2, rule3, rule4);
      return rules;
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>