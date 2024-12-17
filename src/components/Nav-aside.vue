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
      <router-link class="nav-link" to="/ChatGPTComponent"><img src="@img/icons/copy.png" alt="" />page</router-link>
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

<style scoped>
#App-layout {
  position: relative;
  display: grid;
  grid-template-columns: clamp(220px, 18vw, 300px) auto;
  height: 100%;
}

aside {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  background: var(--main-white);
  z-index: 1;
}

#aside {
  visibility: hidden;
  cursor: pointer;
}

/*Nav Aside*/
.nav-aside {
  display: flex;
  flex-direction: column;
  gap: 2vw;
  padding: 20px;
  min-width: 60%;
  height: 100vb;
}

.nav-logo {
  display: grid;
  position: relative;
  height: 10vw;
  width: 8vw;
  margin: 0 auto;
  overflow: hidden;
}

.nav-logo img {
  object-fit: cover;
}

body.dark-mode .nav-logo img {
  content: url("@img/weather/night.png");
}

.nav-menu {
  display: flex;
  flex-direction: column;
}

.nav-aside span {
  font-size: 12px;
  text-transform: uppercase;
  color: var(--font-color2);
  margin-bottom: 15px;
}

a.nav-link {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 12px 15px;
  border-radius: 7px;
  font-weight: 500;
  width: auto;
}

a.nav-link:hover {
  background: var(--main-color);
  color: #fff;
}

a.nav-link img {
  aspect-ratio: 1;
  width: 20px;
  filter: contrast(0.3);
}

a.nav-link:hover img {
  filter: invert(1);
}

/*Nav Aside*/

@media screen and (max-width: 440px) {
  #App-layout {
    display: flex;
    flex-direction: column;
  }

  .nav-logo {
    display: none;
  }

  .nav-aside span {
    display: none;
  }

  .nav-aside {
    width: fit-content;
    padding: 15px;
    background: var(--main-white);
  }

  #aside {
    visibility: visible;
    padding: 10px;
    border-radius: 8px;
    width: 40px;
    aspect-ratio: 1;
  }

  #aside img {
    width: 100%;
    filter: invert(1);
  }

  aside {
    position: fixed;
    top: 50px;
    left: -120%;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    transition: 0.8s;
  }

  aside.open {
    position: fixed;
    left: 0;
  }
}
</style>
