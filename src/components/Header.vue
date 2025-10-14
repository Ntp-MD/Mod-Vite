<template>
  <div class="nav_header" ref="navheaderRef">
    <navAside ref="navMobileRef" :class="{ open: isOpen }"> </navAside>
    <ThemeSwitch></ThemeSwitch>
    <button @click="handleLogout" class="logout-btn">Logout</button>
    <div class="nav_backdrop" ref="navMobileRef" :class="{ open: isOpen }" @click="toggleMenu"></div>
    <div class="nav_button" ref="nav_buttonRef" @click="toggleMenu">
      <div class="nav_icon">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const isOpen = ref(false);
const navMobileRef = ref(null);
const nav_buttonRef = ref(null);
const navheaderRef = ref(null);

// ...existing code...

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<style scoped>
.nav_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  position: relative;
  background: var(--sub-color2);
  border-bottom: 1px solid var(--border-color);
  height: 50px;
}

.nav_backdrop {
  position: absolute;
  top: 50px;
  right: 0;
  background: #000;
  display: none;
  width: 100%;
  height: 100vh;
  z-index: -1;
  opacity: 0.6;
}

.nav_backdrop.open {
  display: block;
}

.nav_button {
  position: relative;
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

@media screen and (min-width: 1201px) {
  .nav_header > div {
    display: none;
  }
}
</style>
