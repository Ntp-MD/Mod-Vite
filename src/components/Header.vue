<template>
  <div class="navHeader">
    <navAside ref="navMobileRef" :class="{ open: isOpen }"> </navAside>
    <ThemeSwitch></ThemeSwitch>
    <div class="navToggle" ref="navToggleRef" @click="toggleMenu">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const isOpen = ref(false);
const navMobileRef = ref(null);
const navToggleRef = ref(null);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function closeMenu() {
  isOpen.value = false;
}

function handleClickOutside(event) {
  if (
    isOpen.value &&
    navMobileRef.value &&
    !navMobileRef.value.contains(event.target) &&
    navToggleRef.value &&
    !navToggleRef.value.contains(event.target)
  ) {
    closeMenu();
  }
}

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>

<style scoped>
.navHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  min-height: 50px;
  position: relative;
}

.navToggle {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  right: 15px;
}

.navToggle > div {
  width: 27px;
  height: 3px;
  background: var(--font-color);
}

@media screen and (min-width: 1201px) {
  .navHeader > div {
    display: none;
  }
}

@media screen and (max-width: 1200px) {
  .navAside {
    position: fixed;
    top: 50px;
    height: calc(100% - 50px);
    width: 100%;
    padding-right: 30%;
    transform: translateX(-100%);
    transition: 0.5s;
    background: linear-gradient(to right, var(--main-color) 0, var(--main-color) 70%, rgba(0, 0, 0, 0.7) 70%, rgba(0, 0, 0, 0.7) 100%);
  }

  .navAside.open {
    transform: translateX(0%);
  }
}
</style>
