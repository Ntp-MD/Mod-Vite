<template>
  <header v-if="!hideThis">
    <NavHeader />
  </header>
  <div id="AppClient">
    <router-view></router-view>
  </div>
  <footer v-if="!hideThis">
    <FooterSection />
  </footer>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavHeader from "./components/NavHeader.vue";
import FooterSection from "./components/FooterSection.vue";

const route = useRoute();

const hideThis = computed(() => ["/smo-login", "/smo-register", "/smo-home"].includes(route.path));
</script>

<style scoped>
@import url("@/css/app.css");

#AppClient {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  position: sticky;
  top: 0;
  z-index: 10;
  height: 70px;
}

footer {
  min-height: 300px;
}
</style>
