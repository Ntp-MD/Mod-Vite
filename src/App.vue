<template>
  <div id="AppClient">
    <header v-if="route.meta.HideThis">
      <NavHeader></NavHeader>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer v-if="route.meta.HideThis">
      <NavFooter></NavFooter>
    </footer>
  </div>
</template>

<script setup>
import NavHeader from "@/components/Header.vue";
import NavFooter from "@/components/Footer.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style scoped>
@import url("@/css/app.css");
</style>
