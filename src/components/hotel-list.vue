<template>
  <div id="hotel-list">
    <div class="container">
      <caption>
        <h1>our partner</h1>
      </caption>
      <div class="hotel-list">
        <div class="hotel-list-item" v-for="n in 4">
          <div class="hotel-image">
            <img src="/src/assets/beach/3.jpg" alt="" />
          </div>
          <div class="hotel-content">
            <div class="hotel-name">Residence 1</div>
            <div class="hotel-price">2990 THB /Month</div>
            <div class="hotel-location">Pattaya/Chonburi</div>
            <div class="hotel-info">
              <div class="info-icon"><img src="/src/assets/icon/bed.png" alt="" />5 <span>Room</span></div>
              <div class="info-icon"><img src="/src/assets/icon/bath.png" alt="" />2 <span>Room</span></div>
              <div class="info-icon"><img src="/src/assets/icon/living-room.png" alt="" />1 <span>Room</span></div>
              <div class="info-icon"><img src="/src/assets/icon/kitchen.png" alt="" />1 <span>Room</span></div>
              <div class="info-icon"><img src="/src/assets/icon/pool.png" alt="" />10<span>Mm</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#hotel-list {
  padding-bottom: 200px;
}

.hotel-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
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
  height: auto;
}

.hotel-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 20px 25px;
  border-radius: 0 0 15px 15px;
}

.hotel-name {
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
}

.hotel-price {
  padding-top: 15px;
  border-top: 1px solid #ddd;
  font-size: 16px;
}

.hotel-location {
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
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
