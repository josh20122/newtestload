<template>
  <user-navigation>
    <v-card flat>
      <v-card-title primary-title> Profile information </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div class="md:px-16 md:pt-8">
          <Skeletor v-if="fetching" circle size="120" class="mx-auto mb-8" />
          <edit-profile-picture
            v-else
            :image="user.img"
            @image="onPickFile()"
            class="mx-auto mb-8"
          ></edit-profile-picture>

          <input
            type="file"
            style="display: none"
            ref="fileInput"
            accept="image/*"
            @change="onFilePicked"
          />

          <div class="grid md:grid-cols-2 gap-x-4">
            <Skeletor
              v-show="fetching"
              v-for="n in 5"
              :key="n"
              height="40"
              width="100%"
              class="mx-auto mb-8 rounded-md"
            />

            <div v-show="!fetching">
              <label for=""> First name</label>
              <v-text-field
                name="name"
                placeholder="Firstname"
                validation-value="Joshnson"
                :error-messages="errors.first_name"
                density="compact"
                v-model="form.first_name"
                variant="outlined"
                append-inner-icon="mdi-pencil-outline"
                id="id"
              ></v-text-field>
            </div>
            <div v-show="!fetching">
              <label for=""> Last name</label>
              <v-text-field
                name="name"
                v-model="form.last_name"
                placeholder="Lastname"
                validation-value="Joshnson"
                density="compact"
                :error-messages="errors.last_name"
                variant="outlined"
                append-inner-icon="mdi-pencil-outline"
                id="id"
              ></v-text-field>
            </div>

            <div v-show="!fetching">
              <label for=""> Phone number</label>
              <v-text-field
                name="name"
                placeholder="Phone number"
                validation-value="Joshnson"
                v-model="form.phone_number"
                density="compact"
                variant="outlined"
                :error-messages="errors.phone_number"
                append-inner-icon="mdi-pencil-outline"
                id="id"
              ></v-text-field>
            </div>
            <div v-show="!fetching">
              <label for=""> Location</label>
              <v-text-field
                name="name"
                v-model="form.location"
                :error-messages="errors.location"
                placeholder="Location"
                validation-value="Joshnson"
                density="compact"
                variant="outlined"
                append-inner-icon="mdi-pencil-outline"
                id="id"
              ></v-text-field>
            </div>
          </div>
          <div class="flex w-full justify-end gap-x-4 py-2">
            <div>
              <Skeletor
                v-if="fetching"
                width="90"
                height="38"
                class="mx-auto mb-8 rounded-md"
              />

              <v-btn color="" v-else variant="outlined" @click="resetForm()">
                <div class="normal-case font-normal text-gray-800">Reset</div>
              </v-btn>
            </div>
            <div>
              <Skeletor
                v-if="fetching"
                width="130"
                height="38"
                class="mx-auto mb-8 rounded-md"
              />
              <v-btn
                v-else
                color=""
                class="bg-secondaryBg w-fit"
                :disabled="processing"
                block
                flat
                @click="changeProfile()"
              >
                <div class="normal-case font-normal">Save changes</div>
              </v-btn>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </user-navigation>
</template>

<script>
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";
import UserNavigation from "@/components/UserNavigation.vue";
import EditProfilePicture from "@/components/EditProfilePicture.vue";
import axios from "axios";
export default {
  data() {
    return {
      fetching: false,
      user: {},
      processing: false,
      image: null,
      errors: {},
      form: {
        first_name: null,
        last_name: null,
        location: null,
        phone_number: null,
      },
    };
  },
  methods: {
    resetForm() {
      this.form = this.user;
    },

    getUser() {
      this.fetching = true;
      axios
        .post("/user")
        .then((response) => {
          this.fetching = false;
          this.user = response.data.user;
          this.form = response.data.user;
        })
        .catch((errors) => {
          this.$router.push("/login");
        });
    },
    changeProfile() {
      axios
        .post("/edit-profile", this.form)
        .then((response) => {})
        .catch((errors) => {
          if (errors.response.status === 302) {
            this.errors = errors.response.data;
          } else {
            this.$router.push("/login");
          }
        });
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
      this.uploadImage();
    },
    uploadImage() {
      axios
        .post(
          "/edit-image",
          { img: this.image },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          this.user.img = response.data.file_path;
          // this.getUser();
        })
        .catch((errors) => {});
    },
  },
  watch: {
    image(value) {
      this.uploadImage();
    },
  },
  mounted() {
    this.getUser();
  },
  components: { UserNavigation, EditProfilePicture, Skeletor },
};
</script>

<style>
</style>