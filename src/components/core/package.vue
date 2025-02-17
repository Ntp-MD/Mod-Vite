<template>
  <div class="package-content">
    <div class="package-items" v-for="n in 4">
      <div class="package-title">Lorem ipsum dolor</div>
      <div class="package-price">199$</div>
      <div class="package-details">
        <div v-for="n in 3">Lorem ipsum dolor sit amet.</div>
      </div>
      <div class="package-border"></div>
      <div class="package-details">
        <div v-for="n in 1">Lorem ipsum dolor sit amet.</div>
      </div>
      <button class="package-button">Contact</button>
    </div>
  </div>
</template>

<style>
/*package content*/
.package-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 50px;
  width: 100%;
  margin: clamp(50px, 10vw, 50px) auto;
}

.package-items {
  display: grid;
  gap: 10px;
  background: var(--main-bg);
  padding: 50px 20px 20px;
  border-radius: 12px;
  text-align: center;
}

.package-title {
  color: var(--font-color2);
  font-size: 22px;
  font-weight: 400;
}

.package-price {
  position: relative;
  color: var(--main-color);
  font-size: 44px;
  font-weight: 600;
}

.package-price:after {
  content: "Per/Month";
  display: block;
  color: var(--font-color2);
  font-size: 22px;
  font-weight: 400;
  border-bottom: 1px solid var(--main-color);
  padding-bottom: 20px;
}

.package-price-sub {
  position: relative;
}

.package-details {
  color: var(--font-color2);
}

button.package-button {
  margin: 20px auto;
}
</style>
