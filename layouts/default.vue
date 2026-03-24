<template>
  <div class="layout-shell">
    <header class="layout-header">
      <AppHeader @toggle-menu="toggleSidebar"></AppHeader>
    </header>
    <main class="layout-main">
      <AppSidebar
        class="layout-sidebar"
        :is-open="isOpen"
        :data-open="isOpen"
        @close-sidebar="closeSidebar"
      ></AppSidebar>
      <button
        class="layout-overlay"
        :class="{ 'layout-overlay--visible': isOpen }"
        aria-label="Close sidebar"
        type="button"
        @click="closeSidebar"
      ></button>
      <section class="layout-content" aria-label="Workspace content">
        <div class="wrapper-content">
          <slot />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)

function toggleSidebar() {
  isOpen.value = !isOpen.value
}

function closeSidebar() {
  isOpen.value = false
}
</script>

<style>
.wrapper-content {
  height: stretch;
  overflow-y: auto;
}
</style>
