<template>
  <div class="app-layout">
    <header>
      <AppHeader @toggle-menu="toggleSidebar"></AppHeader>
    </header>
    <main>
      <AppSidebar :isOpen="isOpen"></AppSidebar>
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppHeader from "../components/AppHeader.vue";
import AppSidebar from "../components/AppSidebar.vue";

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
  background: var(--color2);
  border-bottom: 1px solid var(--border-color);
  height: auto;
}

main {
  display: flex;
  position: relative;
  overflow: auto;
  flex: 1;
}

aside {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  border-right: 1px solid var(--border-color);
  background: var(--color2);
  max-width: 250px;
}

.content-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100% - var(--gap));
  padding: calc(var(--gap) * 2);
  flex: 1;
  overflow: hidden;
}

/* App Specific Styles */
</style>
