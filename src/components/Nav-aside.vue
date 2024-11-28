<template>
  <div class="nav-aside">
    <div class="top-aside">
      <a href="/" class="nav-logo"> </a>
    </div>
    <div class="mid-aside">
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
    <div class="bottom-aside"></div>
  </div>
</template>

<style scoped>
.nav-aside {
  display: flex;
  flex-direction: column;
  gap: 2vw;
  height: 100vh;
  padding: 2vw;
  background: var(--color2);
}

.top-aside {
}

.mid-aside {
  display: flex;
  flex-direction: column;
  gap: 3vw;
}

.top-aside {
}

.nav-logo {
  display: grid;
  background-image: url("@/assets/weather/day.png");
  background-size: 64%;
  background-repeat: no-repeat;
  background-position: 50% 0%;
  position: relative;
  width: clamp(140px, 12vw, 250px);
  aspect-ratio: 4/2;
  margin: 0 auto 2vw;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.nav-aside span {
  font-size: clamp(10px, 0.8vw, 14px);
  text-transform: uppercase;
  color: #aaa;
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
  font-size: clamp(12px, 1vw, 16px);
  color: var(--font2);
}

.nav-menu a:hover {
  color: var(--main-color2);
}

body.dark-mode .nav-logo {
  background-image: url("@/assets/weather/night.png");
}
</style>
