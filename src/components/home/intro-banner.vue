<template>
  <div id="intro-banner">
    <div class="bg-overlay">
      <video src="/src/assets/video/beach2.mp4" autoplay loop muted></video>
    </div>
    <div class="intro-banner-text">
      <h1>Welcome to</h1>
      <h1>your holiday</h1>

      <button>Booking now</button>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente natus labore<br />
        alias quia possimus nihil, tenetur minima hic qui obcaecati.
      </p>
    </div>
    <div class="bg-bottom"></div>
  </div>
</template>

<style scoped>
#intro-banner {
  position: relative;
  text-align: center;
  min-height: 60vw;
  color: #fff;
  overflow: hidden;
}

.bg-bottom {
  position: absolute;
  bottom: -5px;
  height: 250px;
  width: 100%;
  background-image: url(/Mod-Vite/src/assets/images/wave-forge2.png);
  background-size: 100%;
  background-repeat: no-repeat;
  z-index: 0;
}

h1 {
  color: rgb(255, 255, 255, 0.9);
}

p {
  color: #fff;
  font-size: 22px;
}

.bg-overlay {
  position: absolute;
  top: 0;
  height: 100%;
  z-index: 0;
  filter: brightness(0.9);
}

.bg-overlay video {
  position: absolute;
  top: -70%;
}

.intro-banner-text {
  display: grid;
  place-content: center;
  place-items: center;
  gap: 40px;
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 1;
}
</style>
