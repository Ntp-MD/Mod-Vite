<template>
  <div class="app-layout">
    <header>
      <AppHeader @toggle-menu="toggleSidebar"></AppHeader>
    </header>
    <main>
      <AppSidebar :isOpen="isOpen"></AppSidebar>
      <Dashboard></Dashboard>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppHeader from "../components/AppHeader.vue";
import AppSidebar from "../components/AppSidebar.vue";
import Dashboard from "../pages/Dashboard.vue";

const isOpen = ref(false);

function toggleSidebar() {
  isOpen.value = !isOpen.value;
}
</script>

<style>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

header {
  height: auto;
}

main {
  display: flex;
  position: relative;
  flex: 1;
  overflow: auto;
}
</style>
