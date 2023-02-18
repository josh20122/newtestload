<template>
  <div class="overflow-x-auto relative rounded-lg">
    <Skeletor v-if="fetching" width="100%" height="50" class="rounded-lg" />
    <Skeletor
      v-if="fetching"
      width="100%"
      height="300"
      class="rounded-lg mt-8"
    />

    <table
      class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
      v-else
    >
      <!-- <div class="overflow-x-auto relative shadow-md rounded-lg mb-10"> -->

      <thead
        class="
          text-xs text-gray-700
          bg-white
          overflow-x-auto
          relative
          rounded-lg
          mb-10
        "
      >
        <tr class="rounded-lg overflow-hidden">
          <th scope="col" class="py-3 px-6">
            <input
              type="checkbox"
              id="testInput"
              @change="addAllItems()"
              class="
                checkbox checkbox-info
                ring-1
                text-secondaryBg
                rounded-full
              "
            />
          </th>
          <th scope="col" class="py-3 px-6">Url name</th>
          <th scope="col" class="py-3 px-6">Start date</th>
          <th scope="col" class="py-3 px-6">Total runs</th>
          <th scope="col" class="py-3 px-6 rounded-lg">Last runs</th>
        </tr>
      </thead>

      <tbody class="">
        <tr class="bg-transparent">
          <th
            scope="row"
            class="
              py-4
              px-6
              font-medium
              text-gray-900
              whitespace-nowrap
              dark:text-white
            "
          ></th>
          <td class="py-2 px-6"></td>
          <td class="py-2 px-6"></td>
          <td class="py-2 px-6"></td>
          <td class="py-2 px-6"></td>
        </tr>
        <tr v-for="item in allTests" :key="item.id" class="bg-white border-b">
          <th
            scope="row"
            class="
              font-medium
              py-3
              px-6
              text-gray-900
              whitespace-nowrap
              dark:text-white
            "
          >
            <input
              type="checkbox"
              @change="addItem(`checkbox${item.id}`)"
              :id="`checkbox${item.id}`"
              class="checkbox checkbox-info ring-1 rounded-full"
            />
          </th>
          <td class="py-3 px-6">
            <router-link :to="`/test-overview/test-data${n}`">
              {{ item.test_url }}
            </router-link>
          </td>
          <td class="py-3 px-6">{{ item.id }}</td>
          <td class="py-3 px-6">{{ item.total_runs }}</td>
          <td class="py-3 px-6">{{ item.last_run }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="bg-white pt-8 pb-28 pr-4">
            <div class="grid justify-end">
              <v-pagination
                v-model="page"
                variant="outlined"
                :length="4"
                color="grey-darken-2"
                active-color="secondaryBg"
                rounded="circle"
                size="small"
              ></v-pagination>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";
import axios from "axios";
export default {
  components: { Skeletor },
  props: ["deleteNow"],
  data() {
    return {
      chechedInputs: [],
      fetching: false,
      allTests: [],
    };
  },
  watch: {
    deleteNow(newValue) {
      if (newValue === true) {
        this.getTests();
      }
    },
  },
  mounted() {
    this.getTests();
  },
  methods: {
    emit() {
      this.$emit("addDeleteItem", this.chechedInputs);
    },
    getTests() {
      this.fetching = true;
      axios
        .post("/test-overview")
        .then((response) => {
          this.allTests = response.data;
          this.fetching = false;
        })
        .catch((errors) => {
          this.$router.push("/login");
          this.fetching = false;
        });
    },
    addAllItems() {
      var allInputs = document.querySelectorAll('[id^="checkbox"]');
      for (let x = 0; x < allInputs.length; x++) {
        this.addItem(allInputs[x].id, true);
      }
    },
    addItem(checkboxId, global) {
      let isTrue = document.getElementById(checkboxId).checked;
      let id = parseInt(checkboxId.replace("checkbox", ""));

      if (global == true) {
        if (isTrue === false) {
          document.getElementById(checkboxId).checked = true;
          this.chechedInputs.push(id);
        } else {
          document.getElementById(checkboxId).checked = false;
          let index = this.chechedInputs.indexOf(id);
          this.chechedInputs.splice(index, 1);
        }
        this.emit();
        return true;
      }

      if (isTrue === true) {
        document.getElementById(checkboxId).checked = true;
        this.chechedInputs.push(id);
      } else {
        document.getElementById(checkboxId).checked = false;
        let index = this.chechedInputs.indexOf(id);
        this.chechedInputs.splice(index, 1);
      }
      this.emit();
      return true;
    },
  },
};
</script>

<style>
</style>