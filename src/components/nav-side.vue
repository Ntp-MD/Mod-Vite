<template>
  <div class="nav-side">
    <a href="/" class="nav-logo"> </a>
    <div class="nav-menu">
      <span>overview</span>
      <router-link class="nav-link" to="/page1"><img src="@/assets/dashboard/home.png" alt="" />dashboard</router-link>
      <router-link class="nav-link" to="/"><img src="@/assets/dashboard/menu.png" alt="" />application</router-link>
      <router-link class="nav-link" to="/"><img src="@/assets/dashboard/copy.png" alt="" />page</router-link>
      <router-link class="nav-link" to="/"><img src="@/assets/dashboard/link.png" alt="" />embed</router-link>
      <router-link class="nav-link" to="/"><img src="@/assets/dashboard/download.png" alt="" />download</router-link>
    </div>
    <div class="nav-menu">
      <span>community</span>
      <router-link class="nav-link" to="/"><img src="@/assets/dashboard/calendar.png" alt="" />calendar</router-link>
      <router-link class="nav-link" to="/"><img src="@/assets/dashboard/contact.png" alt="" />contact</router-link>
      <router-link class="nav-link" to="/"><img src="@/assets/dashboard/international.png" alt="" />social</router-link>
    </div>
    <div class="nav-menu">
      <span>preference</span>
      <router-link class="nav-link" to="/"><img src="@/assets/dashboard/account.png" alt="" />account</router-link>
      <router-link class="nav-link" to="/"><img src="@/assets//dashboard/control.png" alt="" />setting</router-link>
      <router-link class="nav-link" to="/"><img src="@/assets/dashboard/logout.png" alt="" />sign out</router-link>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.nav-side {
  display: flex;
  flex-direction: column;
  gap: 3vw;
  height: 100vh;
  padding: 1vw 2vw 3vw;
  background: var(--color-sw2);
}

.nav-logo {
  position: relative;
  height: 140px;
  background-image: url("@/assets/weather/day.png");
  background-size: 64%;
  background-repeat: no-repeat;
  background-position: 50% 0%;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.nav-side span {
  font-size: 14px;
  text-transform: uppercase;
  color: var(--color4);
}

.nav-menu img {
  aspect-ratio: 1;
  width: 18px;
  filter: brightness(0) invert(15%) sepia(100%) saturate(6000%) hue-rotate(270deg);
}

.nav-menu a {
  display: flex;
  align-items: start;
  gap: 10px;
  font-size: 16px;
  color: var(--color-sw);
}

.nav-menu a:hover {
  color: var(--color3);
}

body.dark-mode .nav-logo {
  background-image: url("@/assets/weather/night.png");
}
</style>
