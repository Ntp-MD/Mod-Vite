<template>
  <div class="layout">
    <header class="layout-header">
      <AppHeader @toggle-menu="toggleSidebar"></AppHeader>
    </header>
    <main class="layout-main">
      <AppSidebar :isOpen="isOpen" @close-sidebar="closeSidebar"></AppSidebar>
      <div class="layout-content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppHeader from "../components/app-header.vue";
import AppSidebar from "../components/app-sidebar.vue";

const isOpen = ref(false);

function toggleSidebar() {
  isOpen.value = !isOpen.value;
}

function closeSidebar() {
  isOpen.value = false;
}
</script>

<style>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.layout-header {
  background: var(--color2);
  border-bottom: 1px solid var(--border-color);
  height: auto;
}

.layout-main {
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

.layout-content {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--color1);
  height: 100%;
  padding: calc(var(--gap) * 2);
  flex: 1;
  overflow: hidden;
}

/* App Specific Styles */
</style>
