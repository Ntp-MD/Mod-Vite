<template>
  <div class="TableLayout">
    <div class="PlayerSlot">
      <div
        v-for="(playerNames, i) in playerNames"
        :key="i"
        class="PlayerFrame"
        :class="{
          isTurn: i === currentPlayer,
          isFolded: playerFolded[i],
          isMain: i === 0,
          Player: i !== 0 && i === currentPlayer,
        }"
      >
        <div class="PlayerName">
          <div>{{ playerNames }}</div>
          <div class="PlayerPosition">({{ playerPositions[i] }})</div>
        </div>
        <div class="PlayerMoney">
          <div>${{ playerMoney[i] }}</div>
        </div>
        <div class="PlayerHand">
          <div
            v-for="(card, cIndex) in hands[i]"
            :key="cIndex"
            class="CardBody"
            :class="[getSuitClass(card.suit), { hideCard: i !== 0 && gamePhase !== 'showdown' }]"
          >
            <div class="RankCard">{{ card.rank }}</div>
            <div class="SuitCard">{{ card.suit }}</div>
          </div>
        </div>
        <div class="PlayerBet">Bet: ${{ playerBets[i] }}</div>
      </div>
    </div>

    <div class="TableBoard">
      <div class="TableFlop" v-if="flop && flop.length">
        <div v-for="(card, index) in flop" :key="index" class="CardBody" :class="getSuitClass(card.suit)">
          <div class="RankCard">{{ card.rank }}</div>
          <div class="SuitCard">{{ card.suit }}</div>
        </div>
      </div>
      <div class="PotsMoney">{{ pot }}$</div>
      <div class="TablePhase">Current Phase: {{ gamePhase }}</div>
    </div>

    <div class="TimelineLog" ref="timelineLogRef">
      <div v-for="(round, index) in roundLogs" :key="index" class="RoundLog">
        <div>
          <div v-for="(entry, i) in round" :key="i" v-html="entry"></div>
        </div>
      </div>
    </div>

    <div class="ActionButton">
      <button @click="playerAction('check')" :disabled="!canCheck">Check</button>
      <button @click="playerAction('call', callAmount)" :disabled="!canCall">{{ `Call $${callAmount}` }}</button>
      <button @click="playerAction('raise', raiseInput)" :disabled="!canRaise">Raise ${{ raiseInput }}</button>
      <button @click="playerAction('all-in')" :disabled="!canAll">All-In</button>
      <button @click="playerAction('fold')" :disabled="gamePhase === 'idle' || currentPlayer !== 0">Fold</button>
    </div>

    <div class="ChipButton">
      <div v-for="chip in raiseChips" :key="chip" class="ChipBtn">
        <button @click="increaseRaise(chip)">+ ${{ chip }}</button>
        <button @click="decreaseRaise(chip)">- ${{ chip }}</button>
      </div>
    </div>

    <div class="TableSetting">
      <button @click="startGame" :disabled="gamePhase !== 'idle'">Start Game</button>
      <button @click="startNewRound" :disabled="gamePhase !== 'showdown'">Next</button>
      <!--
        <button @click="startNewRound" :disabled="gamePhase !== 'showdown' || isPlayerBusted">Next</button>
      -->
      <button @click="resetGame">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import {
  playerPositions,
  playerMoney,
  hands,
  getSuitClass,
  playerBets,
  roundLogs,
  flop,
  pot,
  gamePhase,
  canCheck,
  playerAction,
  canCall,
  callAmount,
  canRaise,
  raiseInput,
  canAll,
  raiseChips,
  decreaseRaise,
  increaseRaise,
  startGame,
  startNewRound,
  resetGame,
  playerNames,
  currentPlayer,
  playerFolded,
  isPlayerBusted,
} from "../js/Table.js";

const timelineLogRef = ref(null);

watch(
  roundLogs,
  () => {
    nextTick(() => {
      if (timelineLogRef.value) {
        timelineLogRef.value.scrollTop = timelineLogRef.value.scrollHeight;
      }
    });
  },
  { deep: true }
); // Use deep watch as roundLogs is an array of arrays
</script>

<style scoped>
@import url(/src/css/Table.css);
</style>
