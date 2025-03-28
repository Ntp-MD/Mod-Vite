<template>
  <section class="container">
    <div class="copy-group">
      <div class="copy-items" v-for="font in fonts" :key="font.font_name">
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
  </section>
</template>

<script>
import fontData from "/src/data/font-family.json";

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
section {
  margin-top: 150px;
}

.font-name {
  font-size: 100%;
  font-weight: 600;
}

.copy-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(150px, 25vw, 20%), 1fr));
  gap: 15px;
}

.copy-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px;
  border-radius: 25px;
  background: var(--linear3);
  min-height: auto;
}

.code-block {
  display: grid;
  grid-template-columns: auto 40px;
  align-items: center;
  gap: 5px;
  background: #fff;
  color: var(--color1);
  border-radius: 5px;
  overflow: hidden;
  font-size: 14px;
}

.code-content {
  display: grid;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  width: auto;
  padding: 0px 10px;
  user-select: none;
  height: 35px;
}

.copy-button {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  background: var(--color3);
  cursor: pointer;
}

.copy-button img {
  object-fit: contain;
  width: 40%;
  filter: invert(1);
}

@media screen and (max-width: 480px) {
  .copy-group {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
