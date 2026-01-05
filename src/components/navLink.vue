<template>
  <router-link v-for="page in pages" :key="page.path" class="nav-link" :to="page.path">
    {{ page.label }}
  </router-link>
</template>

<script setup>
import { ref } from "vue";

const pages = ref([
  { path: "/fontfamilyviews", label: "Font Family" },
  { path: "/smartwidget", label: "Smart Widget" },
  { path: "/onlinewebsiteviews", label: "Online Website" },
  { path: "/demowebsiteviews", label: "Demo Website" },
  { path: "/format", label: "Format" },
  { path: "/waterripple", label: "Test Ripple2" },
  { path: "/timeline", label: "Timeline" },
  // Add more pages here as needed
]);
</script>
