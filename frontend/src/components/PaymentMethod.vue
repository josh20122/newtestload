<template>
  <div>
    <v-card flat>
      <v-card-title primary-title> Payment Method </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div v-if="fetching" class="grid md:grid-cols-3 gap-y-4 gap-x-4">
          <Skeletor v-for="n in 2" :key="n" height="150" width="100%" />
        </div>
        <div class="grid md:grid-cols-3 gap-y-4 gap-x-4" v-else>
          <div
            class="border p-3 text-gray-600 rounded-md flex flex-col gap-y-4"
            v-for="(item, index) in paymentMethods"
            :key="index"
          >
            <div class="text-sm">Credit Card</div>
            <div class="inline-flex gap-x-3">
              <img class="h-6" src="/assets/mastercard.png" alt="" />
              <span class="font-bold"> {{ item.card_number }} </span>
            </div>
            <div class="justify-self-end inline-flex justify-end">
              <v-btn icon color="red-lighten-4" flat size="x-small">
                <v-icon class="" size="x-large" color="red-darken-2"
                  >mdi-trash-can-outline</v-icon
                >
              </v-btn>
            </div>
          </div>
          <div class="border p-8 text-gray-600 rounded-md grid bg-slate-200">
            <div class="grid place-items-center">
              <div class="">Add Card</div>
              <div class="">
                <v-btn
                  @click="paymentModal = true"
                  color="grey-lighten-2"
                  flat
                  size="small"
                  icon
                  class=""
                >
                  <v-icon>mdi-plus </v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <add-payment-method
      @added="getPaymentMethods()"
      @close="paymentModal = false"
      :show="paymentModal"
    ></add-payment-method>
  </div>
</template>

<script>
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";
import AddPaymentMethod from "./AddPaymentMethod.vue";
import axios from "axios";
export default {
  data() {
    return {
      paymentModal: false,
      fetching: false,
      paymentMethods: [],
    };
  },
  mounted() {
    this.getPaymentMethods();
  },
  methods: {
    getPaymentMethods() {
      this.fetching = true;
      axios.post("/payment_methods").then((response) => {
        this.paymentMethods = response.data;
        this.fetching = false;
      });
    },
  },

  components: {
    AddPaymentMethod,
    Skeletor,
  },
};
</script>

<style>
</style>
