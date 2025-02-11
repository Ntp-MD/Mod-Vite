<template>
  <div id="AppClient">
    <header v-if="route.meta.HideThis">
      <Modnav />
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer v-if="route.meta.HideThis">
      <Modfooter />
    </footer>
  </div>
</template>

<script setup>
import Modnav from "@/components/Modnav.vue";
import Modfooter from "@/components/Modfooter.vue";
import { useRoute } from "vue-router";

const route = useRoute();
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
  height: clamp(50px, 5vw, 70px);
}

footer {
  min-height: 300px;
}
</style>
