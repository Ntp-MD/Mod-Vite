<template>
  <div id="App-layout">
    <aside class="left">
      <Nav-Aside></Nav-Aside>
    </aside>
    <section>
      <header>
        <button>Test</button>
        <User-profile></User-profile>
      </header>
      <article>
        <router-view />
      </article>
      <footer>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, perferendis.</footer>
    </section>
  </div>
</template>

<style scoped>
@import url("@/css/app.css");
</style>
