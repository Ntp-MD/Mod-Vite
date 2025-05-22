<template>
  <div id="AppClient">
    <header v-if="route.meta.HideThis">
      <NavHeader></NavHeader>
    </header>
    <section>
      <NavAside></NavAside>
      <main>
        <NavAside></NavAside>
        <div class="display-content">
          <router-view></router-view>
        </div>
      </main>
    </section>

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
