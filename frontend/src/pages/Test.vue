<template>
  <div class="post">
    <div class="post__image">
      <img v-if="post" :src="post.img" height="200" />

      <!-- A simple 200px height rect which mimics the post image  -->
      <Skeletor circle size="30" />
    </div>

    <div class="post__title">
      <template v-if="post">
        {{ post.title }}
      </template>

      <Skeletor v-else-if="isPostLoading" />
    </div>

    <div class="post__text">
      <template v-if="post">
        {{ post.text }}
      </template>

      <template v-else-if="isPostLoading">
        <!-- Creating 5 skeletons that mimics the text -->
        <Skeletor v-for="i in 5" :key="i" />
      </template>
    </div>
  </div>
</template>

<script>
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";
export default {
  components: { Skeletor },
  data() {
    return {
      isPostLoading: true,
    };
  },
};
</script>
