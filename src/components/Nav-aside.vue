<template>
  <div class="nav-aside">
    <a href="/" class="nav-logo">
      <img class="light" src="@img/weather/day.png" alt="" />
    </a>
    <div class="nav-menu">
      <span>overview</span>
      <router-link class="nav-link" to="/"><img src="@img/icons/home.png" alt="" />Test space</router-link>
      <router-link class="nav-link" to="/Font"><img src="@img/icons/font.png" alt="" />Font Family</router-link>
      <router-link class="nav-link" to="/Embed"><img src="@img/icons/link.png" alt="" />embed</router-link>
      <router-link class="nav-link" to="/"><img src="@img/icons/copy.png" alt="" />page</router-link>
      <router-link class="nav-link" to="/"><img src="@img/icons/download.png" alt="" />download</router-link>
    </div>
    <div class="nav-menu">
      <span>community</span>
      <router-link class="nav-link" to="/"><img src="@img/icons/calendar.png" alt="" />calendar</router-link>
      <router-link class="nav-link" to="/"><img src="@img/icons/contact.png" alt="" />contact</router-link>
      <router-link class="nav-link" to="/"><img src="@img/icons/international.png" alt="" />social</router-link>
    </div>
    <div class="nav-menu">
      <span>preference</span>
      <router-link class="nav-link" to="/"><img src="@img/icons/account.png" alt="" />account</router-link>
      <router-link class="nav-link" to="/"><img src="@img//icons/control.png" alt="" />setting</router-link>
      <router-link class="nav-link" to="/"><img src="@img/icons/logout.png" alt="" />sign out</router-link>
    </div>
  </div>
</template>

<style scoped></style>
