<template>
  <section>
    <main>
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
    </main>
  </section>
</template>

<style scoped>
section {
  position: relative;
  top: -5vw;
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
  width: clamp(350px, 30vw, 500px);
  background: var(--bg2);
  color: var(--color3);
  box-shadow: -20px 20px 0 clamp(70px, 10vw, 100px) var(--bg2);
}

.group-text2 {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media screen and (min-width: 768px) and (max-width: 992px) {
  section {
    left: 50px;
  }

  main {
    display: grid;
    grid-template-columns: 40% auto;
  }

  .grid-image {
    box-shadow: -30px 30px 0 rgb(255, 186, 0);
  }

  .grid-content-block {
    box-shadow: -20px 20px 0 clamp(50px, 10vw, 100px) var(--bg2);
    padding-left: 0;
  }
}

@media screen and (max-width: 480px) {
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
