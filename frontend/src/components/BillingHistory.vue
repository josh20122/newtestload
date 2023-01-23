<template>
  <VCard flat>
    <v-card-title primary-title> Billing History </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <Skeletor v-if="fetching" :key="n" height="250" width="100%" />

      <div class="overflow-x-auto" v-else>
        <table class="table table-compact w-full">
          <!-- head -->
          <thead>
            <tr>
              <th class="font-semibold normal-case">Date</th>
              <th class="font-semibold normal-case">Details</th>
              <th class="font-semibold normal-case">Amount</th>
              <th class="font-semibold normal-case">Download</th>
            </tr>
          </thead>

          <tbody>
            <tr class="hover" v-for="(item, key) in history" :key="key">
              <td>{{ item.date }}</td>
              <td>{{ item.details }}</td>
              <td>${{ item.amount }}</td>
              <td
                class="text-blue-600"
                @click="
                  downloadWithAxios(
                    '/download-invoice-pdf',
                    'invoice.pdf',
                    item.id
                  )
                "
              >
                {{ item.download }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </v-card-text>
  </VCard>
</template>

<script>
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";
import axios from "axios";
export default {
  components: { Skeletor },
  data() {
    return {
      fetching: true,
      history: [],
    };
  },
  methods: {
    forceFileDownload(response, title) {
      console.log(title);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", title);
      document.body.appendChild(link);
      link.click();
    },
    downloadWithAxios(url, title, invoiceId) {
      axios
        .get(url, {
          params: {
            invoice_id: invoiceId,
          },
          headers: {
            responseType: "arraybuffer",
          },
        })
        .then((response) => {
          this.forceFileDownload(response, title);
        })
        .catch(() => console.log("error occured"));
      // axios(
      //   {
      //     method: "get",
      //     url,
      //     responseType: "arraybuffer",
      //   },
      //   { invoice_id: 2 }
      // )
      //   .then((response) => {
      //     this.forceFileDownload(response, title);
      //   })
      //   .catch(() => console.log("error occured"));
    },
    getHistory() {
      axios
        .post("/billing-history-view")
        .catch((errors) => {
          this.$router.push("/login");
          this.fetching = false;
        })
        .then((response) => {
          this.history = response.data;
          this.fetching = false;
        });
    },
  },
  mounted() {
    this.getHistory();
  },
};
</script>

<style>
</style>