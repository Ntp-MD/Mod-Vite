<template>
  <div class="facility-content">
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
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.facility-content {
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
}

.facility-info-2 > div {
  display: block;
  min-height: 350px;
  background: var(--color2);
}
</style>
