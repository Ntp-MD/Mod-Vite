<template>
  <div class="u-wrapper">
    <div class="u-container">
      <div class="u-items">
        <div class="u-track">
          <div class="u-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, accusamus.</div>
        </div>
      </div>
      <div class="u-items">
        <div class="u-track"><div class="u-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, accusamus.</div></div>
      </div>
      <div class="u-items">
        <div class="u-track"><div class="u-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, accusamus.</div></div>
      </div>
      <div class="u-items">
        <div class="u-track"><div class="u-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, accusamus.</div></div>
      </div>
      <div class="u-items">
        <div class="u-track"><div class="u-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, accusamus.</div></div>
      </div>
      <div class="u-items">
        <div class="u-track"><div class="u-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, accusamus.</div></div>
      </div>
      <div class="u-items">
        <div class="u-track">
          <div class="u-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, accusamus.</div>
        </div>
      </div>
      <div class="u-items">
        <div class="u-track"><div class="u-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, accusamus.</div></div>
      </div>
      <div class="u-items">
        <div class="u-track"><div class="u-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, accusamus.</div></div>
      </div>
      <div class="u-items">
        <div class="u-track"><div class="u-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, accusamus.</div></div>
      </div>
      <div class="u-items">
        <div class="u-track"><div class="u-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, accusamus.</div></div>
      </div>
      <div class="u-items">
        <div class="u-track"><div class="u-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, accusamus.</div></div>
      </div>
    </div>
    <div class="u-curve"></div>
  </div>
</template>

<style scoped>
.u-wrapper {
  position: relative;
  display: grid;
  height: 30vw;
  width: 100%;
  border: 1px solid #fff;
}

.u-container {
  position: absolute;
  inset: 0;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 20px;
  width: 80%;
  height: 100%;
}

.u-curve {
  display: grid;
  width: 80%;
  height: 50%;
  border-top: 3px solid #fff;
  border-right: 3px solid #fff;
  border-bottom: 3px solid #fff;
  border-top-right-radius: 120px;
  border-bottom-right-radius: 120px;
  margin: auto;
}

.u-items {
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.u-items:nth-child(n + 7) {
  justify-content: flex-end;
}

.u-track::before {
  position: absolute;
  inset: 0;
  margin: auto;
  display: grid;
  content: "";
  width: 15px;
  height: 15px;
  background: #fff;
  border-radius: 50%;
}
</style>
