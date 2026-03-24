<template>
  <div class="bg-overlay">
    <h1>{{ error?.statusCode || 404 }}</h1>
    <p>{{ error?.message || 'Page Not Found' }}</p>
    <NuxtLink to="/">Go Home</NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number
    message: string
  }
}>()
</script>

<style scoped>
.bg-overlay {
  display: grid;
  place-content: center;
  text-align: center;
  width: 100%;
  height: 100vh;
  background: var(--color1);
  color: var(--font-color);
  gap: 10px;
}
.bg-overlay h1 {
  font-size: clamp(40px, 5vw, 80px);
}
.bg-overlay p {
  font-size: clamp(16px, 2vw, 24px);
}
.bg-overlay a {
  color: var(--primary);
  font-size: 16px;
}
</style>
