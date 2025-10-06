<template>
  <div class="talent-group">
    <div class="title">
      <label :for="pData.type">
        <img :src="expandImg" />
      </label>
      <input :id="pData.type" type="checkbox" style="display: none" v-model="expanded" />
      <p :class="nameClass" @click="onClickMastery">{{ pData.category }} / {{ pData.name }} ({{ pData.mastery.toFixed(2) }})</p>
      <button class="btn" id="reset" @click="onClickResetButton">X</button>
    </div>
    <div v-show="expanded" :class="{ group: true, 'locked-group': !pData.unlocked }">
      <TalentIcon
        v-for="(t, index) in pData.talents"
        :key="t.name"
        :pIndex="index"
        :pData="t"
        :pReq="this.meetCategoryReqs(index)"
        @click-talent="onClickTalent"
        @hover-talent="onHoverTalent"
        @refund-talent="onRefundTalent"
      />
    </div>
  </div>
</template>

<script>
import TalentIcon from "./TalentIcon.vue";

export default {
  name: "TalentGroup",
  props: {
    pData: Object,
  },
  components: { TalentIcon },
  emits: ["click-talent", "hover-talent", "click-mastery", "reset-talent-group"],

  data() {
    return {
      expanded: this.pData.unlocked,
    };
  },

  computed: {
    expandImg() {
      return this.expanded ? require("../assets/ui/minus.png") : require("../assets/ui/plus.png");
    },
    nameClass() {
      return this.pData.unlocked ? "unlocked" : "locked";
    },
    reducedPoints() {
      // Sum of all talents' refunded points (assuming max_level - cur_level is refunded)
      return this.pData.talents ? this.pData.talents.reduce((sum, t) => sum + ((t.max_level || 0) - (t.cur_level || 0)), 0) : 0;
    },
  },

  methods: {
    meetCategoryReqs(index) {
      if (index == 0 || this.pData.talents[index].no_levelup_category_deps) {
        return true;
      } else {
        return this.pData.talents[index - 1].cur_level > 0;
      }
    },

    onClickMastery() {
      console.log("TalentGroup.click mastery");
      this.$emit("click-mastery", this.pData.type);
    },

    onClickResetButton() {
      console.log("TalentGroup.click reset button " + this.pData.type);
      this.$emit("reset-talent-group", this.pData.type);
    },

    onClickTalent(name) {
      console.log("TalentGroup.on_click_talent: " + name);
      this.$emit("click-talent", name, this.pData.type);
    },

    onRefundTalent(index) {
      // Reduce the talent point if possible
      const talent = this.pData.talents[index];
      if (talent.cur_level > 0) {
        talent.cur_level -= 1;
        // Optionally, emit up to parent if you want to refund points globally
        this.$emit("refund-talent", index, this.pData.type);
      }
    },

    onHoverTalent(index) {
      // console.log("TalentGroup.on_hover_talent: " + index)
      this.$emit("hover-talent", index, this.pData.type);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.talent-group {
  list-style: none;
  display: flex;
  flex-direction: column;
}

.title {
  display: flex;
}

.unlocked {
  margin-left: 5px;
  margin-top: 0%;
  margin-bottom: 0%;
  color: #00ff00;
  font-weight: bold;
}

.locked {
  margin-left: 5px;
  margin-top: 0%;
  margin-bottom: 0%;
  color: #969696;
  font-weight: bold;
}

.group {
  display: flex;
  flex-wrap: wrap;
  width: 360;
}

.locked-group {
  filter: brightness(50%);
}

#reset {
  border-width: 1px;
}
</style>
