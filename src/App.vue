<template>
  <div id="App-layout">
    <aside class="left">
      <Nav-Aside></Nav-Aside>
    </aside>
    <main>
      <header>
        <button id="aside"><img src="@/assets/icons/menu.png" alt="" /></button>
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
