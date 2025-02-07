<style scoped>
@import url("smo-style.css");
</style>
<template>
  <div id="Smo-App">
    <div class="smo-screen smo-login">
      <div class="smo-top">
        <img src="/src/smo-app/smo-assets/logo/logo.png" v-auto-alt />
      </div>
      <div class="smo-mid">
        <div><input type="text" name="User" id="smo-user" placeholder="Your ID" /></div>
        <div><input type="text" name="Password" id="smo-password" placeholder="Your Password" /></div>
        <div class="reset-password">Forgot your password ?</div>
      </div>
      <div class="smo-bottom">
        <router-link to=""> <button class="btn-login">Login</button></router-link>
        <router-link to="/smo-register"><button class="btn-register">Register</button></router-link>
        <router-link to="/smo-home"><button class="btn-guest">Join as guest</button></router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.smo-login img {
  object-fit: cover;
  height: auto;
  max-width: 90%;
  margin: auto;
}

.btn-guest {
  margin-top: 35px;
}
</style>
