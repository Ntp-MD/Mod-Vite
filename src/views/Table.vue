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
const allowedRaises = [10, 30, 50, 150, 300];

/* ============ Computed ============ */
const callAmount = computed(() => Math.max(0, currentMaxBet.value - (playerBets.value[0] || 0)));

const maxRaiseAmount = computed(() => playerMoney.value[0] + (playerBets.value[0] || 0));

const canCheck = computed(() => currentMaxBet.value === (playerBets.value[0] || 0));

const canCall = computed(
  () => currentMaxBet.value > (playerBets.value[0] || 0) && playerMoney.value[0] >= currentMaxBet.value - (playerBets.value[0] || 0)
);

const canRaise = computed(() => playerMoney.value[0] > currentMaxBet.value - (playerBets.value[0] || 0));

const lastRaiser = ref(null);

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

function getHandRank(hand) {
  const rankMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 11, Q: 12, K: 13, A: 14 };
  const ranks = hand.map((c) => rankMap[c.rank]).sort((a, b) => a - b);
  const suits = hand.map((c) => c.suit);

  const rankCounts = {};
  ranks.forEach((r) => (rankCounts[r] = (rankCounts[r] || 0) + 1));

  const values = Object.values(rankCounts).sort((a, b) => b - a);
  const isFlush = suits.every((s) => s === suits[0]);
  const isStraight = ranks.every((v, i, a) => i === 0 || v === a[i - 1] + 1) || JSON.stringify(ranks) === JSON.stringify([2, 3, 4, 5, 14]); // A-2-3-4-5

  if (isStraight && isFlush) return "Straight Flush";
  if (values[0] === 4) return "Four of a Kind";
  if (values[0] === 3 && values[1] === 2) return "Full House";
  if (isFlush) return "Flush";
  if (isStraight) return "Straight";
  if (values[0] === 3) return "Three of a Kind";
  if (values[0] === 2 && values[1] === 2) return "Two Pair";
  if (values[0] === 2) return "One Pair";
  return "High Card";
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
    addLog(`${playerNames.value[i]}  ${CostStartPool}`);
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
    addLog(`${playerNames.value[i]} posts $${CostStartPool}`);
  }
  currentMaxBet.value = CostStartPool;
  addLog(`--- Round ${currentRound.value} ---`);
  currentPlayer.value = 0;
  nextTurn();
}

/* ============ Game Flow / Turn Control ============ */
async function nextTurn() {
  while (true) {
    // If only one player remains
    if (playerFolded.value.filter((f) => !f).length <= 1) {
      gamePhase.value = "showdown";
      determineWinner();
      return;
    }

    // Skip folded or already-acted players
    if (!playerFolded.value[currentPlayer.value] && !hasActed.value[currentPlayer.value]) {
      break; // valid player's turn
    }

    // Move to next player
    currentPlayer.value = (currentPlayer.value + 1) % numPlayers.value;

    // All players acted or folded
    if (hasActed.value.every((acted, i) => acted || playerFolded.value[i])) {
      // Reset raise tracker
      hasActed.value = Array(numPlayers.value).fill(false);
      playerBets.value = Array(numPlayers.value).fill(0);
      currentMaxBet.value = 0;
      lastRaiser.value = null;

      // Proceed to next game phase
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
      setTimeout(() => nextTurn(), 100);
      return;
    }
    addLog(`${playerNames.value[currentPlayer.value]}: ${playerDialog.value[currentPlayer.value]}`);
  }

  // If it's your turn
  if (currentPlayer.value === 0) {
    addLog("Your turn.");
    return;
  }

  // AI action
  const action = getAIAction(currentPlayer.value);
  await new Promise((resolve) => setTimeout(resolve, 200));
  addLog(`${playerNames.value[currentPlayer.value]} chooses to ${action}`);
  handleAction(currentPlayer.value, action);
  hasActed.value[currentPlayer.value] = true;

  // Advance turn
  currentPlayer.value = (currentPlayer.value + 1) % numPlayers.value;

  // If all have acted again, move to next phase
  // After incrementing currentPlayer
  if (hasActed.value.every((acted, i) => acted || playerFolded.value[i])) {
    if (currentPlayer.value === lastRaiser.value) {
      // All players acted since the last raise
      hasActed.value = Array(numPlayers.value).fill(false);
      playerBets.value = Array(numPlayers.value).fill(0);
      currentMaxBet.value = 0;
      lastRaiser.value = null; // Reset

      // Proceed to next game phase
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
  }

  // Call again to move to next valid turn
  setTimeout(() => nextTurn(), 100); // SAFE async loop
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

/* ======== Player Actions (block invalid moves) ======== */
function playerAction(action, amount = 0) {
  if (currentPlayer.value !== 0) return;

  let msg = "";
  if (action === "fold") {
    playerFolded.value[0] = true;
    msg = "You folded.";
  } else if (action === "check") {
    msg = "You checked.";
  } else if (action === "call") {
    const call = callAmount.value;
    playerMoney.value[0] -= call;
    playerBets.value[0] += call;
    pot.value += call;
    msg = `You called $${call}`;
  } else if (action === "raise") {
    const call = callAmount.value;
    const raise = Math.max(minRaiseAmount, amount);
    const total = call + raise;

    if (playerMoney.value[0] < total) {
      msg = "Not enough money to raise.";
      return;
    }

    playerMoney.value[0] -= total;
    playerBets.value[0] += total;
    pot.value += total;
    currentMaxBet.value = playerBets.value[0];
    lastRaiser.value = 0;
    msg = `You raised $${raise} (to $${playerBets.value[0]})`;
  }

  addLog(msg);
  hasActed.value[0] = true;
  currentPlayer.value = (currentPlayer.value + 1) % numPlayers.value;

  setTimeout(() => nextTurn(), 100);
}
/* ============ AI Decision Logic ============ */
function getAIAction(index) {
  const bet = playerBets.value[index];
  const toCall = currentMaxBet.value - bet;
  const money = playerMoney.value[index];

  if (playerFolded.value[index]) return "fold";

  // Simple logic based on random decisions and available money
  if (toCall === 0) {
    // No one has raised yet; consider checking or raising
    if (Math.random() < 0.7) {
      return "check";
    } else {
      return "raise";
    }
  } else if (toCall <= money * 0.2) {
    // Low call amount compared to available money
    if (Math.random() < 0.7) {
      return "call";
    } else {
      return "raise";
    }
  } else if (toCall <= money * 0.5) {
    // Moderate call amount
    if (Math.random() < 0.5) {
      return "call";
    } else {
      return "fold";
    }
  } else {
    // Too expensive
    return "fold";
  }
}

/* ======== Handle AI Actions with Validity Checks ======== */
function handleAction(i, action) {
  const playerChips = playerMoney.value[i];
  const bet = playerBets.value[i] || 0;
  const toCall = currentMaxBet.value - bet;

  if (action === "fold") {
    playerFolded.value[i] = true;
  } else if (action === "raise") {
    const maxPossibleRaise = playerChips - toCall;
    let raiseAmount = Math.min(Math.floor((minRaiseAmount + Math.random() * (maxPossibleRaise - minRaiseAmount + 1)) / 10) * 10, maxPossibleRaise);

    const totalRaise = toCall + raiseAmount;

    if (playerChips < totalRaise || raiseAmount < minRaiseAmount) {
      playerFolded.value[i] = true;
    } else {
      playerMoney.value[i] -= totalRaise;
      playerBets.value[i] += totalRaise;
      pot.value += totalRaise;
      currentMaxBet.value = Math.max(currentMaxBet.value, playerBets.value[i]);
      lastRaiser.value = i;
      addLog(`${playerNames.value[i]} raised $${raiseAmount} (to $${playerBets.value[i]})`);

      hasActed.value = hasActed.value.map((_, idx) => playerFolded.value[idx] || idx === i);
    }
  } else if (action === "call") {
    if (playerChips >= toCall) {
      playerMoney.value[i] -= toCall;
      playerBets.value[i] += toCall;
      pot.value += toCall;
    } else {
      playerFolded.value[i] = true;
    }
  } else if (action === "check") {
    if (toCall > 0) {
      playerFolded.value[i] = true;
    }
  }

  hasActed.value[i] = true;
}

/* ============ Winner & End Round ============ */
function determineWinner() {
  const activePlayers = [];
  for (let i = 0; i < numPlayers.value; i++) {
    if (!playerFolded.value[i]) {
      const fullHand = hands.value[i].concat(flop.value);
      activePlayers.push({
        index: i,
        hand: fullHand,
        rank: evaluateHand(fullHand), // numerical score
        rankName: getHandRank(fullHand), // e.g., "Two Pair"
      });
    }
  }

  // Sort by rank (higher better)
  activePlayers.sort((a, b) => b.rank - a.rank);

  // Determine winners (handle ties)
  const bestRank = activePlayers[0].rank;
  const winners = activePlayers.filter((p) => p.rank === bestRank);

  // Divide pot
  const potShare = Math.floor(pot.value / winners.length);
  winners.forEach((w) => {
    playerMoney.value[w.index] += potShare;
    addLog(`${playerNames.value[w.index]} wins with ${w.rankName} and receives $${potShare}`);
  });

  // Remainder (if any) goes to the first winner
  const remainder = pot.value % winners.length;
  if (remainder > 0) {
    playerMoney.value[winners[0].index] += remainder;
    addLog(`${playerNames.value[winners[0].index]} receives an extra $${remainder} from remainder`);
  }

  pot.value = 0;

  addLog(`--- End of Round ${currentRound.value} ---`);

  // Automatically start new round after delay
  setTimeout(() => startNewRound(), 3000);
}

/* ============ Raise Control ============ */
function increaseRaise(amount) {
  raiseInput.value = Math.min(maxRaiseAmount.value, raiseInput.value + amount);
}
function decreaseRaise(amount) {
  raiseInput.value = Math.max(minRaiseAmount, raiseInput.value - amount);
}
function setRaise(amount) {
  raiseInput.value = amount;
}
</script>
