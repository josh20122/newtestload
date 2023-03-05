<template>
    <!-- Email Modal -->
 
    <v-dialog v-model="modal">
       <v-card max-width="360" class="mx-auto w-full">
         <v-card-text>
           <div class="flex justify-between">
             <div></div>
             <div class="text-center font-semibold">Edit password</div>
             <div @click="modal=false">&#10005</div>
           </div>
           
         </v-card-text>
         <v-divider></v-divider>
         <v-card-text>
           <v-form>
             <label class="text-sm" for="">Current password</label>
             <v-text-field
               name="currentEmail"
               placeholder="Current password"
               id="id"
             v-model="form.current_password"
             :error-messages="errors.current_password"
               type="text"
               variant="outlined" 
               prepend-inner-icon="mdi-lock-outline"
               density="compact"
             ></v-text-field>
             <label class="text-sm" for="">New Password</label>
             <v-text-field
               name="currentEmail"
               placeholder="Enter your password"
              :error-messages="errors.new_password"
              v-model="form.new_password"
               id="id" type="password"
               variant="outlined"
               prepend-inner-icon="mdi-lock-outline"
               density="compact"
             ></v-text-field>
             <label class="text-sm" for="">Re-enter password</label>
             <v-text-field
               name="currentEmail"
               placeholder="Enter password"
              :error-messages="errors.confirm_password"
              v-model="form.confirm_password"
               id="id" type="password"
               variant="outlined"
               prepend-inner-icon="mdi-lock-outline"
               density="compact"
             ></v-text-field>           </v-form>
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
  props: ["show"],
  data() {
    return {
      errors: {},
      form: {
        current_password: null,
        new_password: null,
        confirm_password: null,
      },
      modal: this.show,
    };
  },
  watch: {
    show(value) {
      this.modal = value;
    },
    modal(value) {
      if (value == false) {
        this.$emit("close");
      }
    },
  },
  methods: {
    submit() {
      axios
        .post("/password-change", this.form)
        .then((response) => {
          this.$emit("reload");
          this.modal = false;
        })
        .catch((errors) => {
          this.errors = errors.response.data;
        });
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
 
 <style>
</style>