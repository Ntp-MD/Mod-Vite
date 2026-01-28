<template>
  <div class="nav-header" ref="navheaderRef">
    <ThemeSwitch></ThemeSwitch>
    <div class="nav-button" ref="nav_buttonRef" @click="toggleMenu">
      <div class="nav-icon">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["toggle-menu"]);
const navheaderRef = ref(null);

function toggleMenu() {
  emit("toggle-menu");
}
</script>

<style scoped>
.nav-header {
  display: flex;
  align-items: center;
  gap: var(--gap2);
  width: 100%;
  position: relative;
  border-bottom: 1px solid var(--border-color);
  height: 50px;
  padding: 0 var(--gap);
}
</style>
