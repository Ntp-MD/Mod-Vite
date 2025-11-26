<template>
  <div class="nav-header" ref="navheaderRef">
    <ThemeSwitch></ThemeSwitch>
    <button @click="handleLogout" class="logout-btn">Logout</button>
    <div class="nav-button" ref="nav_buttonRef" @click="toggleMenu">
      <div class="nav-icon">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits(["toggle-menu"]);

const router = useRouter();
const authStore = useAuthStore();
const navheaderRef = ref(null);

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

function toggleMenu() {
  emit("toggle-menu");
}
</script>

<style scoped>
.nav-header {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  position: relative;
  border-bottom: 1px solid var(--border-color);
  height: 50px;
  padding: 0 var(--gap);
}

.logout-btn {
  position: relative;
}
</style>
