<template>
  <div class="navHeader">
    <router-link class="navHome" to="/" @click="closeMenu">Dashboard</router-link>
    <div class="navToggle" ref="navToggleRef" @click="toggleMenu">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="navMobile" ref="navMobileRef" :class="{ open: isOpen }">
      <router-link class="navLink" to="/FontDisplay" @click="closeMenu">Font Family</router-link>
      <router-link class="navLink" to="/OnlineTrackDisplay" @click="closeMenu">Online Track</router-link>
      <router-link class="navLink" to="/PromotionTrack" @click="closeMenu">Promotion Track</router-link>
      <router-link class="navLink" to="/DemoDisplay" @click="closeMenu">List Demo</router-link>
      <router-link class="navLink" to="/QuickAccess" @click="closeMenu">QuickAccess</router-link>
      <router-link class="navLink" to="/" @click="closeMenu">Table </router-link>
      <router-link class="navLink" to="/SlidePause" @click="closeMenu">Setting</router-link>
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
  padding: 0 15px;
  position: relative;
}

.navMobile {
  position: absolute;
  top: 50px;
  left: 0;
  display: flex;
  flex-direction: column;
  background: var(--ui-bg1);
  width: 80%;
  height: 100vh;
  padding: 15px;
  gap: 10px;
  transform: translateX(-100%);
  transition: 0.5s;
}

.navMobile.open {
  transform: translateX(0%);
}

.navToggle {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.navToggle > div {
  width: 27px;
  height: 3px;
  background: #fff;
}

@media screen and (max-width: 1200px) {
  .navHome {
    display: none;
  }
}
</style>
