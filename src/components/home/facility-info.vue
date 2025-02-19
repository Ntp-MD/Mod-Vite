<template>
  <div id="facility-content">
    <div class="facility-info">
      <div class="facility-info-1">
        <div class="facility-info-1-text">
          <span>More than just a pool </span>
          <div>
            <h2>our pool</h2>
            <h2>facilities</h2>
          </div>
          <div>
            <p>We offer all the options that a traditional</p>
            <p>club does without an expensive bond</p>
            <p>required to join</p>
          </div>
        </div>
      </div>
      <div class="facility-info-2">
        <div>
          <img src="/src//assets/icon/disco.png" alt="" />
          <p>clubhouse</p>
        </div>
        <div>
          <img src="/src//assets/icon/mall.png" alt="" />
          <p>shopping mall</p>
        </div>
        <div>
          <img src="/src//assets/icon/birdie.png" alt="" />
          <p>golf court</p>
        </div>
        <div>
          <img src="/src//assets/icon/pool.png" alt="" />
          <p>swinning pool</p>
        </div>
        <div>
          <img src="/src//assets/icon/garden.png" alt="" />
          <p>garden park</p>
        </div>
        <div>
          <img src="/src//assets/icon/drink.png" alt="" />
          <p>nightbar</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#facility-content {
  background: var(--bg2);
}

span {
  font-family: "Playfair", serif;
  font-style: italic;
  font-size: 20px;
  font-weight: 900;
  color: var(--color4);
}

.facility-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.facility-info-1 {
  height: 100%;
  width: 100%;
  position: relative;
}

.facility-info-1 h2 {
  color: var(--color1);
}

.facility-info-1-text {
  position: absolute;
  top: 20%;
  right: 15%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  text-align: right;
}

.facility-info-2 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  background: var(--bg2);
}

.facility-info-2 p {
  font-size: clamp(18px, 1vw, 20px);
  font-weight: 800;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  line-height: 1.3;
  min-height: 45px;
}

.facility-info-2 > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  min-height: clamp(200px, 15vw, 350px);
  background: var(--color2);
  color: #fff;
  transition: 0.3s;
}

.facility-info-2 > div:hover {
  background: var(--color1);
}

.facility-info-2 img {
  width: 30%;
  height: auto;
  aspect-ratio: 1;
  filter: invert(1);
}

@media screen and (max-width: 480px) {
  .facility-info {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    padding-top: 50px;
    gap: 20px;
  }

  .facility-info-1-text {
    position: unset;
    padding-left: 20px;
    text-align: left;
    gap: 20px;
  }

  .facility-info-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
