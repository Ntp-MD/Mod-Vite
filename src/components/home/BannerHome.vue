<template>
  <div id="intro-banner">
    <div class="bg-overlay">
      <video src="/src/assets/video/beach2.mp4" autoplay loop muted></video>
    </div>
    <div class="intro-banner-text">
      <div class="for-pc">
        <h1>Welcome to</h1>
        <h1>your holiday</h1>
      </div>
      <button>Booking now</button>
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente natus labore<br />
        alias quia possimus nihil, tenetur minima hic qui obcaecati.
      </div>
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
  content: url("/src/assets/images/wave-forge2.png");
  position: absolute;
  bottom: -5px;
  height: clamp(100px, 10vw, 200px);
  width: 100%;
  z-index: 0;
}

h1,
h3 {
  color: rgb(255, 255, 255, 0.9);
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
  height: 100%;
  top: 0;
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
