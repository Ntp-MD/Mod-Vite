<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <input v-model="username" type="text" placeholder="Username" required />
      </div>
      <div class="form-group">
        <input v-model="password" type="password" placeholder="Password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

const router = useRouter();
const authStore = useAuthStore();

const username = ref("");
const password = ref("");
const error = ref("");

const handleLogin = async () => {
  const success = authStore.login(username.value, password.value);
  if (success) {
    router.push("/");
  } else {
    error.value = "Invalid username or password";
  }
};
</script>

<style scoped>
.login-container {
  position: fixed;
  display: grid;
  place-content: center;
  width: 100%;
  height: 100%;
  margin: auto;
  background-color: var(--main-color2);
}

button {
  background: var(--main-color3);
  margin: 0 auto;
}

form {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
</style>
