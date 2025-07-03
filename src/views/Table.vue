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

.PlayerSlot,
.TableBoard {
  opacity: 0;
}

.TableLayout {
  --spades: #000;
  --hearts: #ff0000;
  --diamonds: #009eb9;
  --clubs: #00c57a;
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  gap: var(--gap);
}

.TableLayout * {
  font-size: clamp(13px, 1vw, 14px);
}

.TableLayout :is(button):disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.TableLayout button {
  flex: 1;
  min-width: 0;
  width: auto;
  background: var(--ui-bg);
  border: 1px solid var(--border-color);
}

.TableLayout button:hover {
  background: var(--btn);
}

.PlayerSlot {
  display: flex;
  border: 1px solid var(--border-color);
  min-height: 120px;
}

.PlayerFrame {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: var(--gap);
  padding: var(--gap);
  white-space: nowrap;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.PlayerFrame :not(.Main) .PlayerName {
  display: flex;
  gap: 5px;
  visibility: hidden;
}

.PlayerMoney {
  display: grid;
  align-items: start;
  justify-content: end;
  justify-items: end;
  gap: 3px;
}

.isTurn {
  border: 1px solid var(--focus);
}

.isFolded {
  opacity: 0.2;
}

.PlayerBet {
  display: grid;
  align-items: end;
  justify-content: end;
}

.TableSetting {
  display: flex;
  gap: var(--gap);
  width: 100%;
}

.TableBoard {
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  border: 1px solid var(--border-color);
  gap: 5px;
  padding: 10px;
  min-height: 85px;
}

.TimelineLog {
  border: 1px solid var(--border-color);
  padding: var(--gap);
  overflow-y: scroll;
  height: 35vw;
  max-height: 380px;
}

.TimelineRound {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: var(--gap);
}

.TableFlop,
.PlayerHand {
  display: flex;
  gap: var(--gap);
}

.hideCard > div {
  font-size: 0;
}

.CardBody {
  display: grid;
  place-content: center;
  place-items: center;
  width: 30px;
  height: auto;
  aspect-ratio: 2.8/4;
  border: 1px solid var(--border-color);
  /*
  background: #fff;
  */
  border-radius: 3px;
  line-height: 1;
}
.CardBody > div {
  line-height: 0.8;
}

.hide-card-details {
  border: 1px solid var(--border-color);
}

.CardBody.hideCard {
  border: 1px solid var(--border-color) !important;
}

/*
.CardBody.spades {
  border: 1px solid var(--spades);
  color: var(--spades);
}

.CardBody.hearts {
  border: 1px solid var(--hearts);
  color: var(--hearts);
}

.CardBody.diamonds {
  border: 1px solid var(--diamonds);
  color: var(--diamonds);
}

.CardBody.clubs {
  border: 1px solid var(--clubs);
  color: var(--clubs);
}
*/

.ActionButton {
  display: flex;
  flex-direction: column;
  flex: 0.5;
}

.ChipButton {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gap);
}

.ChipBtn {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.TableLayout > div {
  width: 100%;
}

.TimelineLog {
  flex: 1;
}

@media screen and (max-width: 480px) {
  .CardBody {
    width: 20px;
  }

  .PlayerFrame,
  .PlayerName {
    display: flex;
    flex-direction: column;
    text-align: center;
    place-content: center;
    gap: 5px;
  }

  .PlayerHand {
    gap: 5px;
  }
}
</style>
