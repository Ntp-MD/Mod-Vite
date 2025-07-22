<template>
  <div class="labelName">Map Marker</div>
  <div class="Map">
    <img src="https://itp1.itopfile.com/ImageServer/z_itp_12052025qsdh/0/0/white-mapz-z1584138795656.png" alt="" />
    <mark class="greenland">
      <div class=""></div>
      <label>Greenland</label>
    </mark>
    <mark class="Sweden">
      <div class=""></div>
      <label>Sweden</label>
    </mark>
    <mark class="Norway">
      <div class=""></div>
      <label>Norway</label>
    </mark>
    <mark class="France">
      <div class=""></div>
      <label>France</label>
    </mark>
    <mark class="Peru">
      <div class=""></div>
      <label>Peru</label>
    </mark>
    <mark class="India">
      <div class=""></div>
      <label>India</label>
    </mark>
    <mark class="Georgia">
      <div class=""></div>
      <label>Georgia</label>
    </mark>
    <mark class="China">
      <div class=""></div>
      <label>China</label>
    </mark>

    <mark class="Thailand">
      <div class=""></div>
      <label>Thailand</label>
    </mark>

    <mark class="Vietnam">
      <div class=""></div>
      <label>Vietnam</label>
    </mark>

    <mark class="Singapore">
      <div class=""></div>
      <label>Singapore</label>
    </mark>

    <mark class="Japan">
      <div class=""></div>
      <label>Japan</label>
    </mark>
  </div>
</template>

<style scoped>
.Map {
  position: relative;
  display: block;
  width: auto;
  height: 80vh;
  aspect-ratio: 16/8;
  border: 1px solid var(--btn-color);
  margin: auto;
}

.Map mark {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 5px;
  background: transparent;
}

.Map label {
  padding: 2px 10px;
  font-size: clamp(8px, 1vw, 14px);
  color: #fff;
  background: var(--btn-color);
}

.Map mark div {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid var(--btn-color);
}

.greenland {
  top: 17%;
  left: 33.5%;
}

.Sweden {
  top: 18.5%;
  left: 51.2%;
}

.Norway {
  top: 23.5%;
  left: 48.6%;
}

.France {
  top: 33%;
  left: 47.5%;
}

.Peru {
  top: 68%;
  left: 26%;
}

.India {
  top: 65%;
  left: 53%;
}

.Georgia {
  top: 37%;
  left: 58.3%;
}

.China {
  top: 40%;
  left: 74%;
}

.Thailand {
  top: 52%;
  left: 74.5%;
}

.Vietnam {
  top: 56%;
  left: 76%;
}

.Singapore {
  top: 63%;
  left: 74.5%;
}

.Japan {
  top: 41%;
  left: 85%;
}
</style>
