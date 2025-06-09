<script setup>
import { getCurrentInstance } from "vue";
const { appContext } = getCurrentInstance();
const theme = appContext.config.globalProperties.$theme;
const toggleTheme = theme.toggleTheme;
const isDarkMode = theme.isDarkMode;
</script>

<template>
  <div id="toggleTheme" @click="toggleTheme">
    <div class="toggle-swap">
      <img class="light" src="/src/assets/icon/sun.png" alt="" />
      <img class="dark" src="/src/assets/icon/moon.png" alt="" />
    </div>
  </div>
</template>

<style>
#AppClient.light-mode {
  --ui-bg1: #fff;
  --ui-bg2: #fff;
  --ui-bg3: #fff;
  --ui-bg4: #fff;
  --ui-font: #222;
  --border-color: #bbbbbb;
  & img {
    filter: unset;
  }
}

#toggleTheme {
  display: flex;
  border: 1px solid var(--border-color);
  border-radius: 30px;
  height: 33px;
  width: auto;
  overflow: hidden;
  background: var(--ui-bg2);
}

.toggle-swap {
  position: relative;
  display: grid;
  place-content: center;
  place-items: center;
  gap: 3px;
  transition: 0.5s;
  width: 80px;
  user-select: none;
}

.toggle-swap img {
  position: absolute;
  aspect-ratio: 1;
  width: 30px !important;
  height: 30px !important;
  transition: 0.3s ease-in-out;
  left: 0;
  right: 0;
  margin: auto;
}

#AppClient.dark-mode img.dark {
  transform: translateX(-20px);
}

#AppClient.light-mode img.light {
  transform: translateX(-20px);
}

#AppClient.dark-mode img.light {
  transform: translateX(55px);
}

#AppClient.light-mode img.dark {
  transform: translateX(55px);
}
</style>
