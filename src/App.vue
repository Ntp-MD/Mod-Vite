<template>
  <div id="app">
    <NavHeader />
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <FooterSection />
    </footer>

  </div>
</template>

<style scoped>
<<<<<<< HEAD
@import url("@/style/app.css");
=======
@import url("@/css/app.css");

#app {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
<<<<<<< HEAD

header {
  background: #fff;
  min-height: 70px;
}

main {
  min-height: 70vh;
}

footer {
  min-height: 250px;
}
=======
>>>>>>> main
>>>>>>> a4535f5065425ddd9c4b1480f74994d658774383
</style>
