<template>
  <div class="nav-global">
    <router-link v-for="page in pages" :key="page.path" class="nav-link" :to="page.path">
      <span class="nav-icon">{{ page.icon }}</span>
      <span class="nav-label">{{ page.label }}</span>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";

const pages = ref([
  { path: "/fontfamilyviews", label: "Font Family", icon: "🔤" },
  { path: "/smartwidget", label: "Smart Widget", icon: "⚙️" },
  { path: "/onlinewebsiteviews", label: "Online Website", icon: "🌐" },
  { path: "/demowebsiteviews", label: "Demo Website", icon: "🎨" },
  { path: "/format", label: "Format", icon: "📝" },
  { path: "/waterripple", label: "Test Ripple", icon: "💧" },
  { path: "/timeline", label: "Timeline", icon: "📅" },
]);
</script>

<style scoped>
.nav-global {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--gap2);
  padding: 12px calc(var(--gap2) * 1.5);
  font-size: var(--font-3);
  font-weight: 500;
  color: var(--font-color);
  border-radius: var(--border-radius);
  transition: all 0.2s ease;
  text-decoration: none;
  overflow: hidden;
}

.nav-link::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: var(--primary);
  border-radius: 0 2px 2px 0;
  transition: height 0.2s ease;
}

.nav-link:hover {
  background: var(--color3);
  color: #fff;
}

.nav-link:hover::before {
  height: 60%;
}

.nav-link.router-link-active {
  background: linear-gradient(90deg, rgba(37, 99, 235, 0.15), transparent);
  color: var(--primary);
  font-weight: 600;
}

.nav-link.router-link-active::before {
  height: 70%;
  background: var(--primary);
}

.nav-link.router-link-active .nav-icon {
  transform: scale(1.1);
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: 16px;
  transition: transform 0.2s ease;
}

.nav-label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
