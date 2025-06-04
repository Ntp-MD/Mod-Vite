<template>
  <div id="AppClient" :class="themeClass">
    <aside>
      <NavAside></NavAside>
    </aside>
    <main>
      <header v-if="route.meta.HideThis">
        <Header></Header>
        <div id="toggleTheme" @click="toggleTheme">
          <div class="toggle-swap">
            <img class="light" src="/src/assets/icon/sun.png" alt="" />

            <img class="dark" src="/src/assets/icon/moon.png" alt="" />
          </div>
        </div>
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
import { ref, computed } from "vue";
import NavAside from "./components/NavAside.vue";
import Header from "/src/components/Header.vue";
import Footer from "/src/components/Footer.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isDarkMode = ref(true);

const themeClass = computed(() => {
  return isDarkMode.value ? "dark-mode" : "light-mode";
});

// Function to toggle the theme
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};
</script>
