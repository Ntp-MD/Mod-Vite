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

#AppClient {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
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
