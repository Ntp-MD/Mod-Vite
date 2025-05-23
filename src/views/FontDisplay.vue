<template>
  <div class="FontDisplay">
    <div class="font-group">
      <div class="font-items" v-for="font in fonts" :key="font.font_name">
        <div class="font-name">{{ font.font_name }}</div>
        <div class="code-block">
          <div class="code-content">
            {{ font.font_url }}
          </div>
          <div class="copy-button" @click="copyToClipboard(font.font_url)">
            <img src="/src/assets/icon/link.png" alt="" />
          </div>
        </div>
        <div class="code-block">
          <div class="code-content">
            {{ font.font_family }}
          </div>
          <div class="copy-button" @click="copyToClipboard(font.font_family)">
            <img src="/src/assets/icon/copy.png" alt="" />
          </div>
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
.font-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(150px, 30%, 20vw), 1fr));
  gap: 15px;
  margin: 0;
}

.font-name {
  font-size: 100%;
  font-weight: 600;
}

.font-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  border-radius: 12px;
  min-height: auto;
}

.code-block {
  display: grid;
  grid-template-columns: auto 35px;
  align-items: center;
  background: var(--ui-bg1);
  border-radius: 5px;
  overflow: hidden;
  font-size: 14px;
  font-family: monospace;
  border: 1px solid #444;
}

.code-content {
  display: grid;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  width: 95%;
  user-select: none;
  margin: auto;
  height: 35px;
}

.copy-button {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  background: var(--color3);
  cursor: pointer;
  border: 1px solid #444;
}

.copy-button img {
  object-fit: contain;
  width: 40%;
  filter: invert(1);
}

@media screen and (max-width: 480px) {
  .font-group {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
