<template>
  <div class="labelName">Font Family</div>
  <div class="font_bookmark grid_431">
    <div class="font_family" v-for="font in fonts" :key="font.font_name">
      <div class="font_name">{{ font.font_name }}</div>
      <div class="font_info">
        <div class="font_url">
          {{ font.font_url }}
        </div>
        <div class="font_copy" @click="copyToClipboard(font.font_url)">
          <img src="/src/assets/icon/link.png" alt="" />
        </div>
      </div>
      <div class="font_info">
        <div class="font_url">
          {{ font.font_family }}
        </div>
        <div class="font_copy" @click="copyToClipboard(font.font_family)">
          <img src="/src/assets/icon/copy.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fontData from "../assets/data/fontfamily.json";

export default {
  methods: {
    copyToClipboard(textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          // alert(`${textToCopy} copied to clipboard!`);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    },
  },
  data() {
    return {
      fonts: fontData,
    };
  },
};
</script>

<style scoped>
.font_bookmark {
}

.font_name {
  font-size: 100%;
  font-weight: 600;
}

.font_family {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  border-radius: 10px;
  min-height: auto;
  background: var(--sub-color);
  border: 1px solid var(--border-color);
}

.font_info {
  display: grid;
  grid-template-columns: auto 35px;
  align-items: center;
  background: var(--sub-color2);
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.font_url {
  display: grid;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  width: 95%;
  user-select: none;
  margin: auto;
  height: 35px;
}

.font_copy {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.font_copy img {
  object-fit: contain;
  width: 40%;
  filter: invert(1);
}
</style>
