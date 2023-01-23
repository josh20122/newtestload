<template>
    <v-dialog v-model="modal">
       <v-card max-width="360" class="mx-auto w-full">
         <v-card-text>
           <div class="flex justify-between">
             <div></div>
             <div class="text-center font-semibold">Add new card</div>
             <div @click="modal=false">&#10005</div>
           </div>
         </v-card-text>
         <v-divider></v-divider>
         <v-card-text>
           <v-form>
             <label class="text-sm" for="">Card number</label>
             <v-text-field
               name="currentEmail"
           
               placeholder="Enter card number"
               id="id"
              v-model="form.card_number"
              :error-messages="errors.card_number"

               variant="outlined" type="number" append-inner-icon="mdi-credit-card-outline"
               density="compact"
             ></v-text-field>
             <label class="text-sm" for="">Card holder name</label>
             <v-text-field
               name="currentEmail"
               v-model="form.card_holder_name"
               :error-messages="errors.card_holder_name"

               placeholder="Card holder full name"
               id="id" type="text"
               variant="outlined"
               append-inner-icon="mdi-account-circle-outline"
               density="compact"
             ></v-text-field>
             <div class=" grid grid-cols-2 gap-x-2">
                <div>
                    <label class="text-sm" for="">Date</label>
                    <v-text-field
                      name="currentEmail"

                      placeholder="MM/YY"
                      id="id" type="text"
                         
               @keyup="setDate()"
                      variant="outlined"
                      v-model="form.expiration_date"
                :error-messages="errors.expiration_date"

                      append-inner-icon="mdi-calendar-range"
                      density="compact"
                    ></v-text-field>
                </div>
                <div>
                    <div>
                    <label class="text-sm" for="">CVC/CVV</label>
                    <v-text-field
                      name="currentEmail"
                      placeholder="****"
                      v-model="form.cvv"
                :error-messages="errors.cvv"

                      id="id" type="password"
                      variant="outlined"
                      append-inner-icon="mdi-lock-outline"
                      density="compact"
                    ></v-text-field>
                </div>
                </div>
             </div>
            
           </v-form>
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
      modal: this.show,
      errors: {},
      form: {
        card_number: null,
        card_holder_name: null,
        expiration_date: null,
        cvv: null,
      },
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
    setDate() {
      if (
        String(this.form.expiration_date).length === 2 &&
        !this.form.expiration_date.includes("/")
      ) {
        console.log(this.form.expiration_date);
        this.form.expiration_date = this.form.expiration_date + "/";
      }
    },
    submit() {
      axios
        .post("/add-card", this.form)
        .then((response) => {
          this.$emit("added");
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