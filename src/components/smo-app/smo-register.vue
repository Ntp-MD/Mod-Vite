<style scoped>
@import url("smo-style.css");
</style>
<template>
  <div id="Smo-App">
    <div class="smo-top">
      <img src="/src/components/smo-app/smo-assets/icon/user-upload.png" v-auto-alt />
    </div>
    <div class="smo-mid">
      <div><input type="text" name="name" id="smo-user" placeholder="Firstname" /></div>
      <div><input type="text" name="surname" id="smo-password" placeholder="Surname" /></div>
      <div><input type="text" name="email" id="smo-password" placeholder="Email" /></div>
      <div class="smo-select">
        <select>
          <option value="" disabled selected>Certification Levels</option>
          <option value="">Basic Levels</option>
          <option value="">Intermediate Levels 2</option>
          <option value="">Advanced Levels 3</option>
        </select>
      </div>
    </div>
    <div class="smo-bottom">
      <router-link to="/smo-register"><button class="btn-register">Register</button></router-link>
      <router-link to="/smo-login"><button class="btn-back">Back</button></router-link>
    </div>
  </div>
</template>

<style scoped>
#Smo-App img {
  max-width: 150px;
  margin: auto;
  aspect-ratio: 1;
}
</style>
