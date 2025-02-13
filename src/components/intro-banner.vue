<template>
  <div id="intro-banner">
    <div class="bg-overlay"></div>
    <div class="intro-banner-text">
      <h1>Welcome to</h1>
      <h1>your holiday</h1>

      <button>Booking now</button>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente natus labore<br />
        alias quia possimus nihil, tenetur minima hic qui obcaecati.
      </p>
    </div>
  </div>
</template>

<style scoped>
#intro-banner {
  position: relative;
  background-image: url("/src/assets/beach/0.jpg");
  background-size: 100%;
  background-position: 50% 26%;
  background-repeat: no-repeat;
  text-align: center;
  min-height: 50vw;
  color: #fff;
}

h1 {
  color: rgb(255, 255, 255, 0.8);
  line-height: 0.8;
}

p {
  color: #fff;
  font-size: 22px;
}

.bg-overlay {
  position: absolute;
  height: -webkit-fill-available;
  width: -webkit-fill-available;
  z-index: 0;
  background: rgba(0, 0, 0, 0.15);
}

.intro-banner-text {
  display: grid;
  place-content: center;
  place-items: center;
  gap: 40px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;

  z-index: 1;
}
</style>
