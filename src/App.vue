<template>
  <header>
    <NavHeader v-if="!hideThis" />
  </header>
  <div id="AppClient">
    <router-view></router-view>
  </div>
  <footer>
    <FooterSection v-if="!hideThis" />
  </footer>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Hide NavHeader on specific pages (e.g., "/login")
const hideThis = computed(() => ["/smo-login", "/smo-register", "/smo-home"].includes(route.path));
</script>

<style scoped>
@import url("@/css/app.css");

#AppClient {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

header {
  position: sticky;
  top: 0;
  z-index: 10;
}

footer {
  position: relative;
  min-height: 300px;
}
</style>
