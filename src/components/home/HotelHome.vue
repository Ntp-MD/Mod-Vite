<template>
  <section>
    <form class="hotel-filter">
      <div class="input-group">
        <div><input type="text" name="firstname" id="firstname" placeholder="Firstname" /></div>
        <div><input type="text" name="lastname" id="lastname" placeholder="Lastname" /></div>
      </div>
      <div class="input-group">
        <div><input type="text" name="email" id="email" placeholder="Email" /></div>
        <div><input type="text" name="tel" id="tel" placeholder="Tel" /></div>
      </div>
    </form>
    <div class="hotel-list">
      <div class="hotel-list-item" v-for="n in 5">
        <div class="hotel-image">
          <img src="/src/assets/beach/gallery3.jpg" alt="" />
        </div>
        <div class="hotel-content">
          <div class="hotel-name">Residence Park</div>
          <div class="hotel-title">
            <div class="hotel-price">2990 THB / Month</div>
            <div class="hotel-location">Pattaya / Chonburi</div>
          </div>
          <div class="hotel-info">
            <div class="info-icon"><img src="/src/assets/icon/bed.png" alt="" />5 <span>Room</span></div>
            <div class="info-icon"><img src="/src/assets/icon/bath.png" alt="" />2 <span>Room</span></div>
            <div class="info-icon"><img src="/src/assets/icon/kitchen.png" alt="" />1 <span>Room</span></div>
            <div class="info-icon"><img src="/src/assets/icon/pool.png" alt="" />1<span>Space</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  min-height: auto;
}

.hotel-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  font-size: 14px;
}

.hotel-list-item {
  height: fit-content;
  background: var(--bg1);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: var(--box-shadow1);
}

.hotel-image {
  width: 100%;
  height: auto;
  aspect-ratio: 4/3;
}

.hotel-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px 20px 25px;
}

.hotel-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--color4);
}

.hotel-title {
  display: grid;
  gap: 10px;
}

.hotel-title::before,
.hotel-title::after {
  content: "";
  display: block;
  height: 1px;
  width: 100%;
  background: #ddd;
  margin: 5px 0;
}

.hotel-price {
  font-size: 16px;
}

.hotel-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.info-icon {
  display: grid;
  grid-template-columns: 25px 20px auto;
  align-items: center;
  gap: 10px;
}

span {
  margin: 0;
  text-transform: unset;
}
</style>

<script></script>
