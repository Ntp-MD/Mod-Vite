<template>
  <div class="system">
    <div class="planet"></div>
    <div class="orbit">
      <div class="object"></div>
    </div>
  </div>
</template>

<style>
.system {
  perspective: 1000px;
  transform-style: preserve-3d;
  height: 500px;
  aspect-ratio: 1;
  rotate: 15deg;
  margin: auto;
}

.planet,
.orbit,
.object {
  position: absolute;
  transform-style: preserve-3d;
  inset: 0;
  height: calc(var(--size) * 1%);
  margin: auto;
  aspect-ratio: 1;
  border-radius: 50%;
}

.planet {
  --size: 50;
  background-image: url(/src/assets/icon/earth.png);
  background-size: cover;
  animation: planet calc(var(--duration)) linear infinite;
}

.orbit {
  --size: 80;
  --duration: 6s;
  box-shadow: 0 0 0 2cqmin #5554, inset 0 0 0 2cqmin #5554;
  animation: orbit calc(var(--duration)) linear infinite;
  rotate: 1 0 0 80deg;
}

.object {
  --size: 15;
  height: calc(var(--size) * 1%);
  margin-left: calc(var(--size) * -0.5%);
  background: #000;
  animation: object calc(var(--duration)) linear infinite;
  rotate: 1 0 0 80deg;
}

@keyframes orbit {
  to {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
@keyframes object {
  to {
    transform: rotate3d(0, 1, 0, -360deg);
  }
}

@keyframes planet {
  to {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
</style>
