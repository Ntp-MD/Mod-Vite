<template>
  <div id="AppClient" :class="themeClass">
    <aside>
      <NavAside></NavAside>
    </aside>
    <main>
      <header v-if="route.meta.HideThis">
        <Header></Header>
        <ThemeSwitch></ThemeSwitch>
      </header>
      <section>
        <router-view></router-view>
      </section>
      <footer v-if="route.meta.HideThis">
        <Footer></Footer>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { getCurrentInstance } from "vue";
import NavAside from "./components/NavAside.vue";
import Header from "/src/components/Header.vue";
import Footer from "/src/components/Footer.vue";
import ThemeSwitch from "/src/components/ThemeSwitch.vue";
const { appContext } = getCurrentInstance();
const themeClass = appContext.config.globalProperties.$theme.themeClass;
const route = useRoute();
</script>
