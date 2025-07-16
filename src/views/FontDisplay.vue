<template>
  <div class="labelName">Font Family</div>
  <div class="FontGroup">
    <div class="FontFamily" v-for="font in fonts" :key="font.font_name">
      <div class="FontName">{{ font.font_name }}</div>
      <div class="FontInfo">
        <div class="FontUrl">
          {{ font.font_url }}
        </div>
        <div class="FontCopyButton" @click="copyToClipboard(font.font_url)">
          <img src="/src/assets/icon/link.png" alt="" />
        </div>
      </div>
      <div class="FontInfo">
        <div class="FontUrl">
          {{ font.font_family }}
        </div>
        <div class="FontCopyButton" @click="copyToClipboard(font.font_family)">
          <img src="/src/assets/icon/copy.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fontData from "/SSR/data/FontFamily.json";

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
.FontGroup {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(150px, 30%, 20vw), 1fr));
  gap: var(--gap);
  margin: 0;
}

.FontName {
  font-size: 100%;
  font-weight: 600;
}

.FontFamily {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  border-radius: 10px;
  min-height: auto;
  background: var(--sub-color);
  border: 1px solid var(--border-color);
}

.FontInfo {
  display: grid;
  grid-template-columns: auto 35px;
  align-items: center;
  background: var(--sub-color2);
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.FontUrl {
  display: grid;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  width: 95%;
  user-select: none;
  margin: auto;
  height: 35px;
}

.FontCopyButton {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.FontCopyButton img {
  object-fit: contain;
  width: 40%;
  filter: invert(1);
}

@media screen and (max-width: 480px) {
  .FontGroup {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
