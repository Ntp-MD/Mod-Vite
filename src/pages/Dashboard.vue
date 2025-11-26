<template>
  <div class="dashboard-wrapper">
    <nav class="flex">
      <router-link class="nav-link" to="/fontfamilypage">Font Family</router-link>
      <router-link class="nav-link" to="/smartwidget">Smart Widget</router-link>
      <router-link class="nav-link" to="/onlinewebsiteview">Online Website</router-link>
      <router-link class="nav-link" to="/demowebsiteview">Demo Website</router-link>
      <router-link class="nav-link" to="/format">Format</router-link>
      <router-link class="nav-link" to="/waterripple">Test Ripple</router-link>
    </nav>
    <div class="page">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  display: flex;
  flex-direction: column;
  height: calc(100% - var(--gap));
  padding: calc(var(--gap) * 2);
  flex: 1;
  overflow: hidden;
}

.dashboard-wrapper nav {
  margin-bottom: var(--gap);
}

nav > a {
  display: grid;
  place-items: center;
  padding: 0 15px;
  min-height: 45px;
  background: var(--color2);
  border-radius: 10px 10px 0 0;
}
</style>
