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
  height: clamp(50px, 5vw, 70px);
}

footer {
  min-height: 300px;
}
</style>

<template>
  <div id="AppClient">
    <header v-if="route.meta.HideThis">
      <NavHeader />
    </header>
    <router-view></router-view>
    <footer v-if="route.meta.HideThis">
      <FooterSection />
    </footer>
  </div>
</template>

<script setup>
// Use on router to hide
import { useRoute } from "vue-router";
const route = useRoute();
</script>
