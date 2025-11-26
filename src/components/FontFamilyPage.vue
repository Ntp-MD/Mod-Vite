<template>
  <div class="font-bookmark grid-431">
    <div class="font-family" v-for="font in fonts" :key="font.font_name">
      <div class="font-name">{{ font.font_name }}</div>
      <div class="font-info">
        <div class="font-url">
          {{ font.font_url }}
        </div>
        <div class="font-copy" @click="copyToClipboard(font.font_url)">
          <img src="/src/assets/icon/link.png" alt="" />
        </div>
      </div>
      <div class="font-info">
        <div class="font-url">
          {{ font.font_family }}
        </div>
        <div class="font-copy" @click="copyToClipboard(font.font_family)">
          <img src="/src/assets/icon/copy.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fontData from "@/assets/data/fontfamily.json";

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
.font-bookmark {
  height: 90vh;
  overflow-x: scroll;
  padding-right: 20px;
}

.font-name {
  font-size: 100%;
  font-weight: 600;
}

.font-family {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  border-radius: 10px;
  min-height: auto;
  background: var(--color2);
  border: 1px solid var(--border-color);
}

.font-info {
  display: grid;
  grid-template-columns: auto 35px;
  align-items: center;
  background: var(--color3);
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.font-url {
  display: grid;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  width: 95%;
  user-select: none;
  margin: auto;
  height: 35px;
}

.font-copy {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.font-copy img {
  object-fit: contain;
  width: 40%;
  filter: invert(1);
}
</style>
