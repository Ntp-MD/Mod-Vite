<template>
  <li class="talent-icon">
    <img :class="{ icon: true, dark: !pReq }" :src="pData.img_url" @click="onClickTalent" @mouseover="onHoverTalent" />
    <p :class="{ level: true, max: pData.cur_level == pData.max_level, locked: !pReq }">{{ pData.cur_level }}/{{ pData.max_level }}</p>
    <button class="btn" @click.stop="onRefund">-</button>
  </li>
</template>

<script>
export default {
  name: "TalentIcon",
  props: {
    pData: Object,
    pIndex: Number,
    pReq: Boolean,
  },

  emits: ["click-talent", "hover-talent"],

  methods: {
    onClickTalent() {
      // console.log("TalentIcon.Click talent:" + this.p_name)
      if (this.pReq) {
        this.$emit("click-talent", this.pIndex);
      }
    },

    onRefund() {
      this.$emit("refund-talent", this.pIndex);
    },

    onHoverTalent() {
      // console.log("TalentIcon.Hover: " + this.p_req)
      this.$emit("hover-talent", this.pIndex);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.level {
  margin-top: 0%;
}

.icon {
  border-style: solid;
  border-width: 2px;
  border-color: #969696;
}

.dark {
  filter: brightness(0.5);
}

.max {
  color: #00ff00;
}

.locked {
  color: red;
}

.talent-icon {
  list-style: none;
  margin-left: 5px;
}
</style>
