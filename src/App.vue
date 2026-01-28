<template>
  <div id="AppClient">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useUiStore } from "@/stores/ui";

const route = useRoute();
const ui = useUiStore();

$(window).scroll(function () {
  if ($(this).scrollTop() > 0) {
    $("#AppClient").addClass("slideDown");
  } else {
    $("#AppClient").removeClass("slideDown");
  }
});
</script>

<style scoped>
#AppClient {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  font-size: var(--font-4);
}
</style>
