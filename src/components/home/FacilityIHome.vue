<template>
  <section>
    <main>
      <div class="facility-info-1">
        <div class="facility-info-1-text">
          <sub>More than just a pool </sub>
          <div>
            <h2>our pool</h2>
            <h2>facilities</h2>
          </div>
          <div>
            <div>We offer all the options that a traditional</div>
            <div>club does without an expensive bond</div>
            <div>required to join</div>
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
    </main>
  </section>
</template>

<style scoped>
section {
  background: var(--bg2);
  width: 100%;
}

sub {
  font-family: "Playfair", serif;
  font-style: italic;
  font-size: 20px;
  font-weight: 900;
  color: var(--color4);
}

main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
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
  position: relative;
  padding-right: clamp(30px, 4vw, 70px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  text-align: right;
  height: 100%;
}

.facility-info-2 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  background: var(--bg2);
}

.facility-info-2 div {
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
  min-height: clamp(200px, 20vw, 320px);
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

@media screen and (min-width: 768px) and (max-width: 992px) {
  main {
    display: grid;
    grid-template-columns: 45% auto;
    place-content: center;
    padding: 0;
  }

  .facility-info-1-text {
    gap: 10px;
    width: 100%;
  }

  .facility-info-2 > div {
    padding: 10px;
  }
}
</style>
