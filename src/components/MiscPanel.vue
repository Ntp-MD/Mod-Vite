<template>
  <div class="misc-panel">
    <div class="inscription-prodigy-panel">
      <button class="btn" id="inscription-btn" @click="onClickInscriptionBtn">Inscription Slots:{{ pInscriptionSlots }}</button>
      <button class="btn" id="reset-btn" @click="onClickResetButton">X</button>
      <button class="btn" id="prodigy-btn" @click="onClickProdigyBtn">Prodigies:</button>
      <div class="prodigy-text">
        <slot></slot>
      </div>
    </div>
    <p class="escort-title">Add Escort/Reward Talent Tree</p>
    <div class="escort-panel">
      <select id="escort-select" v-model="treeSelected">
        <option disabled value="">select a escort talent class</option>
        <template v-for="c in escortConfig" :key="c">
          <option :value="c">{{ c[0] }}</option>
        </template>
      </select>
      <button class="btn" @click="onClickEscortButton">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiscPanel",
  props: {
    pInscriptionSlots: Number,
  },
  emits: ["click-inscription-btn", "reset-inscription-btn", "click-prodigy-btn", "click-escort-btn"],

  data() {
    return {
      treeSelected: "",
      escortConfig: [
        ["Escort: Spell / Staff Combat", "spell/staff-combat", false, [0, 0, 0, 0]],
        ["Escort: Spell / Stone Alchemy", "spell/stone-alchemy", false, [0, 0, 0, 0]],
        ["Escort: Wild-Gift / Mindstar Mastery", "wild-gift/mindstar-mastery", false, [0, 0, 0, 0]],
        ["Escort: Corruption / Curses", "corruption/curses", false, [0, 0, 0, 0]],
        ["Escort: Psionic / Feedback", "psionic/feedback", false, [0, 0, 0, 0]],
        ["Escort: Spell / Divination", "spell/divination", false, [0, 0, 0, 0]],
        ["Escort: Wild-Gift / Call of the Wild", "wild-gift/call", false, [0, 0, 0, 0]],
        ["Escort: Celestial / Chants", "celestial/chants", false, [0, 0, 0, 0]],
        ["Escort: Psionic / Augmented Mobility", "psionic/augmented-mobility", false, [0, 0, 0, 0]],
        ["Escort: Chronomancy / Chronomancy", "chronomancy/chronomancy", false, [0, 0, 0, 0]],
        ["Escort: Psionic / Dreaming", "psionic/dreaming", false, [0, 0, 0, 0]],
        ["Escort: Cunning / Survival", "cunning/survival", false, [0, 0, 0, 0]],
        ["Escort: Cunning / Scoundrel", "cunning/scoundrel", false, [0, 0, 0, 0]],
        ["Escort: SteamTech", "steamtech", true, [0, 0, 0, 0]],
        ["Sandworm Queen Heart: Wild-Gift / Harmony", "wild-gift/harmony", false, [0, 0, 0, 0]], //sandworm queen heart
        ["Corrupted Heart: Corruption / Vile Life", "corruption/vile-life", false, [0, 0, 0, 0]], //sandworm queen heart
        ["The Fall of Zigur: Corruption / Hexes", "corruption/hexes", true, [0, 0, 0, 0]], //grand corruptor
        ["Store: Spell / Staff Combat", "spell/staff-combat", true, [0, 0, 0, 0]], //shop
        ["Store: Technique / Combat Training", "technique/combat-training", true, [0, 0, 0, 0, 0, 0]],
        ["Store: Wild-gift / Mindstar Mastery", "wild-gift/mindstar-mastery", true, [0, 0, 0, 0]],
        ["Zigur: Wild-gift / Antimagic", "wild-gift/antimagic", true, [1, 0, 0, 0]],
        ["Zigur: Wild-gift / Fungus", "wild-gift/fungus", true, [0, 0, 0, 0]],
      ],
    };
  },

  methods: {
    onClickInscriptionBtn() {
      console.log("Click inscription button");
      this.$emit("click-inscription-btn");
    },

    onClickResetButton() {
      this.$emit("reset-inscription-btn");
    },

    onClickProdigyBtn() {
      this.$emit("click-prodigy-btn");
    },

    onClickEscortButton() {
      console.log("Click escort button");
      this.$emit("click-escort-btn", this.treeSelected);
    },
  },

  computed: {},

  mounted() {
    console.log(this.pData);
  },
};
</script>
