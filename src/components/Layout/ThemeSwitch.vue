<template>
  <div id="toggleTheme" @click="settings.toggleTheme">
    <div class="toggle-swap">
      <div class="dark">
        <img src="@/assets/icon/moon.png" alt="dark" />
      </div>
      <div class="light">
        <img src="@/assets/icon/sun.png" alt="light" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSettingsStore } from "@/stores/theme.js";
const settings = useSettingsStore();
</script>

<style>
#toggleTheme {
  display: flex;
  border: 1px solid var(--border-color);
  border-radius: 30px;
  height: 30px;
  width: 70px;
  background: var(--main-color3);
  cursor: pointer;
  overflow: hidden;
}

.toggle-swap {
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  position: relative;
  height: 60px;
  aspect-ratio: 1;
  margin: auto;
}

.toggle-swap > div {
  height: 50%;
  overflow: hidden;
}

.light {
  transform: rotate(180deg);
}

.light-mode .toggle-swap {
  transform: rotate(180deg);
}

.light-mode {
  --main-color1: #fff;
  --main-color2: #fff;
  --main-color3: #fff;
  --font-color: #222;
  --border-color: #bbbbbb;
}
</style>
