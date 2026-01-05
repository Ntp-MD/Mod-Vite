<template>
  <div class="dashboard-wrapper">
    <nav class="flex">
      <navLink></navLink>
    </nav>
    <div class="page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import navLink from "../components/navLink.vue";
</script>

<style scoped>
.dashboard-wrapper {
  display: flex;
  flex-direction: column;
  height: calc(100% - var(--gap));
  padding: calc(var(--gap) * 2);
  flex: 1;
  overflow: hidden;
}

.dashboard-wrapper nav {
  margin-bottom: var(--gap);
}

nav.flex > a:not(:last-child) {
  border-right: 1px solid #fff;
}
</style>
