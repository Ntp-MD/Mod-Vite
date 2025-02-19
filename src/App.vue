<template>
  <div id="AppClient">
    <header v-if="route.meta.HideThis">
      <NavHeader></NavHeader>
    </header>
    <router-view></router-view>
    <footer v-if="route.meta.HideThis">
      <NavFooter></NavFooter>
    </footer>
  </div>
</template>

<script setup>
import NavHeader from "@/components/core/NavHeader.vue";
import NavFooter from "@/components/core/NavFooter.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style scoped>
@import url("@/css/app.css");
</style>
