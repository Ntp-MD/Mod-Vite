<style scoped>
@import url(/src/css/Table.css);
</style>

<template>
  <div class="TableLayout">
    <div class="PlayerLineup">
      <div
        v-for="(playerNames, i) in playerNames"
        :key="i"
        class="PlayerFrame"
        :class="{
          activePlayers: i === currentPlayer,
          foldedPlayers: playerFolded[i],
          Main: i === 0 && i === currentPlayer,
          Player: i !== 0 && i === currentPlayer,
        }"
      >
        <div class="PlayerName">
          <div>{{ playerNames }}</div>
          <div class="PlayerPos">({{ playerPositions[i] }})</div>
        </div>
        <div class="PlayerPosition">
          <div>${{ playerMoney[i] }}</div>
        </div>
        <div class="PlayerHand">
          <div v-for="(card, cIndex) in hands[i]" :key="cIndex" class="CardBody" :class="getSuitClass(card.suit)">
            <div class="RankCard">{{ card.rank }}</div>
            <div class="SuitCard">{{ card.suit }}</div>
          </div>
        </div>
        <div class="PlayerBet">Bet: ${{ playerBets[i] }}</div>
      </div>
    </div>
    <div class="TableFlob">
      <div class="TableFlobCard" v-if="flop && flop.length">
        <div v-for="(card, index) in flop" :key="index" class="CardBody" :class="getSuitClass(card.suit)">
          <div class="RankCard">{{ card.rank }}</div>
          <div class="SuitCard">{{ card.suit }}</div>
        </div>
      </div>
      <div class="PoolMoney">{{ pot }}$</div>
      <div>Current Game Phase: {{ gamePhase }}</div>
    </div>
    <div class="TimelineLog">
      <div v-for="(round, index) in roundLogs" :key="index" class="RoundLog">
        <div>Round {{ index + 1 }}</div>
        <div>
          <div v-for="(entry, i) in round" :key="i">{{ entry }}</div>
        </div>
      </div>
    </div>

    <div class="PlayerAction">
      <div class="ActionButton">
        <button :disabled="!canCheck" @click="playerAction('check')">Check</button>
        <button :disabled="!canCall" @click="playerAction('call', callAmount)">{{ `Call $${callAmount}` }}</button>
        <button :disabled="!canRaise" @click="playerAction('raise', raiseInput)">Raise ${{ raiseInput }}</button>
        <button :disabled="!canGoAllIn" @click="playerAction('all-in')">All-In</button>
        <button @click="playerAction('fold')">Fold</button>
      </div>
      <div class="ChipButton">
        <div v-for="chip in raiseChips" :key="chip" class="ChipBtn">
          <button @click="decreaseRaise(chip)">-</button>
          <button @click="increaseRaise(chip)">${{ chip }}</button>
          <button @click="increaseRaise(chip)">+</button>
        </div>
      </div>
    </div>
    <div class="TableSetting">
      <button @click="startGame" :disabled="gamePhase !== 'idle'">Start Game</button>
      <button @click="startNewRound" :disabled="gamePhase !== 'betting'">Next</button>
      <button @click="resetGame">Reset</button>
    </div>
  </div>
</template>

<script setup>
import {
  playerNames,
  currentPlayer,
  playerFolded,
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
  canGoAllIn,
  raiseChips,
  decreaseRaise,
  setRaise,
  increaseRaise,
  startGame,
  startNewRound,
  resetGame,
  maxRaiseAmount, // Exported because increaseRaise uses it
  minRaiseAmount, // Exported because decreaseRaise, playerAction, resetGame use it
} from "../js/Table.js";
</script>
