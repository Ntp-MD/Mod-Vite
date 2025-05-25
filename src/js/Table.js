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

const numPlayers = ref(5);
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
  const raiseStep = 10;
  raiseInput.value = Math.max(raiseInput.value - raiseStep, minRaiseAmount);
}

function increaseRaise() {
  const raiseStep = 10;
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

function cardClass(card) {
  const suitClass = {
    "♠": "spade",
    "♥": "heart",
    "♦": "diamond",
    "♣": "club",
  };
  return suitClass[card.suit] || "";
}

function evaluateHand(hand) {
  const map = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 11, Q: 12, K: 13, A: 14 };
  return hand.reduce((acc, c) => acc + (map[c.rank] || 0), 0);
}

// ======== Helper: sleep ========
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
  // ข้ามผู้เล่นที่หมอบ
  while (playerFolded.value[currentPlayer.value]) {
    currentPlayer.value = (currentPlayer.value + 1) % playerNames.value.length;
  }

  // ถ้าคน active เหลือคนเดียว จบรอบทันที
  const activePlayers = playerFolded.value.filter((folded) => !folded).length;
  if (activePlayers === 1) {
    endRound();
    return;
  }

  // เช็คว่าทุกคนลงเดิมพันครบแล้วหรือยัง
  const allActed = hasActed.value.every((acted, idx) => acted || playerFolded.value[idx]);
  const allBetsEqual = playerBets.value.every((bet, idx) => playerFolded.value[idx] || bet === currentMaxBet.value);

  if (allActed && allBetsEqual) {
    if (gamePhase.value === "betting" && currentStage.value === "pre-flop") {
      revealFlop();
    } else if (gamePhase.value === "flop") {
      revealTurnCard();
    } else if (gamePhase.value === "turn") {
      revealRiverCard();
    } else if (gamePhase.value === "river") {
      determineWinner();
    }
    return;
  }

  // AI เล่นต่อถ้าเป็น AI เท่านั้น
  if (currentPlayer.value > 0) {
    await sleep(1000);
    aiAction(currentPlayer.value);
  }
}

function dealInitialFlop() {
  playerBets.value = Array(numPlayers.value).fill(0);
  currentMaxBet.value = 0;
  flop.value = deck.value.splice(0, 3);
  currentPlayer.value = 0;
  hasActed.value = Array(numPlayers.value).fill(false);
  gamePhase.value = "flop";
  addLog(`Flop: ${formatHand(flop.value)}`);
  nextTurn();
}

function revealFlop() {
  flop.value = deck.value.splice(0, 3);
  currentStage.value = "flop";
  resetBetsForNextRound();
  currentPlayer.value = 0;
  gamePhase.value = "flop";
  hasActed.value = Array(numPlayers.value).fill(false);
  addLog("Flop revealed: " + formatHand(flop.value));
  nextTurn();
}

function revealTurnCard() {
  flop.value.push(deck.value.splice(0, 1)[0]);
  currentStage.value = "turn";
  resetBetsForNextRound();
  currentPlayer.value = 0;
  gamePhase.value = "turn";
  hasActed.value = Array(numPlayers.value).fill(false);
  addLog("Turn card revealed: " + formatHand(flop.value.slice(-1)));
  nextTurn();
}

function revealRiverCard() {
  flop.value.push(deck.value.splice(0, 1)[0]);
  currentStage.value = "river";
  resetBetsForNextRound();
  currentPlayer.value = 0;
  gamePhase.value = "river";
  hasActed.value = Array(numPlayers.value).fill(false);
  addLog("River card revealed: " + formatHand(flop.value.slice(-1)));
  nextTurn();
}

function resetBetsForNextRound() {
  playerBets.value = Array(numPlayers.value).fill(0);
  currentMaxBet.value = 0;
}

// ======== Player Actions ========
async function playerAction(action, amount = 0) {
  if (action === "fold") {
    playerFolded.value[0] = true;
    addLog(`${playerNames.value[0]} folds.`);
    hasActed.value[0] = true;
    currentPlayer.value = 1;
    await nextTurn();
    return;
  }

  if (action === "raise") {
    if (amount < minRaiseAmount) {
      addLog(`Raise must be at least $${minRaiseAmount}`);
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

    hasActed.value[0] = true;
    currentPlayer.value = 1;
    await nextTurn();
    return;
  }

  if (action === "call") {
    const callAmt = currentMaxBet.value - playerBets.value[0];
    if (callAmt > playerMoney.value[0]) {
      addLog("Not enough chips to call!");
      return;
    }
    playerMoney.value[0] -= callAmt;
    playerBets.value[0] += callAmt;
    pot.value += callAmt;
    addLog(`${playerNames.value[0]} calls $${callAmt}`);
    hasActed.value[0] = true;
    currentPlayer.value = 1;
    await nextTurn();
    return;
  }

  if (action === "check") {
    addLog(`${playerNames.value[0]} checks.`);
    hasActed.value[0] = true;
    currentPlayer.value = 1;
    await nextTurn();
    return;
  }
}

// ======== AI Logic ========
function aiAction(playerIndex) {
  if (playerFolded.value[playerIndex]) {
    // AI หมอบแล้ว ข้ามไป
    currentPlayer.value = (currentPlayer.value + 1) % playerNames.value.length;
    nextTurn();
    return;
  }

  // AI ง่ายๆ: call ถ้าไม่แพง, raise ถ้าได้โอกาส, fold ถ้าแพงเกินไป
  const toCall = currentMaxBet.value - playerBets.value[playerIndex];
  const money = playerMoney.value[playerIndex];
  let action = "fold";
  let amount = 0;

  if (toCall === 0) {
    // AI เช็คได้
    if (money > 100 && Math.random() < 0.3) {
      action = "raise";
      amount = Math.min(raiseChips[Math.floor(Math.random() * raiseChips.length)], money);
    } else {
      action = "check";
    }
  } else {
    if (toCall <= money && Math.random() < 0.7) {
      action = "call";
    } else {
      action = "fold";
    }
  }

  if (action === "fold") {
    playerFolded.value[playerIndex] = true;
    addLog(`${playerNames.value[playerIndex]} folds.`);
  } else if (action === "call") {
    playerMoney.value[playerIndex] -= toCall;
    playerBets.value[playerIndex] += toCall;
    pot.value += toCall;
    addLog(`${playerNames.value[playerIndex]} calls $${toCall}`);
  } else if (action === "raise") {
    playerMoney.value[playerIndex] -= amount;
    playerBets.value[playerIndex] += amount;
    pot.value += amount;
    currentMaxBet.value = Math.max(currentMaxBet.value, playerBets.value[playerIndex]);
    addLog(`${playerNames.value[playerIndex]} raises $${amount}`);
  } else if (action === "check") {
    addLog(`${playerNames.value[playerIndex]} checks.`);
  }

  hasActed.value[playerIndex] = true;
  currentPlayer.value = (currentPlayer.value + 1) % playerNames.value.length;
  nextTurn();
}

// ======== End Round & Winner ========
function endRound() {
  gamePhase.value = "showdown";
  addLog("Round ended. Determining winner...");

  let bestPlayer = -1;
  let bestScore = -1;

  for (let i = 0; i < numPlayers.value; i++) {
    if (playerFolded.value[i]) continue;
    const combined = [...hands.value[i], ...flop.value];
    const score = evaluateHand(combined);
    if (score > bestScore) {
      bestScore = score;
      bestPlayer = i;
    }
  }

  if (bestPlayer >= 0) {
    // เพิ่มเงินผู้ชนะทันที
    playerMoney.value[bestPlayer] += pot.value;
    addLog(`${playerNames.value[bestPlayer]} wins the pot of $${pot.value} with score ${bestScore}!`);
  } else {
    addLog("No winner found.");
  }

  pot.value = 0;

  // เริ่มรอบใหม่หลัง 3 วินาที
  setTimeout(() => {
    currentRound.value++;
    dealerPosition.value = (dealerPosition.value + 1) % numPlayers.value;
    startGame();
  }, 3000);
}

/*
startGame();
*/
