<template>
  <div id="NavAside">
    <div class="top">Mod.io</div>
    <div class="mid">
      <router-link class="nav-menu-link" to="/FontDisplay">Font Family</router-link>
      <router-link class="nav-menu-link" to="/OnlineTrackDisplay">Online Track</router-link>
      <router-link class="nav-menu-link" to="/PromotionTrack">Promotion Track</router-link>
      <router-link class="nav-menu-link" to="/DemoDisplay">List Demo</router-link>
      <router-link class="nav-menu-link" to="/QuickAccess">QuickAccess</router-link>
      <router-link class="nav-menu-link" to="/">Table </router-link>
      <router-link class="nav-menu-link" to="/SlidePause">Setting</router-link>
    </div>
    <div class="bottom">Version 1.0.3</div>
  </div>
</template>

<style scoped>
#NavAside {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: inherit;
}

.top {
  display: grid;
  place-items: center;
  height: 50px;
}

.mid {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: -webkit-fill-available;
  padding: var(--gap);
}

.bottom {
  display: grid;
  place-items: center;
  height: 50px;
}
</style>
