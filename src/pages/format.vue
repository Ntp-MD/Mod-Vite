<template>
  <div class="section-title">BRAND</div>
  <div class="brand-group">
    <div class="brand-items-1">
      <img src="https://www.adg.in.th/wp-content/uploads/2021/03/Brand-Artifact-2.jpg" alt="" width="100%" />
    </div>
    <div class="brand-group-sub">
      <div class="brand-items-2">
        <img src="https://www.adg.in.th/wp-content/uploads/2021/03/Brand-Baldocer-2-e1649754514265.jpg" alt="" width="100%" />
      </div>
      <div class="brand-items-3">
        <img src="https://www.adg.in.th/wp-content/uploads/2021/06/IMG_0956-scaled.jpg" alt="" width="100%" />
      </div>
    </div>
  </div>
</template>

<style>
.brand-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3vw;
  width: 100%;
  height: 100%;
  aspect-ratio: 5/4;
}

.brand-group-sub {
  display: flex;
  flex-direction: column;
  gap: 3vw;
  width: 100%;
  height: 100%;
}
</style>
