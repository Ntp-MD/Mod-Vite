<template>
  <div class="app" :class="{ 'app--scrolled': isScrolled }">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useUiStore } from "@/stores/ui";

const route = useRoute();
const ui = useUiStore();
const isScrolled = ref(false);

function handleScroll() {
  isScrolled.value = window.scrollY > 0;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.app--scrolled {
  /* Add any scroll-specific styles here */
}
</style>
