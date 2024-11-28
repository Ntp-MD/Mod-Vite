<template>
  <div class="nav-aside">
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

<style scoped>
@import "@/css/nav-aside.css";
</style>
