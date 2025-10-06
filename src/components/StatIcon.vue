<template>
  <li class="stat-icon">
    <img class="icon" :src="pImgUrl" width="64" height="64" @click="onClickStat" @mouseover="onHoverStat" />
    <div class="desc">
      <p :class="pointsClass">{{ pTotal }}({{ pBase }})</p>
      <button class="btn" id="max-btn" @click="onClickMaxStat">{{ maxOrClear }}</button>
      <button class="btn" id="reduce-btn" @click="onClickReduceStat">-</button>
    </div>
  </li>
</template>

<script>
export default {
  name: "StatIcon",
  props: {
    pId: String,
    pBase: Number,
    pTotal: Number,
    pImgUrl: URL,
  },

  methods: {
    onClickStat() {
      this.$emit("click-stat", this.pId);
    },
    onHoverStat() {
      this.$emit("hover-stat", this.pId);
    },
    onClickMaxStat() {
      this.$emit("max-stat", this.pId);
    },
    onClickReduceStat() {
      this.$emit("reduce-stat", this.pId); // <-- emit to parent
    },
  },
  computed: {
    pointsClass() {
      return this.pBase >= 60 ? "max" : "normal";
    },

    maxOrClear() {
      return this.pBase >= 60 ? "C" : "M";
    },
  },
};
</script>
