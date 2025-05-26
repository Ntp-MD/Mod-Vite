<style scoped>
@import url(/src/css/Table.css);
</style>

<template>
  <div class="TableLayout">
    <div class="PlayerLineup">
      <div>Player Lineup</div>
      <div
        v-for="(name, i) in playerNames"
        :key="i"
        class="PlayerFrame"
        :class="{
          active: i === currentPlayer,
          folded: playerFolded[i],
          you: i === 0 && i === currentPlayer,
          ai: i !== 0 && i === currentPlayer,
        }"
      >
        <div class="PlayerName">
          {{ name }}
        </div>

        <div>
          <div>${{ playerMoney[i] }}</div>
          <div>({{ playerPositions[i] }})</div>
        </div>
        <div v-if="i === 0 || !playerFolded[i]" class="PlayerHand">
          <div v-for="(card, cIndex) in hands[i]" :key="cIndex" class="CardBody" :class="getSuitClass(card.suit)">
            <div class="RankCard">{{ card.rank }}</div>
            <div class="SuitCard">{{ card.suit }}</div>
          </div>
        </div>
        <div>Bet: ${{ playerBets[i] }}</div>
      </div>
    </div>
    <div class="TimelineLog">
      <div>Action Timeline</div>
      <div v-for="(round, index) in roundLogs" :key="index" class="RoundLog">
        <h4>Round {{ index + 1 }}</h4>
        <div>
          <div v-for="(entry, i) in round" :key="i">{{ entry }}</div>
        </div>
      </div>
    </div>
    <div class="TableBoard">
      <div class="TableSetting">
        <button @click="startGame" :disabled="gamePhase !== 'idle'">Start Game</button>
        <button @click="resetGame">Reset</button>
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

      <div class="PlayerActionGroup">
        <button :disabled="!canCheck" @click="playerAction('check')">Check</button>
        <button :disabled="!canCall" @click="playerAction('call', callAmount)">{{ `Call $${callAmount}` }}</button>
        <button :disabled="!canRaise" @click="playerAction('raise', raiseInput)">Raise ${{ raiseInput }}</button>
        <button @click="playerAction('fold')">Fold</button>
      </div>

      <div class="ChipGroup">
        <div v-for="chip in raiseChips" :key="chip" class="ChipControl">
          <button @click="decreaseRaise(chip)">-</button>
          <button @click="setRaise(chip)">${{ chip }}</button>
          <button @click="increaseRaise(chip)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* ================== Imports ================== */
import { ref, computed } from "vue";

/* ============ Reactive State / Refs ============ */
const roundLogs = ref([]);
const currentRound = ref(1);
const deck = ref([]);
const hands = ref({});
const flop = ref([]);
const pot = ref(0);
const currentPlayer = ref(0);
const gamePhase = ref("idle");
const currentMaxBet = ref(0);
const raiseInput = ref(10);

const numPlayers = ref(5);
const startingMoney = ref(1000);
const dealerPosition = ref(0);

const playerNames = ref([]);
const playerMoney = ref([]);
const playerBets = ref([]);
const playerFolded = ref([]);
const playerDialog = ref([]);
const playerPositions = ref([]);
const hasActed = ref([]);

/* ============ Constants ============ */
const raiseChips = [10, 20, 30, 50, 100];
const minRaiseAmount = 10;

/* ============ Computed ============ */
const callAmount = computed(() => Math.max(0, currentMaxBet.value - (playerBets.value[0] || 0)));

const maxRaiseAmount = computed(() => playerMoney.value[0] + (playerBets.value[0] || 0));

const canCheck = computed(() => currentMaxBet.value === (playerBets.value[0] || 0));

const canCall = computed(
  () => currentMaxBet.value > (playerBets.value[0] || 0) && playerMoney.value[0] >= currentMaxBet.value - (playerBets.value[0] || 0)
);

const canRaise = computed(() => playerMoney.value[0] > currentMaxBet.value - (playerBets.value[0] || 0));

/* ============ Utility Functions ============ */
function addLog(message) {
  if (!roundLogs.value[currentRound.value - 1]) {
    roundLogs.value[currentRound.value - 1] = [];
  }
  roundLogs.value[currentRound.value - 1].push(message);
}

function getSuitClass(suit) {
  switch (suit) {
    case "♠":
      return "spades";
    case "♥":
      return "hearts";
    case "♦":
      return "diamonds";
    case "♣":
      return "clubs";
    default:
      return "";
  }
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
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

function dealHands(count, cardsPerHand) {
  const result = {};
  for (let i = 0; i < count; i++) {
    result[i] = deck.value.splice(0, cardsPerHand);
  }
  return result;
}

function evaluateHand(hand) {
  const map = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 11, Q: 12, K: 13, A: 14 };
  return hand.reduce((acc, c) => acc + (map[c.rank] || 0), 0);
}

function assignPositions() {
  const labels = ["Dealer", "SB", "BB", "UTG", "MP", "CO"];
  for (let i = 0; i < numPlayers.value; i++) {
    const relative = (i - dealerPosition.value + numPlayers.value) % numPlayers.value;
    playerPositions.value[i] = labels[relative] || `P${i}`;
  }
}

/* ============ Game Setup & Reset ============ */
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

  const CostStartPool = 10;
  for (let i = 0; i < numPlayers.value; i++) {
    playerMoney.value[i] -= CostStartPool;
    playerBets.value[i] = CostStartPool;
    pot.value += CostStartPool;
    addLog(`${playerNames.value[i]}  $${CostStartPool}`);
  }
  currentMaxBet.value = CostStartPool;
  addLog(`--- Round ${currentRound.value} ---`);
  currentPlayer.value = 0;
  nextTurn();
}

function resetGame() {
  dealerPosition.value = 0;
  currentRound.value = 1;
  roundLogs.value = [];
  gamePhase.value = "idle";
  playerNames.value = [];
  playerMoney.value = [];
  playerBets.value = [];
  playerFolded.value = [];
  playerDialog.value = [];
  playerPositions.value = [];
  hasActed.value = [];
  flop.value = [];
  pot.value = 0;
  currentPlayer.value = 0;
  deck.value = [];
  hands.value = {};
  raiseInput.value = minRaiseAmount;

  addLog("Game reset. Configure settings and click 'Start Game' to begin.");
}

function startNewRound() {
  dealerPosition.value = (dealerPosition.value + 1) % numPlayers.value;
  currentRound.value++;
  roundLogs.value.push([]);
  deck.value = createShuffledDeck();
  flop.value = [];
  pot.value = 0;
  currentPlayer.value = 0;
  gamePhase.value = "betting";
  currentMaxBet.value = 0;

  hands.value = dealHands(numPlayers.value, 2);
  playerBets.value = Array(numPlayers.value).fill(0);
  playerFolded.value = Array(numPlayers.value).fill(false);
  playerDialog.value = Array(numPlayers.value).fill("");
  hasActed.value = Array(numPlayers.value).fill(false);

  assignPositions();

  const CostStartPool = 10;
  for (let i = 0; i < numPlayers.value; i++) {
    playerMoney.value[i] -= CostStartPool;
    playerBets.value[i] = CostStartPool;
    pot.value += CostStartPool;
    addLog(`${playerNames.value[i]} posts CostStartPool $${CostStartPool}`);
  }
  currentMaxBet.value = CostStartPool;
  addLog(`--- Round ${currentRound.value} ---`);
  currentPlayer.value = 0;
  nextTurn();
}

/* ============ Game Flow / Turn Control ============ */
async function nextTurn() {
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
    addLog("Your turn.");
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
    playerBets.value = Array(numPlayers.value).fill(0);
    currentMaxBet.value = 0;

    if (gamePhase.value === "betting") {
      dealInitialFlop();
      addLog("--- Flop ---");
    } else if (gamePhase.value === "flop") {
      revealTurnCard();
      addLog("--- Turn ---");
    } else if (gamePhase.value === "turn") {
      revealRiverCard();
      addLog("--- River ---");
    } else if (gamePhase.value === "river") {
      gamePhase.value = "showdown";
      determineWinner();
      return;
    }

    currentPlayer.value = 0;
  }

  await nextTurn();
}

/* ============ Dealing Phases ============ */
function dealInitialFlop() {
  flop.value = deck.value.splice(0, 3);
  gamePhase.value = "flop";
  hasActed.value = Array(numPlayers.value).fill(false);
}

function revealTurnCard() {
  flop.value.push(deck.value.splice(0, 1)[0]);
  gamePhase.value = "turn";
  hasActed.value = Array(numPlayers.value).fill(false);
}

function revealRiverCard() {
  flop.value.push(deck.value.splice(0, 1)[0]);
  gamePhase.value = "river";
  hasActed.value = Array(numPlayers.value).fill(false);
}

/* ============ Player Actions ============ */
async function playerAction(action, amount = 0) {
  if (currentPlayer.value !== 0) return;

  const toCall = currentMaxBet.value - (playerBets.value[0] || 0);

  if (action === "raise") {
    const totalRaise = toCall + amount;
    if (amount < minRaiseAmount || amount > maxRaiseAmount.value || playerMoney.value[0] < totalRaise) {
      addLog("Invalid raise amount.");
      return;
    }
    playerMoney.value[0] -= totalRaise;
    playerBets.value[0] += totalRaise;
    pot.value += totalRaise;
    currentMaxBet.value = playerBets.value[0];
    addLog(`${playerNames.value[0]} raises $${amount}`);
  } else if (action === "call") {
    if (playerMoney.value[0] < toCall) {
      addLog("Not enough chips to call!");
      return;
    }
    playerMoney.value[0] -= toCall;
    playerBets.value[0] += toCall;
    pot.value += toCall;
    addLog(`${playerNames.value[0]} calls $${toCall}`);
  } else if (action === "check") {
    if (currentMaxBet.value > (playerBets.value[0] || 0)) {
      addLog("Cannot check, must call or fold.");
      return;
    }
    addLog(`${playerNames.value[0]} checks.`);
  } else if (action === "fold") {
    playerFolded.value[0] = true;
    addLog(`${playerNames.value[0]} folds.`);
  }

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
      playerFolded.value[i] = true;
      dialog = "Can't raise, fold instead.";
    } else {
      playerMoney.value[i] -= raiseAmount;
      playerBets.value[i] += raiseAmount;
      currentMaxBet.value = Math.max(currentMaxBet.value, playerBets.value[i]);
      pot.value += raiseAmount;
      dialog = "I raise!";
      hasActed.value = hasActed.value.map((_, idx) => playerFolded.value[idx] || idx === i);
    }
  } else if (action === "call") {
    const toCall = currentMaxBet.value - (playerBets.value[i] || 0);
    if (playerMoney.value[i] >= toCall) {
      playerMoney.value[i] -= toCall;
      playerBets.value[i] += toCall;
      pot.value += toCall;
      dialog = "I call.";
    } else {
      playerFolded.value[i] = true;
      dialog = "Can't call, so fold.";
    }
  } else if (action === "check") {
    dialog = "I check.";
  }

  playerDialog.value[i] = dialog;
  hasActed.value[i] = true;
}

function getAIAction(i) {
  if (playerFolded.value[i]) return "fold";

  const bet = playerBets.value[i];
  const maxBet = currentMaxBet.value;

  const bluff = Math.random() < 0.2;
  const trap = Math.random() < 0.15;
  const aggressive = Math.random() < 0.7;

  if (bet < maxBet) return bluff ? "raise" : "call";
  return trap ? "check" : aggressive ? "raise" : "check";
}

/* ============ Winner & End Round ============ */
function determineWinner() {
  const activePlayers = playerFolded.value.map((f, i) => (!f ? i : null)).filter((v) => v !== null);
  if (activePlayers.length === 1) {
    const winner = activePlayers[0];
    addLog(`${playerNames.value[winner]} wins the pot of $${pot.value} (all others folded)`);
    playerMoney.value[winner] += pot.value;
  } else {
    const handValues = activePlayers.map((i) => ({
      player: i,
      value: evaluateHand([...hands.value[i], ...flop.value]),
    }));
    handValues.sort((a, b) => b.value - a.value);
    const winner = handValues[0].player;
    addLog(`${playerNames.value[winner]} wins the pot of $${pot.value} with best hand.`);
    playerMoney.value[winner] += pot.value;
  }
  pot.value = 0;
  setTimeout(() => startNewRound(), 3000);
}

/* ============ Raise Control ============ */
function increaseRaise(amount) {
  if (raiseInput.value + amount <= maxRaiseAmount.value) {
    raiseInput.value += amount;
  }
}

function decreaseRaise(amount) {
  if (raiseInput.value - amount >= minRaiseAmount) {
    raiseInput.value -= amount;
  }
}

function setRaise(amount) {
  if (amount >= minRaiseAmount && amount <= maxRaiseAmount.value) {
    raiseInput.value = amount;
  }
}
</script>
