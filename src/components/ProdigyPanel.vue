<template>
  <div class="prodigy-panel-bg" @click="onClickBackground">
    <div class="prodigy-panel-inner" @click="onClickInner">
      <div class="title-panel"></div>
      <div class="prodigy-panel-content">
        <div v-if="pData && Object.keys(this.pData) != 0" class="prodigy-panel">
          <h3>Prodigies</h3>
          <div class="prodigy-container">
            <ol v-for="(pg, index1) in this.pData" :key="pg.type" class="prodigy-column">
              <li v-for="(p, index2) in pg.talents" :key="p.type" :class="isNormalProdigy(p) ? 'show' : 'hide'">
                <!-- <p>{{p.name}}</p> -->
                <img
                  :class="{ icon: true, chosen: this.isChosen(index1, index2) }"
                  :src="p.img_url"
                  @click="onClickProdigy(index1, index2)"
                  @mouseover="onHoverProdigy(index1, index2)"
                />
              </li>
            </ol>
          </div>
        </div>
        <div class="prodigy-desc">
          <TalentDesc :pData="this.selectingProdigy" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Const } from "../const.js";
import TalentDesc from "./TalentDesc.vue";

export default {
  name: "ProdigyPanel",
  props: {
    pData: Object,
    pId1: String,
    pId2: String,
  },
  data() {
    return {
      selectingProdigy: {},
    };
  },
  methods: {
    isNormalProdigy(config) {
      if (Const.RACE_EVOLUTION.indexOf(config.short_name) != -1) {
        return false;
      }
      if (config.is_class_evolution || config.not_listed) {
        return false;
      }
      return true;
    },
    isChosen(index1, index2) {
      let tmp = [index1, index2].join(Const.PRODIGY_KEY_DELIMITER);
      return tmp == this.pId1 || tmp == this.pId2;
    },
    onClickProdigy(index1, index2) {
      // console.log("Hover " + index1 + index2)
      this.$emit("click-prodigy", index1, index2);
    },
    onHoverProdigy(index1, index2) {
      // console.log("Hover " + index1 + index2)
      this.selectingProdigy = this.pData[index1].talents[index2];
    },
    onClickBackground() {
      console.log("CLICK background");
      this.$emit("close-prodigy-panel");
    },
    onClickInner(event) {
      event.stopPropagation();
    },
  },
  computed: {},
  components: { TalentDesc },
};
</script>
