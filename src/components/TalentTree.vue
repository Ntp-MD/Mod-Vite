<template>
  <div class="talent-tree">
    <div>
      <TalentGroup
        v-for="t of pTalentsGroups"
        :key="t.type"
        :pData="t"
        @click-talent="onClickTalent"
        @hover-talent="onHoverTalent"
        @reset-talent-group="onResetTalentGroup"
        @click-mastery="onClickMastery"
      />
    </div>
  </div>
</template>

<script>
import TalentGroup from "./TalentGroup.vue";

export default {
  name: "TalentTree",
  props: {
    pType: String,
    pTalentsGroups: Object,
  },
  components: { TalentGroup },

  methods: {
    onClickMastery(groupName) {
      console.log("TalentTree.onClickMastery: " + groupName);
      this.$emit("click-mastery", groupName, this.pType);
    },

    onClickTalent(index, groupName) {
      console.log("TalentTree.onClickTalent " + index + "/" + groupName + "/" + this.pType);
      this.$emit("click-talent", index, groupName, this.pType);
    },

    onHoverTalent(name, groupName) {
      // console.log("TalentTree.onHoverTalent" + t_name + "/" +  t_group_name + "/" + this.p_type)
      this.$emit("hover-talent", name, groupName, this.pType);
    },

    onResetTalentGroup(groupName) {
      this.$emit("reset-talent-group", groupName, this.pType);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.talent-tree {
  flex: 1 0 400px;
  height: 700px;
  overflow: auto;
}
</style>
