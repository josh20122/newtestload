<template>
  <div class="relative w-fit h-fit">
    <img class="rounded-full h-28 w-28" alt="" :src="getImage" />
    <div class="absolute right-0 bottom-0">
      <v-avatar
        size="40"
        @click="$emit('image')"
        color="secondaryBg"
        class=""
        icon="mdi-camera-outline"
      >
      </v-avatar>
    </div>
  </div>
</template>

<script>
export default {
  props: ["image"],
  computed: {
    getImage() {
      let myImage = this.image
        ? `http://localhost:5000/${this.image}`
        : "/avatar.png";
      return myImage;
    },
  },
};
</script>

<style>
</style>