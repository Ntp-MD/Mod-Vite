<template>
  <div id="home-about">
    <div class="container">
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
          <p>
            Completely remodeled and new for 2017, the new management is bringing you a Playa Pool Club facility with all the amenities and more of a private club, but without the expensive bond to join. Explore our membership options, see upcoming
            events, and view our gallery to learn more about the plans for our new facility.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  position: absolute;
  left: -100px;
  bottom: -35%;
  z-index: -1;
  padding: 100px;
  width: calc(100% + 80px);
  background: var(--bg2);
  color: var(--color3);
}

.grid-image {
  box-shadow: -60px 60px 0 rgb(255, 186, 0);
}

.group-text2 {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
