<template>
  <main>
    <div class="group-items" style="display: none">
      <div class="items" v-for="n in 3">
        <h3>Lorem, ipsum dolor.</h3>
        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, magnam.</span>
      </div>
    </div>
    <div class="grid-default">
      <div class="grid-image">
        <img src="/src/assets/beach/7.jpg" alt="" />
      </div>
      <div class="grid-content">
        <h2>a vacation</h2>
        <h2>near your</h2>
        <h2>home</h2>
        <div class="grid-content-block">
          Completely remodeled and new for 2017, the new management is bringing you a Playa Pool Club facility with all the amenities and more of a private club, but without the expensive bond to join. Explore our membership options, see upcoming
          events, and view our gallery to learn more about the plans for our new facility.
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  position: relative;
  margin-bottom: 100px;
}

.grid-image {
  box-shadow: -60px 60px 0 #ffba00;
}

.grid-content {
  position: relative;
  z-index: -1;
}

.grid-content h2 {
  position: relative;
  z-index: 1;
}

.grid-content-block {
  position: relative;
  padding: 20px;
  width: 70%;
  background: var(--bg2);
  color: var(--color3);
  box-shadow: -20px 20px 0 100px var(--bg2);
}

.group-text2 {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media screen and (max-width: 992px) {
  main {
    position: relative;
    right: -30px;
  }

  .grid-image {
    box-shadow: -30px 30px 0 rgb(255, 186, 0);
  }

  .grid-content-block {
    box-shadow: -20px 20px 0 80px var(--bg2);
  }
}

@media screen and (max-width: 480px) {
  main {
    margin: 0;
    right: 0;
  }

  .grid-content {
    margin-top: 30px;
  }

  .grid-content-block {
    position: unset;
    width: 100%;
    box-shadow: unset;
    background: transparent;
    padding-left: 0;
  }
}
</style>
