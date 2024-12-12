<template>
  <div id="App-layout">
    <aside class="left">
      <Nav-Aside></Nav-Aside>
    </aside>
    <main>
      <header>
        <widget-mode></widget-mode>
      </header>
      <section>
        <router-view />
      </section>
    </main>
  </div>
</template>

<style scoped>
@import url("@/css/app.css");
</style>
