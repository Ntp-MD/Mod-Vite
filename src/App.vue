<template>
  <div id="AppClient">
    <header>
      <NavHeader />
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
  <footer>
    <FooterSection />
  </footer>


</template>

<style scoped>
@import url("@/css/app.css");

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


main {
  position: relative;
  overflow: hidden;
}


footer {
  position: relative;
  min-height: 300px;
}
</style>
