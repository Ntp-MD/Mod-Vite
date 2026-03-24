<template>
  <div id="App" class="app-shell">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
  import { useSettingsStore } from '~/stores/theme'

  const settings = useSettingsStore()

  onMounted(() => {
    settings.initTheme()
  })
</script>
