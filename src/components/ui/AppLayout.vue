<template>
  <div class="dashboard-layout">
    <header>
      <AppHeader></AppHeader>
    </header>
    <main>
      <aside>
        <AppSidebar></AppSidebar>
      </aside>
      <section>
        <router-view></router-view>
      </section>
    </main>
  </div>
</template>

<script setup>
import AppHeader from "@/components/Layout/AppHeader.vue";
import AppSidebar from "@/components/Layout/AppSidebar.vue";
</script>

<style scoped>
main {
  display: flex;
  height: calc(100vh - 50px);
}

section {
  height: 100%;
  max-height: calc(100vh - 50px);
  width: 100%;
  padding: calc(var(--gap) * 2);
}
</style>
