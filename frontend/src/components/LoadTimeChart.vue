<template>
  <div>
    <Skeletor v-if="fetching" width="100%" height="250" class="rounded-lg" />

    <VCard flat v-else>
      <v-card-title primary-title>
        Load time distribution by page views</v-card-title
      >
      <v-divider></v-divider>
      <v-card-text>
        <canvas class="myChart" id="loadTimeChart"> </canvas>
      </v-card-text>
    </VCard>
  </div>
</template>
  
  <script>
import Chart from "chart.js/auto";
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";
export default {
  components: { Skeletor },
  data() {
    return {
      fetching: false,
    };
  },
  methods: {
    drawChart() {
      if (this.fetching) {
        return false;
      }

      let ctx = document.getElementById("loadTimeChart").getContext("2d");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "0s",
            "2s",
            "4s",
            "6s",
            "8s",
            "10s",
            "12s",
            "14s",
            "16s",
            "18s",
            "20s",
            "22s+",
          ],
          datasets: [
            {
              fillColor: "red",

              label: "Series 2",
              data: [
                800, 3800, 2500, 1333, 500, 500, 500, 500, 1000, 800, 1500, 983,
              ],
              fill: true,
              borderColor: "#00abb3",
              backgroundColor: "#618ee9",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              border: {
                display: false,
              },
              grid: {
                display: false,

                drawTicks: false,
              },
            },
            y: {
              // max: 5,
            },
          },

          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              //   backgroundColor: "white",
              //   titleColor: "black",
              //   bodyColor: "black",
              xAlign: "center",
              yAlign: "bottom",
              //   borderColor: "black",
            },
          },
          tension: 0.5,
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
  },
  mounted() {
    this.drawChart();
  },
};
</script>
  
  <style>
</style>