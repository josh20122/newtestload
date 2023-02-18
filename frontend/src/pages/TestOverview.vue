<template>
  <user-navigation>
    <template #test-manager-nav>
      <all-tests-nav-bar
        @delete="deleted = true"
        :showDeleteButton="checkCount > 0 ? true : false"
        :deleteItems="deleteItems"
      ></all-tests-nav-bar>
    </template>
    <test-list-table
      :delete-now="deleted"
      @addDeleteItem="setDeleteItems"
    ></test-list-table>
  </user-navigation>
</template>

<script>
import UserNavigation from "@/components/UserNavigation.vue";
import AllTestsNavBar from "@/components/AllTestsNavBar.vue";
import TestListTable from "@/components/TestListTable.vue";
export default {
  data() {
    return {
      checkCount: 0,
      deleted: false,
      deleteItems: [],
    };
  },
  components: {
    UserNavigation,
    AllTestsNavBar,
    TestListTable,
  },
  methods: {
    setDelete() {
      this.deleted = true;
      this.deleted = false;
    },
    setDeleteItems(items) {
      this.checkCount = items.length;
      this.deleteItems = items;
    },
  },
};
</script>

<style
  >
</style>
