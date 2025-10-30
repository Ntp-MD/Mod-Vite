<template>
  <div class="nav_button" ref="nav_buttonRef" @click="toggleMenu">
    <div class="nav_icon">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <aside :class="{ open: isOpen }">
    <div class="nav-top">Welcome</div>
    <div class="nav-mid">
      <router-link class="nav-link" to="/">Dashboard</router-link>
      <router-link class="nav-link" to="/SmartWidget">Smart Widget</router-link>
      <router-link class="nav-link" to="/OnlineWebsiteView">Online Website</router-link>
      <router-link class="nav-link" to="/DemoWebsiteView">Demo Website</router-link>
      <router-link class="nav-link" to="/FontFamilyPage">Font Family</router-link>
      <router-link class="nav-link" to="/SlidePause">Slide Pause</router-link>
      <router-link class="nav-link" to="/Map">World Map</router-link>
    </div>
    <div class="nav-bottom">
      <div id="bangkok-time">{{ bangkokTime }}</div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onBeforeUnmount } from "vue";

const navMobileRef = ref(null);
const nav_buttonRef = ref(null);
const isOpen = ref(false);
const bangkokTime = ref("");

function updateBangkokTime() {
  const options = {
    timeZone: "Asia/Bangkok",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    year: "numeric",
    day: "numeric",
    month: "long",
  };
  const now = new Date();
  bangkokTime.value = now.toLocaleTimeString("en-US", options);
}

let intervalId;

onMounted(() => {
  updateBangkokTime();
  intervalId = setInterval(updateBangkokTime, 1000);
});

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

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style>
aside {
  position: relative;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  min-width: 280px;
  max-width: 280px;
  border-right: 1px solid var(--border-color);
}

.nav-top {
  padding: var(--gap);
}

.nav-mid {
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available;
  justify-content: center;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.nav-mid a {
  padding: 15px var(--gap);
}

.nav-mid a:hover {
  background-color: var(--main-color3);
}

.nav-bottom {
  padding: var(--gap);
}

.nav_button {
  position: fixed;
  top: 0;
  right: 0;
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
}

.nav_icon {
  display: grid;
  place-content: center;
  gap: 6px;
}

.nav_icon div {
  width: 27px;
  height: 3px;
  background: var(--font-color);
}

@media screen and (max-width: 1200px) {
  aside {
    position: fixed;
    top: 50px;
    left: 0;
    transform: translateX(-100%);
    transition: 0.3s;
    background: var(--main-color1);
    height: calc(100vh - 50px);
    z-index: 1000;
  }

  aside.open {
    transform: translateX(0%);
  }
}
</style>
