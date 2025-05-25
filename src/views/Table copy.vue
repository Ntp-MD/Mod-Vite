<style scoped>
@import url(/src/css/Table.css);
</style>
<template>
  <div>
    <div class="TableBody">
      <div class="TimelineLog">
        <div>Action Timeline</div>
        <div v-for="(round, index) in roundLogs" :key="index" class="round-log">
          <h4>Round {{ index + 1 }}</h4>
          <div>
            <div v-for="(entry, i) in round" :key="i">{{ entry }}</div>
          </div>
        </div>
      </div>

      <div class="TableBoard">
        <div class="TableFlob">
          <div class="TableFlobCard" v-if="flop && flop.length">{{ formatHand(flop) }}</div>
        </div>
        <div class="PoolMoney">{{ pot }}$</div>
        <div class="PlayerTable">
          <div v-for="(name, i) in playerNames" :key="i" class="player" :class="{ active: i === currentPlayer, folded: playerFolded[i] }">
            <h3>
              {{ name }} <span class="text-gray-400 text-sm">({{ playerPositions[i] }})</span>
            </h3>
            <div v-if="i === 0 || !playerFolded[i]">
              <p>Cards: {{ formatHand(hands[i]) }}</p>
            </div>
            <p>Money: ${{ playerMoney[i] }}</p>
            <p>Bet: ${{ playerBets[i] }}</p>
            <p>{{ playerDialog[i] }}</p>
          </div>
        </div>
        <div class="PlayerActionGroup1">
          <button :disabled="!canCheck" @click="playerAction('check')">Check</button>
          <button :disabled="!canCall" @click="playerAction('call', callAmount)">{{ `Call $${callAmount}` }}</button>
          <button @click="playerAction('raise', raiseInput)">Raise ${{ raiseInput }}</button>
          <button @click="playerAction('fold')">Fold</button>
        </div>

        <div class="PlayerActionGroup2">
          <div v-for="chip in raiseChips" :key="chip" class="chip-control">
            <button @click="raiseInput = Math.max(minRaiseAmount, raiseInput - chip)">-</button>
            <button @click="raiseInput = chip">${{ chip }}</button>
            <button @click="raiseInput = Math.min(maxRaiseAmount, raiseInput + chip)">+</button>
          </div>
        </div>
      </div>

      <div class="Table-setting" v-if="gamePhase === 'idle'">
        <div>
          <label>
            Number of Players:
            <input type="number" v-model.number="numPlayers" min="2" max="6" />
          </label>
        </div>
        <div>
          <label>
            Difficulty:
            <select v-model="difficulty">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Starting Money:
            <input type="number" v-model.number="startingMoney" min="100" />
          </label>
        </div>
        <button @click="startGame">Start New Round</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// ======== State & Reactive Variables ========
const roundLogs = ref([]);
const currentRound = ref(1);

const deck = ref([]);
const hands = ref({});
const playerNames = ref([]);
const playerMoney = ref([]);
const playerBets = ref([]);
const playerFolded = ref([]);
const playerDialog = ref([]);
const playerPositions = ref([]);
const hasActed = ref([]);
const callAmount = computed(() => currentMaxBet.value - playerBets.value[0]);
const callLabel = computed(() => `Call $${callAmount.value}`);
const raiseChips = [10, 20, 50, 100, 200];
const minRaiseAmount = 10;
const raiseInput = ref(minRaiseAmount);
const maxRaiseAmount = computed(() => {
  return playerMoney.value[0] || 0;
});

const pot = ref(0);
const currentPlayer = ref(0);
const gamePhase = ref("idle");
const flop = ref([]);
const currentMaxBet = ref(0);

const numPlayers = ref(6);
const difficulty = ref("medium");
const startingMoney = ref(1000);
const dealerPosition = ref(0);

// ======== Computed Properties ========
const canCheck = computed(() => currentMaxBet.value === playerBets.value[0]);
const canCall = computed(() => currentMaxBet.value > playerBets.value[0] && playerMoney.value[0] >= currentMaxBet.value - playerBets.value[0]);
const canRaise = computed(() => playerMoney.value[0] > currentMaxBet.value - playerBets.value[0]);
const canFold = ref(true);
const canBet = ref(true);

function decreaseRaise() {
  raiseInput.value = Math.max(raiseInput.value - raiseStep, minRaiseAmount);
}

function increaseRaise() {
  raiseInput.value = Math.min(raiseInput.value + raiseStep, maxRaiseAmount.value);
}

// ======== Utility Functions ========
function addLog(message) {
  if (!roundLogs.value[currentRound.value - 1]) {
    roundLogs.value[currentRound.value - 1] = [];
  }
  roundLogs.value[currentRound.value - 1].push(message);
}

function createShuffledDeck() {
  const suits = ["♠", "♥", "♦", "♣"];
  const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  const cards = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      cards.push({ rank, suit });
    }
  }
  return cards.sort(() => Math.random() - 0.5);
}

function dealHands(count, cardsPerHand) {
  const result = {};
  for (let i = 0; i < count; i++) {
    result[i] = deck.value.splice(0, cardsPerHand);
  }
  return result;
}

function formatHand(hand) {
  if (!hand || !Array.isArray(hand)) return "";
  return hand.map((c) => c.rank + c.suit).join(" ");
}

function evaluateHand(hand) {
  const map = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 11, Q: 12, K: 13, A: 14 };
  return hand.reduce((acc, c) => acc + (map[c.rank] || 0), 0);
}

// ======== Game Setup ========
function startGame() {
  roundLogs.value = [];
  currentRound.value = 1;
  deck.value = createShuffledDeck();
  flop.value = [];
  pot.value = 0;
  currentPlayer.value = 0;
  gamePhase.value = "betting";
  currentMaxBet.value = 0;

  playerNames.value = Array.from({ length: numPlayers.value }, (_, i) => (i === 0 ? "You" : `AI ${i}`));
  hands.value = dealHands(numPlayers.value, 2);
  playerMoney.value = Array(numPlayers.value).fill(startingMoney.value);
  playerBets.value = Array(numPlayers.value).fill(0);
  playerFolded.value = Array(numPlayers.value).fill(false);
  playerDialog.value = Array(numPlayers.value).fill("");
  hasActed.value = Array(numPlayers.value).fill(false);
  assignPositions();

  const ante = 10;
  for (let i = 0; i < numPlayers.value; i++) {
    playerMoney.value[i] -= ante;
    playerBets.value[i] = ante;
    pot.value += ante;
    addLog(`${playerNames.value[i]} posts ante $${ante}`);
  }
  currentMaxBet.value = ante;
  addLog(`--- Round ${currentRound.value} ---`);
  nextTurn();
}

function assignPositions() {
  const labels = ["Dealer", "SB", "BB", "UTG", "MP", "CO"];
  for (let i = 0; i < numPlayers.value; i++) {
    const relative = (i - dealerPosition.value + numPlayers.value) % numPlayers.value;
    playerPositions.value[i] = labels[relative] || `P${i}`;
  }
}

// ======== Game Flow / Phases ========
async function nextTurn() {
  console.log("nextTurn called, currentPlayer:", currentPlayer.value);

  if (playerFolded.value.filter((f) => !f).length <= 1) {
    gamePhase.value = "showdown";
    determineWinner();
    return;
  }

  if (playerFolded.value[currentPlayer.value] || hasActed.value[currentPlayer.value]) {
    currentPlayer.value = (currentPlayer.value + 1) % numPlayers.value;
    await nextTurn();
    return;
  }

  if (currentPlayer.value === 0) {
    console.log("Waiting for player input...");
    return;
  }

  const action = getAIAction(currentPlayer.value);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  addLog(`${playerNames.value[currentPlayer.value]} chooses to ${action}`);
  handleAction(currentPlayer.value, action);
  hasActed.value[currentPlayer.value] = true;

  currentPlayer.value = (currentPlayer.value + 1) % numPlayers.value;

  if (hasActed.value.every((acted, i) => acted || playerFolded.value[i])) {
    hasActed.value = Array(numPlayers.value).fill(false);

    if (gamePhase.value === "betting") {
      dealInitialFlop();
      addLog("--- Flop ---");
      return;
    } else if (gamePhase.value === "flop") {
      revealTurnCard();
      addLog("--- Turn ---");
      return;
    } else if (gamePhase.value === "turn") {
      revealRiverCard();
      addLog("--- River ---");
      return;
    } else if (gamePhase.value === "river") {
      gamePhase.value = "showdown";
      determineWinner();
      return;
    }
  }

  await nextTurn();
}

function dealInitialFlop() {
  playerBets.value = Array(numPlayers.value).fill(0);
  currentMaxBet.value = 0;
  flop.value = deck.value.splice(0, 3);
  currentPlayer.value = 0;
  hasActed.value = Array(numPlayers.value).fill(false);
  gamePhase.value = "flop";
}

function revealTurnCard() {
  playerBets.value = Array(numPlayers.value).fill(0);
  currentMaxBet.value = 0;
  flop.value.push(deck.value.splice(0, 1)[0]);
  currentPlayer.value = 0;
  hasActed.value = Array(numPlayers.value).fill(false);
  gamePhase.value = "turn";
}

function revealRiverCard() {
  playerBets.value = Array(numPlayers.value).fill(0);
  currentMaxBet.value = 0;
  flop.value.push(deck.value.splice(0, 1)[0]);
  currentPlayer.value = 0;
  hasActed.value = Array(numPlayers.value).fill(false);
  gamePhase.value = "river";
}

function revealNextFlopCard() {
  flop.value.push(deck.value.splice(0, 1)[0]);
  currentPlayer.value = 0;
  hasActed.value = Array(numPlayers.value).fill(false);
}

// ======== Player Actions ========
async function playerAction(action, amount = 0) {
  if (action === "raise") {
    if (amount < minRaiseAmount.value) {
      addLog(`Raise must be at least $${minRaiseAmount.value}`);
      return;
    }
    if (amount > playerMoney.value[0]) {
      addLog("Not enough chips to raise that amount!");
      return;
    }
    playerMoney.value[0] -= amount;
    playerBets.value[0] += amount;
    pot.value += amount;
    currentMaxBet.value = Math.max(currentMaxBet.value, playerBets.value[0]);
    addLog(`${playerNames.value[0]} raises $${amount}`);
  }
  // handle other actions ...
  hasActed.value[0] = true;
  currentPlayer.value = 1;
  await nextTurn();
}

function handleAction(i, action) {
  let dialog = "";
  if (action === "fold") {
    playerFolded.value[i] = true;
    dialog = "I fold...";
  } else if (action === "raise") {
    const raiseAmount = 20;
    if (playerMoney.value[i] < raiseAmount) {
      dialog = "Can't raise, fold instead.";
      playerFolded.value[i] = true;
    } else {
      playerMoney.value[i] -= raiseAmount;
      playerBets.value[i] += raiseAmount;
      currentMaxBet.value = Math.max(currentMaxBet.value, playerBets.value[i]);
      pot.value += raiseAmount;
      dialog = "I raise!";
      hasActed.value = hasActed.value.map((_, idx) => playerFolded.value[idx] || idx === i);
    }
  } else if (action === "call") {
    const callAmt = currentMaxBet.value - playerBets.value[i];
    if (playerMoney.value[i] < callAmt) {
      playerFolded.value[i] = true;
      dialog = "Can't call. I fold.";
    } else {
      playerMoney.value[i] -= callAmt;
      playerBets.value[i] += callAmt;
      pot.value += callAmt;
      dialog = "I call.";
    }
  } else if (action === "check") {
    dialog = "Check.";
  }
  playerDialog.value[i] = `${playerNames.value[i]}: ${dialog}`;
}

// ======== AI Logic ========
function getAIAction(i) {
  const handValue = evaluateHand(hands.value[i]);
  const callAmount = currentMaxBet.value - playerBets.value[i];

  if (playerMoney.value[i] < callAmount) return "fold";

  if (callAmount === 0) {
    if (handValue > 20) return "raise";
    return "check";
  } else {
    if (handValue > 22) return "raise";
    if (handValue > 15) return "call";
    return "fold";
  }
}

// ======== Winner Calculation ========
function determineWinner() {
  const scores = playerNames.value
    .map((name, i) => ({
      name,
      score: evaluateHand(hands.value[i].concat(flop.value)),
      folded: playerFolded.value[i],
      index: i,
    }))
    .filter((p) => !p.folded)
    .sort((a, b) => b.score - a.score);

  if (scores.length === 0) {
    addLog("No winner - all folded.");
    gamePhase.value = "idle";
    return;
  }

  const winner = scores[0];
  playerMoney.value[winner.index] += pot.value;
  playerDialog.value[winner.index] = `${winner.name}: I win! 🎉`;
  addLog(`${winner.name} wins the pot of $${pot.value}!`);
  gamePhase.value = "idle";
  dealerPosition.value = (dealerPosition.value + 1) % numPlayers.value;
}
</script>
