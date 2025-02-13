<template>
  <div id="AppClient">
    <header v-if="route.meta.HideThis">
      <Modnav></Modnav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer v-if="route.meta.HideThis">
      <Modfooter></Modfooter>
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
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
  height: clamp(50px, 5vw, 70px);
  background: rgba(0, 0, 0, 0.5);
}

footer {
  min-height: 300px;
}

@media screen and (max-width: 992px) {
  header {
    position: relative;
    background: #fff;
  }
}
</style>
