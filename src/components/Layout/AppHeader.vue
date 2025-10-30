<template>
  <div class="nav_header" ref="navheaderRef">
    <ThemeSwitch></ThemeSwitch>
    <button @click="handleLogout" class="logout-btn">Logout</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const navheaderRef = ref(null);

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
  border-bottom: 1px solid var(--border-color);
  height: 50px;
  padding: 0 var(--gap);
}

.logout-btn {
  position: relative;
  right: 40px;
}
</style>
