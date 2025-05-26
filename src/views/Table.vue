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

        <div class="PlayerPosition">
          <div>${{ playerMoney[i] }}</div>
          <div>({{ playerPositions[i] }})</div>
        </div>
        <div v-if="i === 0 || !playerFolded[i]" class="PlayerHand">
          <div v-for="(card, cIndex) in hands[i]" :key="cIndex" class="CardBody" :class="getSuitClass(card.suit)">
            <div class="RankCard">{{ card.rank }}</div>
            <div class="SuitCard">{{ card.suit }}</div>
          </div>
        </div>
        <div class="PlayerBet">Bet: ${{ playerBets[i] }}</div>
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
        <button @click="startNewRound">Next</button>
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
const pot = ref(0);
const currentPlayer = ref(0);
const gamePhase = ref("idle");
const flop = ref([]);
const currentMaxBet = ref(0);
const numPlayers = ref(5);
const difficulty = ref("hard");
const startingMoney = ref(1000);
const dealerPosition = ref(0);
const raiseChips = [10, 20, 30, 50, 100];
const minRaiseAmount = 10;
const raiseInput = ref(minRaiseAmount);

const callAmount = computed(() => Math.max(0, currentMaxBet.value - (playerBets.value[0] || 0)));

const maxRaiseAmount = computed(() => {
  // Player 0's max raise = their money + their current bet minus currentMaxBet (to allow re-raise)
  return playerMoney.value[0] + (playerBets.value[0] || 0);
});

const canCheck = computed(() => currentMaxBet.value === (playerBets.value[0] || 0));
const canCall = computed(
  () => currentMaxBet.value > (playerBets.value[0] || 0) && playerMoney.value[0] >= currentMaxBet.value - (playerBets.value[0] || 0)
);
const canRaise = computed(() => playerMoney.value[0] > currentMaxBet.value - (playerBets.value[0] || 0));

// ======== Utility Functions ========
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
  // Shuffle deck
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
  // Simple sum of card ranks for demo purposes
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

  const CostStartPool = 10;
  for (let i = 0; i < numPlayers.value; i++) {
    playerMoney.value[i] -= CostStartPool;
    playerBets.value[i] = CostStartPool;
    pot.value += CostStartPool;
    addLog(`${playerNames.value[i]} Send $${CostStartPool} to Pool`);
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
  dealerPosition.value = (dealerPosition.value + 1) % numPlayers.value; // Move dealer position
  currentRound.value++;
  roundLogs.value.push([]); // New log array for new round

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

function assignPositions() {
  const labels = ["Dealer", "SB", "BB", "UTG", "MP", "CO"];
  for (let i = 0; i < numPlayers.value; i++) {
    const relative = (i - dealerPosition.value + numPlayers.value) % numPlayers.value;
    playerPositions.value[i] = labels[relative] || `P${i}`;
  }
}

// ======== Game Flow / Phases ========
async function nextTurn() {
  // Skip folded players or those already acted in this betting round
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
    // Player's turn - wait for input
    addLog("Your turn.");
    return;
  }

  // AI turn
  const action = getAIAction(currentPlayer.value);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  addLog(`${playerNames.value[currentPlayer.value]} chooses to ${action}`);
  handleAction(currentPlayer.value, action);
  hasActed.value[currentPlayer.value] = true;

  // Move to next player
  currentPlayer.value = (currentPlayer.value + 1) % numPlayers.value;

  // If all acted or folded, progress phase
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

// ======== Player Actions ========
async function playerAction(action, amount = 0) {
  if (currentPlayer.value !== 0) return; // Only allow player 0 to act here

  if (action === "raise") {
    if (amount < minRaiseAmount) {
      addLog(`Raise must be at least $${minRaiseAmount}`);
      return;
    }
    if (amount > maxRaiseAmount.value) {
      addLog("Not enough chips to raise that amount!");
      return;
    }
    const toCall = currentMaxBet.value - (playerBets.value[0] || 0);
    const totalRaise = toCall + amount; // raise includes call + raise amount

    if (playerMoney.value[0] < totalRaise) {
      addLog("Not enough chips to raise that amount!");
      return;
    }

    playerMoney.value[0] -= totalRaise;
    playerBets.value[0] += totalRaise;
    pot.value += totalRaise;
    currentMaxBet.value = playerBets.value[0];
    addLog(`${playerNames.value[0]} raises $${amount}`);
  } else if (action === "call") {
    const toCall = currentMaxBet.value - (playerBets.value[0] || 0);
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
    const raiseAmount = 20; // AI fixed raise amount
    if (playerMoney.value[i] < raiseAmount) {
      dialog = "Can't raise, fold instead.";
      playerFolded.value[i] = true;
    } else {
      playerMoney.value[i] -= raiseAmount;
      playerBets.value[i] += raiseAmount;
      currentMaxBet.value = Math.max(currentMaxBet.value, playerBets.value[i]);
      pot.value += raiseAmount;
      dialog = "I raise!";
      // Reset hasActed for all except folded and current raiser (to force another round)
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

// Simple AI logic based on difficulty (only medium here for example)
function getAIAction(i) {
  if (playerFolded.value[i]) return "fold";
  if (difficulty.value === "easy") {
    return Math.random() > 0.5 ? "call" : "fold";
  } else if (difficulty.value === "medium") {
    if (playerBets.value[i] < currentMaxBet.value) {
      return "call";
    }
    return Math.random() > 0.3 ? "check" : "raise";
  } else {
    // hard
    if (playerBets.value[i] < currentMaxBet.value) return "call";
    return "raise";
  }
}

// ======== Winner Determination ========
function determineWinner() {
  const activePlayers = playerFolded.value.map((folded, i) => (!folded ? i : null)).filter((v) => v !== null);
  if (activePlayers.length === 1) {
    addLog(`${playerNames.value[activePlayers[0]]} wins the pot of $${pot.value} (all others folded)`);
    playerMoney.value[activePlayers[0]] += pot.value;
    pot.value = 0;
  } else {
    const handValues = activePlayers.map((i) => {
      const combined = [...hands.value[i], ...flop.value];
      return { player: i, value: evaluateHand(combined) };
    });
    handValues.sort((a, b) => b.value - a.value);
    const winner = handValues[0].player;
    addLog(`${playerNames.value[winner]} wins the pot of $${pot.value} with best hand.`);
    playerMoney.value[winner] += pot.value;
    pot.value = 0;
  }
  // Don't set idle, instead start new round after delay
  setTimeout(() => {
    startNewRound();
  }, 3000); // 3 seconds delay to see the winner logs
}

// ======== Raise Amount Controls ========
function decreaseRaise(amount) {
  if (raiseInput.value - amount >= minRaiseAmount) {
    raiseInput.value -= amount;
  }
}

function increaseRaise(amount) {
  if (raiseInput.value + amount <= maxRaiseAmount.value) {
    raiseInput.value += amount;
  }
}

function setRaise(amount) {
  if (amount >= minRaiseAmount && amount <= maxRaiseAmount.value) {
    raiseInput.value = amount;
  }
}
</script>
