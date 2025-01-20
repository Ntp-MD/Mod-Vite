<template>
  <header>
    <NavHeader />
  </header>
  <div id="AppClient">
    <router-view></router-view>
  </div>
  <footer>
    <FooterSection />
  </footer>
</template>

<style scoped>
@import url("@/css/app.css");
@import url("@/css/font.css");

#AppClient {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

header {
  position: sticky;
  top: 0;
  z-index: 10;
}

footer {
  position: relative;
  min-height: 300px;
}
</style>
