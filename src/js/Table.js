import { ref, computed } from "vue";

export const autoPlay = ref(true);

export const roundLogs = ref([]);
const currentRound = ref(1);
const deck = ref([]);
export const hands = ref({});
export const flop = ref([]);
export const pot = ref(0);
export const currentPlayer = ref(0);
export const gamePhase = ref("idle");
const currentMaxBet = ref(0);
export const raiseInput = ref(0);
const costRound = 10;
const smallBlind = costRound * 2;
const bigBlind = costRound * 4;
export const minRaiseAmount = costRound;
const numPlayers = ref(6);
export const playerColors = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"];
const startingMoney = ref(500);
export const customStartingMoney = ref([1000, 1000, 1000, 1000, 1000, 1000]);
const dealerPosition = ref(0);
const roundEnded = ref(true);

export const playerNames = ref([]);
export const playerMoney = ref([]);
export const playerContribution = ref([]);
export const playerBets = ref([]);
export const playerFolded = ref([]);
const playerDialog = ref([]);
export const playerPositions = ref([]);
export const isPlayerBusted = computed(() => playerMoney.value[0] === 0);
const hasActed = ref([]);

export const raiseChips = [10, 20, 50, 100];

export const callAmount = computed(() => Math.max(0, currentMaxBet.value - (playerBets.value[0] || 0)));
export const maxRaiseAmount = computed(() => playerMoney.value[0] + (playerBets.value[0] || 0));
export const canCheck = computed(() => {
  if (gamePhase.value === "idle") {
    return false;
  }
  return currentMaxBet.value === (playerBets.value[0] || 0);
});
export const canCall = computed(
  () => currentMaxBet.value > (playerBets.value[0] || 0) && playerMoney.value[0] >= currentMaxBet.value - (playerBets.value[0] || 0)
);
export const canRaise = computed(() => {
  return (
    playerMoney.value[0] > currentMaxBet.value - (playerBets.value[0] || 0) && raiseInput.value >= minRaiseAmount // Require a valid raise amount
  );
});
export const canFold = computed(() => {
  return true;
});
export const canAll = computed(() => playerMoney.value[0] > 0 && gamePhase.value !== "idle" && gamePhase.value !== "showdown");

const lastRaiser = ref(null);

export const opponentStats = [
  { aggression: 0.5, tightness: 0.5 },
  { aggression: 0.5, tightness: 0.5 },
  { aggression: 0.5, tightness: 0.5 },
  { aggression: 0.5, tightness: 0.5 },
  { aggression: 0.5, tightness: 0.5 },
  { aggression: 0.5, tightness: 0.5 },
];

function colorizePlayerNames(message) {
  playerNames.value.forEach((name, idx) => {
    const regex = new RegExp(`\\b${name}\\b`, "g");
    message = message.replace(regex, `<span class="player-log-color" style="color: ${playerColors[idx]}">${name}</span>`);
  });
  return message;
}

export function addLog(message) {
  if (!roundLogs.value[currentRound.value - 1]) {
    roundLogs.value[currentRound.value - 1] = [];
  }
  roundLogs.value[currentRound.value - 1].push(colorizePlayerNames(message));
}

export function getSuitClass(suit) {
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

function getRankValue(rank) {
  const rankMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 11, Q: 12, K: 13, A: 14 };
  return rankMap[rank];
}

function getFlushSuit(hand) {
  const suitCounts = {};
  for (const card of hand) {
    suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
    if (suitCounts[card.suit] >= 5) return card.suit;
  }
  return null;
}

function getStraight(ranksArr) {
  let arr = [...new Set(ranksArr)].sort((a, b) => b - a);
  if (arr.includes(14)) arr.push(1);
  for (let i = 0; i <= arr.length - 5; i++) {
    let ok = true;
    for (let j = 1; j < 5; j++) {
      if (arr[i + j] !== arr[i] - j) {
        ok = false;
        break;
      }
    }
    if (ok) return arr.slice(i, i + 5);
  }
  return null;
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

function assignPositions() {
  dealerPosition.value = Math.floor(Math.random() * numPlayers.value);
  const labels = ["Dealer", "SB", "BB", "UTG", "MP", "CO"];
  for (let i = 0; i < numPlayers.value; i++) {
    const relative = (i - dealerPosition.value + numPlayers.value) % numPlayers.value;
    playerPositions.value[i] = labels[relative] || `P${i}`;
  }
}

function removeBrokePlayers() {
  // If the human player is busted, end the game
  if (playerMoney.value[0] === 0) {
    gamePhase.value = "idle";
    addLog("You are busted. Game over!");
    return;
  }
  const activeIndexes = playerMoney.value.map((money, i) => (money > 0 ? i : -1)).filter((i) => i !== -1);
  playerMoney.value = activeIndexes.map((i) => playerMoney.value[i]);
  playerNames.value = activeIndexes.map((i) => playerNames.value[i]);
  playerBets.value = activeIndexes.map((i) => playerBets.value[i] || 0);
  playerFolded.value = activeIndexes.map((i) => playerFolded.value[i] || false);
  playerDialog.value = activeIndexes.map((i) => playerDialog.value[i] || "");
  hasActed.value = activeIndexes.map((i) => hasActed.value[i] || false);
  hands.value = activeIndexes.map((i) => hands.value[i]);
  numPlayers.value = playerMoney.value.length;
}

function evaluateHand(hand) {
  const ranks = hand.map((c) => getRankValue(c.rank));
  /*
  const suits = hand.map((c) => c.suit);
  */
  const rankCounts = {};
  for (let r of ranks) rankCounts[r] = (rankCounts[r] || 0) + 1;
  const flushSuit = getFlushSuit(hand);
  let flushCards = [];
  if (flushSuit) {
    flushCards = hand
      .filter((c) => c.suit === flushSuit)
      .map((c) => getRankValue(c.rank))
      .sort((a, b) => b - a);
  }
  let straightFlush = null;
  if (flushCards.length >= 5) {
    straightFlush = getStraight(flushCards);
  }
  const uniqueRanks = [...new Set(ranks)].sort((a, b) => b - a);
  const groups = Object.entries(rankCounts)
    .map(([val, count]) => ({ val: +val, count }))
    .sort((a, b) => b.count - a.count || b.val - a.val);
  if (straightFlush) {
    if (straightFlush[0] === 14) {
      return { handName: "Royal Flush", handRank: 10, values: straightFlush };
    }
    return { handName: "Straight Flush", handRank: 9, values: straightFlush };
  }
  if (groups[0].count === 4) {
    const kicker = uniqueRanks.find((r) => r !== groups[0].val);
    return { handName: "Four of a Kind", handRank: 8, values: [groups[0].val, kicker] };
  }
  if (groups[0].count === 3 && groups[1] && groups[1].count >= 2) {
    return { handName: "Full House", handRank: 7, values: [groups[0].val, groups[1].val] };
  }
  if (flushCards.length >= 5) {
    return { handName: "Flush", handRank: 6, values: flushCards.slice(0, 5) };
  }
  const straight = getStraight(ranks);
  if (straight) {
    return { handName: "Straight", handRank: 5, values: straight };
  }
  if (groups[0].count === 3) {
    const kickers = uniqueRanks.filter((r) => r !== groups[0].val).slice(0, 2);
    return { handName: "Three of a Kind", handRank: 4, values: [groups[0].val, ...kickers] };
  }
  if (groups[0].count === 2 && groups[1] && groups[1].count === 2) {
    const pair1 = groups[0].val;
    const pair2 = groups[1].val;
    const kicker = uniqueRanks.find((r) => r !== pair1 && r !== pair2);
    return { handName: "Two Pair", handRank: 3, values: [pair1, pair2, kicker] };
  }
  if (groups[0].count === 2) {
    const pair = groups[0].val;
    const kickers = uniqueRanks.filter((r) => r !== pair).slice(0, 3);
    return { handName: "One Pair", handRank: 2, values: [pair, ...kickers] };
  }
  return { handName: "High Card", handRank: 1, values: uniqueRanks.slice(0, 5) };
}

export function updateOpponentStats(playerIndex, action) {
  if (action === "raise") opponentStats[playerIndex].aggression += 0.05;
  if (action === "fold") opponentStats[playerIndex].tightness += 0.03;
  if (action === "call") opponentStats[playerIndex].tightness -= 0.01;
  opponentStats[playerIndex].aggression = Math.min(1, Math.max(0, opponentStats[playerIndex].aggression));
  opponentStats[playerIndex].tightness = Math.min(1, Math.max(0, opponentStats[playerIndex].tightness));
}

export function increaseRaise(amount) {
  raiseInput.value = Math.min(maxRaiseAmount.value, raiseInput.value + amount);
}
export function decreaseRaise(amount) {
  raiseInput.value = Math.max(minRaiseAmount, raiseInput.value - amount);
}
export function setRaise(amount) {
  raiseInput.value = amount;
}

export function startGame() {
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
  playerContribution.value = Array(numPlayers.value).fill(0);
  playerMoney.value = customStartingMoney.value.slice(0, numPlayers.value);
  playerBets.value = Array(numPlayers.value).fill(0);
  playerFolded.value = Array(numPlayers.value).fill(false);
  playerDialog.value = Array(numPlayers.value).fill("");
  hasActed.value = Array(numPlayers.value).fill(false);

  assignPositions();

  const sbIndex = (dealerPosition.value + 1) % numPlayers.value;
  const bbIndex = (dealerPosition.value + 2) % numPlayers.value;

  for (let i = 0; i < numPlayers.value; i++) {
    if (i === sbIndex) {
      const sbAmount = Math.min(smallBlind, playerMoney.value[i]);
      playerMoney.value[i] -= sbAmount;
      playerBets.value[i] += sbAmount;
      pot.value += sbAmount;
      playerContribution.value[i] += sbAmount; // Track contribution
      addLog(`${playerNames.value[i]} posts small blind : $${sbAmount}`);
    } else if (i === bbIndex) {
      const bbAmount = Math.min(bigBlind, playerMoney.value[i]);
      playerMoney.value[i] -= bbAmount;
      playerBets.value[i] += bbAmount;
      pot.value += bbAmount;
      playerContribution.value[i] += bbAmount; // Track contribution
      addLog(`${playerNames.value[i]} posts big blind : $${bbAmount}`);
    } else {
      const ante = Math.min(costRound, playerMoney.value[i]);
      playerMoney.value[i] -= ante;
      playerBets.value[i] += ante;
      pot.value += ante;
      playerContribution.value[i] += ante; // Track contribution
      addLog(`${playerNames.value[i]} posts : $${ante}`);
    }
  }
  addLog(`--- Round ${currentRound.value} ---`);

  currentMaxBet.value = playerBets.value[bbIndex];
  currentPlayer.value = (bbIndex + 1) % numPlayers.value;

  nextTurn();
}

export function startNewRound() {
  if (!roundEnded.value) {
    addLog("Cannot start a new round before the current one ends.");
    return;
  }

  roundEnded.value = false;
  removeBrokePlayers();

  if (numPlayers.value < 2) {
    addLog("Not enough players to continue the game.");
    roundEnded.value = true;
    return;
  }

  dealerPosition.value = (dealerPosition.value + 1) % numPlayers.value;
  currentRound.value++;
  roundLogs.value = [];
  deck.value = createShuffledDeck();
  flop.value = [];
  pot.value = 0;
  gamePhase.value = "betting";
  currentMaxBet.value = 0;
  playerContribution.value = Array(numPlayers.value).fill(0);
  hands.value = dealHands(numPlayers.value, 2);
  playerBets.value = Array(numPlayers.value).fill(0);
  playerFolded.value = Array(numPlayers.value).fill(false);
  playerDialog.value = Array(numPlayers.value).fill("");
  hasActed.value = Array(numPlayers.value).fill(false);

  assignPositions();

  const sbIndex = (dealerPosition.value + 1) % numPlayers.value;
  const bbIndex = (dealerPosition.value + 2) % numPlayers.value;

  for (let i = 0; i < numPlayers.value; i++) {
    if (i === sbIndex) {
      const sbAmount = Math.min(smallBlind, playerMoney.value[i]);
      playerMoney.value[i] -= sbAmount;
      playerBets.value[i] += sbAmount;
      pot.value += sbAmount;
      playerContribution.value[i] += sbAmount; // Track contribution
      addLog(`${playerNames.value[i]} posts small blind : $${sbAmount}`);
    } else if (i === bbIndex) {
      const bbAmount = Math.min(bigBlind, playerMoney.value[i]);
      playerMoney.value[i] -= bbAmount;
      playerBets.value[i] += bbAmount;
      pot.value += bbAmount;
      playerContribution.value[i] += bbAmount; // Track contribution
      addLog(`${playerNames.value[i]} posts big blind : $${bbAmount}`);
    } else {
      const ante = Math.min(costRound, playerMoney.value[i]);
      playerMoney.value[i] -= ante;
      playerBets.value[i] += ante;
      pot.value += ante;
      playerContribution.value[i] += ante; // Track contribution
      addLog(`${playerNames.value[i]} post : $${ante}`);
    }
  }
  addLog(`--- Round ${currentRound.value} ---`);

  currentMaxBet.value = playerBets.value[bbIndex];
  currentPlayer.value = (bbIndex + 1) % numPlayers.value;

  nextTurn();
}

export function resetGame() {
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

function proceedToNextPhase() {
  playerBets.value = Array(numPlayers.value).fill(0);
  currentMaxBet.value = 0;
  lastRaiser.value = null;
  raiseInput.value = 0;
  let logMessage = "";
  let roundEnded = false;

  if (gamePhase.value === "betting") {
    dealInitialFlop();
    logMessage = "--- Flop ---";
  } else if (gamePhase.value === "flop") {
    revealTurnCard();
    logMessage = "--- Turn ---";
  } else if (gamePhase.value === "turn") {
    revealRiverCard();
    logMessage = "--- River ---";
  } else if (gamePhase.value === "river") {
    gamePhase.value = "showdown";
    determineWinner();
    roundEnded = true;
  } else {
    console.error("proceedToNextPhase called with unexpected gamePhase:", gamePhase.value);
    roundEnded = true;
  }

  if (logMessage) {
    addLog(logMessage);
  }

  if (roundEnded) {
    return true;
  }

  let firstToAct = -1;
  let startIndex;

  if (numPlayers.value === 2) {
    startIndex = dealerPosition.value;
  } else {
    startIndex = (dealerPosition.value + 1) % numPlayers.value;
  }

  for (let i = 0; i < numPlayers.value; i++) {
    const playerIndex = (startIndex + i) % numPlayers.value;
    if (!playerFolded.value[playerIndex]) {
      firstToAct = playerIndex;
      break;
    }
  }

  if (firstToAct !== -1) {
    currentPlayer.value = firstToAct;
  } else {
    console.error("CRITICAL: No active player found to start new betting round in proceedToNextPhase.");
  }

  return false;
}

let isRunning = false;

async function nextTurn() {
  if (currentPlayer.value === 0 && playerMoney.value[0] > 0 && !hasActed.value[0] && !playerFolded.value[0]) {
    if (autoPlay.value) {
      playerAction(); // This will trigger AI action for the human
      return;
    }
    return;
  }

  if (isRunning) return;
  isRunning = true;

  try {
    while (true) {
      const cp = currentPlayer.value;

      if (playerFolded.value.filter((f) => !f).length <= 1) {
        if (gamePhase.value !== "showdown") {
          gamePhase.value = "showdown";
          determineWinner();
        }
        return;
      }

      if (playerFolded.value[cp]) {
        currentPlayer.value = (cp + 1) % numPlayers.value;
        continue;
      }

      if (playerMoney.value[cp] === 0 && !playerFolded.value[cp] && !hasActed.value[cp]) {
        hasActed.value[cp] = true;
      } else if (playerMoney.value[cp] > 0 && !playerFolded.value[cp] && !hasActed.value[cp]) {
        break;
      }

      let roundOver = true;
      for (let i = 0; i < numPlayers.value; i++) {
        if (!playerFolded.value[i] && playerMoney.value[i] > 0 && !hasActed.value[i]) {
          roundOver = false;
          break;
        }
      }

      if (roundOver) {
        const gameActuallyEnded = proceedToNextPhase();
        if (!gameActuallyEnded) {
          const currentTurnInHand = playerMoney.value.map((_, i) => i).filter((i) => !playerFolded.value[i]);
          const playersWhoCanBet = currentTurnInHand.filter((i) => playerMoney.value[i] > 0);

          if (currentTurnInHand.length > 1 && playersWhoCanBet.length <= 1 && gamePhase.value !== "showdown") {
            setTimeout(nextTurn, 200);
          } else {
            setTimeout(nextTurn, 200);
          }
        }
        return;
      }

      currentPlayer.value = (cp + 1) % numPlayers.value;
    }

    if (currentPlayer.value === 0 && playerMoney.value[0] > 0 && !hasActed.value[0] && !playerFolded.value[0]) {
      return;
    }

    try {
      const aiDecision = getAIAction(currentPlayer.value);
      await new Promise((resolve) => setTimeout(resolve, 200));
      handleAction(currentPlayer.value, aiDecision);
    } catch (error) {
      console.error(`Error during AI ${playerNames.value[currentPlayer.value]}'s turn:`, error);
      addLog(`Error for ${playerNames.value[currentPlayer.value]}. They are folded due to an error.`);
      if (currentPlayer.value >= 0 && currentPlayer.value < numPlayers.value) {
        playerFolded.value[currentPlayer.value] = true;
        hasActed.value[currentPlayer.value] = true;
      }
    }

    let roundOverAfterAI = true;
    for (let i = 0; i < numPlayers.value; i++) {
      if (!playerFolded.value[i] && playerMoney.value[i] > 0 && !hasActed.value[i]) {
        roundOverAfterAI = false;
        break;
      }
    }

    if (roundOverAfterAI) {
      const gameActuallyEnded = proceedToNextPhase();
      if (!gameActuallyEnded) {
        const currentTurnInHand = playerMoney.value.map((_, i) => i).filter((i) => !playerFolded.value[i]);
        const playersWhoCanBet = currentTurnInHand.filter((i) => playerMoney.value[i] > 0);
        if (currentTurnInHand.length > 1 && playersWhoCanBet.length <= 1 && gamePhase.value !== "showdown") {
          setTimeout(nextTurn, 200);
        } else {
          setTimeout(nextTurn, 200);
        }
      }
      return;
    }

    currentPlayer.value = (currentPlayer.value + 1) % numPlayers.value;
    setTimeout(nextTurn, 200);
  } catch (e) {
    console.error("Critical error in nextTurn game logic:", e);
    addLog("A critical error occurred. Game progression might be halted.");
  } finally {
    isRunning = false;
  }
}

export function playerAction(action, amount = 0) {
  if (autoPlay.value) {
    // Let AI decide for the human player
    const aiDecision = getAIAction(0);
    handleAction(0, aiDecision);
    setTimeout(() => nextTurn(), 200);
    return;
  }

  if (currentPlayer.value !== 0) return;

  let msg = "";
  if (action === "fold") {
    playerFolded.value[0] = true;
    msg = "You folded.";
  } else if (action === "check") {
    if (!canCheck.value) {
      return;
    }
    msg = "You checked.";
  } else if (action === "call") {
    if (!canCall.value) {
      return;
    }
    const call = callAmount.value;
    playerMoney.value[0] -= call;
    playerBets.value[0] += call;
    pot.value += call;
    playerContribution.value[0] += call; // Track contribution
    msg = `You called $${call}`;
  } else if (action === "raise") {
    if (!canRaise.value) {
      return;
    }
    const call = callAmount.value;
    let raise = Math.max(minRaiseAmount, amount);

    if (raise % 10 !== 0) {
      return;
    }

    const total = call + raise;

    if (playerMoney.value[0] < total) {
      return;
    }

    playerMoney.value[0] -= total;
    playerBets.value[0] += total;
    pot.value += total;
    playerContribution.value[0] += total; // Track contribution
    currentMaxBet.value = playerBets.value[0];
    lastRaiser.value = 0;
    msg = `You raised $${raise} (to $${playerBets.value[0]})`;
    hasActed.value = hasActed.value.map((_, idx) => {
      if (idx === 0) return true;
      if (playerFolded.value[idx]) return true;
      return false;
    });
  } else if (action === "all-in") {
    if (!canAll.value) {
      addLog("You cannot go all-in at this time (e.g. game not active, or action not on you).");
      return;
    }
    const allInAmountFromStack = playerMoney.value[0];
    playerMoney.value[0] = 0;
    playerBets.value[0] += allInAmountFromStack;
    pot.value += allInAmountFromStack;
    playerContribution.value[0] += allInAmountFromStack; // Track contribution

    msg = `You go ALL-IN with $${allInAmountFromStack} (total bet $${playerBets.value[0]})`;

    if (playerBets.value[0] > currentMaxBet.value) {
      currentMaxBet.value = playerBets.value[0];
      lastRaiser.value = 0;
      hasActed.value = hasActed.value.map((_, idx) => (idx === 0 || playerFolded.value[idx] ? true : false));
      msg += ", raising the bet!";
    }
  }

  addLog(msg);
  hasActed.value[0] = true;
  currentPlayer.value = (currentPlayer.value + 1) % numPlayers.value;

  setTimeout(() => nextTurn(), 200);
}

function handleAction(i, actionDecision) {
  let { action, amount: intendedAdditionalRaiseAmount } = actionDecision;
  const playerChips = playerMoney.value[i];
  const currentBetOnTable = playerBets.value[i] || 0;
  const costToCall = currentMaxBet.value - currentBetOnTable;

  // Convert "call" to "check" if nothing to call
  if (action === "call" && costToCall === 0) {
    action = "check";
  }

  if (action === "fold") {
    playerFolded.value[i] = true;
    addLog(`${playerNames.value[i]} folds.`);
  } else if (action === "raise") {
    const affordableAdditionalRaise = playerChips - costToCall;
    let actualAdditionalRaise = Math.min(intendedAdditionalRaiseAmount, affordableAdditionalRaise);

    // If can't raise but can call/all-in, do that instead of folding
    if (actualAdditionalRaise <= 0 && costToCall > 0 && playerChips > 0) {
      // Not enough to raise, but can call/all-in
      if (playerChips >= costToCall) {
        playerMoney.value[i] -= costToCall;
        playerBets.value[i] += costToCall;
        pot.value += costToCall;
        playerContribution.value[i] += costToCall;
        addLog(`${playerNames.value[i]} calls $${costToCall}`);
      } else {
        // Not enough to call, go all-in
        const allInAmount = playerChips;
        pot.value += allInAmount;
        playerBets.value[i] += allInAmount;
        playerContribution.value[i] += allInAmount;
        playerMoney.value[i] = 0;
        addLog(`${playerNames.value[i]} calls ALL-IN with $${allInAmount}`);
      }
    } else if (actualAdditionalRaise <= 0 && costToCall === 0) {
      addLog(`${playerNames.value[i]} checks.`);
    } else if (actualAdditionalRaise < 0) {
      playerFolded.value[i] = true;
      addLog(`${playerNames.value[i]} folds (unable to complete raise).`);
    } else {
      const totalBetThisAction = costToCall + actualAdditionalRaise;
      playerMoney.value[i] -= totalBetThisAction;
      playerBets.value[i] += totalBetThisAction;
      pot.value += totalBetThisAction;
      playerContribution.value[i] += totalBetThisAction;
      currentMaxBet.value = playerBets.value[i];
      lastRaiser.value = i;
      if (playerMoney.value[i] === 0 && totalBetThisAction > 0) {
        addLog(`${playerNames.value[i]} raises ALL-IN by $${actualAdditionalRaise} (total bet $${playerBets.value[i]})`);
      } else {
        addLog(`${playerNames.value[i]} raises by $${actualAdditionalRaise} (total bet $${playerBets.value[i]})`);
      }
      hasActed.value = hasActed.value.map((_, idx) => playerFolded.value[idx] || idx === i);
    }
  } else if (action === "call") {
    if (playerChips >= costToCall) {
      playerMoney.value[i] -= costToCall;
      playerBets.value[i] += costToCall;
      pot.value += costToCall;
      playerContribution.value[i] += costToCall;
      addLog(`${playerNames.value[i]} calls $${costToCall}`);
    } else if (playerChips > 0) {
      // Not enough to call, go all-in with remaining chips
      const allInAmount = playerChips;
      pot.value += allInAmount;
      playerBets.value[i] += allInAmount;
      playerContribution.value[i] += allInAmount;
      playerMoney.value[i] = 0;
      addLog(`${playerNames.value[i]} calls ALL-IN with $${allInAmount}`);
    } else {
      // No chips left, must fold
      playerFolded.value[i] = true;
      addLog(`${playerNames.value[i]} folds (no chips left).`);
    }
  } else if (action === "all-in") {
    if (playerChips > 0) {
      pot.value += playerChips;
      playerBets.value[i] += playerChips;
      playerContribution.value[i] += playerChips;
      playerMoney.value[i] = 0;
      addLog(`${playerNames.value[i]} goes ALL-IN with $${playerBets.value[i]}`);
      if (playerBets.value[i] > currentMaxBet.value) {
        currentMaxBet.value = playerBets.value[i];
        lastRaiser.value = i;
        hasActed.value = hasActed.value.map((_, idx) => playerFolded.value[idx] || idx === i);
      }
    } else {
      playerFolded.value[i] = true;
      addLog(`${playerNames.value[i]} folds (no chips left for all-in).`);
    }
  } else if (action === "check") {
    if (costToCall > 0) {
      playerFolded.value[i] = true;
      addLog(`${playerNames.value[i]} (AI) attempts to check facing a bet of $${costToCall}, and folds.`);
    } else {
      addLog(`${playerNames.value[i]} checks.`);
    }
  }
  hasActed.value[i] = true;

  //จบเกมทันทีถ้าเหลือผู้เล่นคนเดียว
  if (playerFolded.value.filter((f) => !f).length === 1 && gamePhase.value !== "showdown") {
    gamePhase.value = "showdown";
    determineWinner();
    return;
  }

  setTimeout(nextTurn, 200);
}

function determineWinner() {
  const currentTurn = [];

  for (let i = 0; i < numPlayers.value; i++) {
    if (!playerFolded.value[i]) {
      const fullHand = hands.value[i].concat(flop.value);
      currentTurn.push({
        index: i,
        handEvaluation: evaluateHand(fullHand),
        hand: fullHand,
      });
    }
  }

  if (currentTurn.length === 0) {
    addLog("No active players. Pot remains.");
    roundEnded.value = true;
    return;
  }

  // หา handRank ที่ดีที่สุด
  const bestRank = Math.max(...currentTurn.map((p) => p.handEvaluation.handRank));
  let bestPlayers = currentTurn.filter((p) => p.handEvaluation.handRank === bestRank);

  // เปรียบเทียบ kicker เพื่อหากลุ่มที่ดีที่สุด (อาจมีมากกว่า 1 คน)
  let tiedWinners = [bestPlayers[0]];

  for (let i = 1; i < bestPlayers.length; i++) {
    const aVals = tiedWinners[0].handEvaluation.values;
    const bVals = bestPlayers[i].handEvaluation.values;
    const cmp = compareValues(aVals, bVals);

    if (cmp < 0) {
      // bVals ดีกว่า → reset winners
      tiedWinners = [bestPlayers[i]];
    } else if (cmp === 0) {
      // เสมอกัน → เพิ่มเข้ากลุ่ม
      tiedWinners.push(bestPlayers[i]);
    }
    // ถ้า cmp > 0 → aVals ดีกว่า → ไม่ต้องทำอะไร
  }

  // แบ่ง pot ให้ผู้ชนะทุกคน (tie)
  const share = Math.floor(pot.value / tiedWinners.length);
  for (const winner of tiedWinners) {
    playerMoney.value[winner.index] += share;
    addLog(`${playerNames.value[winner.index]} wins $${share} with ${winner.handEvaluation.handName}`);
  }

  pot.value = 0;
  addLog(`--- End of Round ${currentRound.value} ---`);
  roundEnded.value = true;

  // เปรียบเทียบ values array แบบเรียงลำดับ
  function compareValues(a, b) {
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      const aVal = a[i] || 0;
      const bVal = b[i] || 0;
      if (aVal > bVal) return 1;
      if (aVal < bVal) return -1;
    }
    return 0; // เท่ากันทั้งหมด
  }
}

export function getAIAction(index) {
  const myHand = hands.value[index];
  const community = flop.value;
  const fullHand = myHand.concat(community);
  const handEval = evaluateHand(fullHand);
  const currentMoney = playerMoney.value[index];
  const toCall = currentMaxBet.value - (playerBets.value[index] || 0);
  const potSize = pot.value;
  const activePlayers = playerFolded.value.filter((f) => !f).length;
  const myPosition = playerPositions.value[index] || index;
  const totalPlayers = numPlayers.value;

  // Early all-in logic for short stack
  if (currentMoney > 0 && currentMoney < bigBlind * 5) {
    if (Math.random() < 0.6 || handEval.handRank >= 4) {
      return { action: "all-in" };
    }
    if (currentMoney <= toCall) {
      return { action: "fold" };
    }
    if (toCall <= currentMoney) {
      return { action: "call" };
    }
  }

  // Pre-flop logic
  if (community.length === 0) {
    const ranks = myHand.map((c) => getRankValue(c.rank));
    const isPair = ranks[0] === ranks[1];
    const premiumCombos = [
      ["A", "A"],
      ["K", "K"],
      ["Q", "Q"],
      ["J", "J"],
      ["A", "K"],
      ["A", "Q"],
      ["A", "J"],
      ["K", "Q"],
    ];
    const handCombo = [myHand[0].rank, myHand[1].rank].sort();
    const isPremium = premiumCombos.some((combo) => combo.sort().toString() === handCombo.toString());
    const highKicker = Math.max(...ranks) >= 11;
    // Position-aware pre-flop: looser in late, tighter in early
    const isLatePosition = (typeof myPosition === "number" ? myPosition : index) >= totalPlayers - 2;
    if (isPair && ["A", "K", "Q", "J", "10", "9", "8", "7"].includes(myHand[0].rank)) {
      if (toCall === 0) return { action: "raise", amount: Math.max(minRaiseAmount, isLatePosition ? 40 : 30) };
      if (toCall <= currentMoney * (isLatePosition ? 0.3 : 0.2)) return { action: "call" };
      return { action: "fold" };
    }
    if (isPremium || (!isPair && highKicker && Math.min(...ranks) >= 10)) {
      if (toCall === 0) return { action: "raise", amount: Math.max(minRaiseAmount, isLatePosition ? 40 : 30) };
      if (toCall <= currentMoney * (isLatePosition ? 0.25 : 0.18)) return { action: "call" };
      return { action: "fold" };
    }
    // Steal more in late position if folded to
    if (isLatePosition && toCall === 0 && Math.random() < 0.25) {
      return { action: "raise", amount: minRaiseAmount };
    }
  }

  // Table stats
  let tableAggression = 0,
    tableTightness = 0,
    oppCount = 0;
  for (let i = 0; i < totalPlayers; i++) {
    if (i !== index && !playerFolded.value[i]) {
      tableAggression += opponentStats[i].aggression;
      tableTightness += opponentStats[i].tightness;
      oppCount++;
    }
  }
  tableAggression = oppCount ? tableAggression / oppCount : 0.5;
  tableTightness = oppCount ? tableTightness / oppCount : 0.5;

  // Position factor
  const isLatePosition = (typeof myPosition === "number" ? myPosition : index) >= totalPlayers - 2;
  const isEarlyPosition = (typeof myPosition === "number" ? myPosition : index) <= 1;
  let positionFactor = 1.0;
  if (isLatePosition) positionFactor = 1.2;
  else if (isEarlyPosition) positionFactor = 0.85;

  // Board danger
  let boardDanger = 0;
  if (community.length >= 3) {
    const suits = {},
      ranks = {};
    for (const card of community) {
      suits[card.suit] = (suits[card.suit] || 0) + 1;
      ranks[card.rank] = (ranks[card.rank] || 0) + 1;
    }
    if (Object.values(ranks).some((v) => v >= 2)) boardDanger += 1;
    if (Object.values(suits).some((v) => v >= 3)) boardDanger += 1;
    const rankMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 11, Q: 12, K: 13, A: 14 };
    const sortedRanks = Object.keys(ranks)
      .map((r) => rankMap[r])
      .sort((a, b) => a - b);
    let straightCount = 1;
    for (let i = 1; i < sortedRanks.length; i++) {
      if (sortedRanks[i] === sortedRanks[i - 1] + 1) straightCount++;
      else straightCount = 1;
      if (straightCount >= 3) boardDanger += 1;
    }
  }

  // Draw odds
  let drawOdds = 0.0;
  if (handEval.handRank < 4 && community.length >= 3) {
    const suits = {};
    for (const card of fullHand) suits[card.suit] = (suits[card.suit] || 0) + 1;
    if (Object.values(suits).some((v) => v === 4)) drawOdds = 0.18;
    const allRanks = fullHand.map((c) => getRankValue(c.rank));
    const uniqueRanks = [...new Set(allRanks)].sort((a, b) => a - b);
    for (let i = 0; i < uniqueRanks.length - 3; i++) {
      if (uniqueRanks[i + 3] - uniqueRanks[i] === 3 && uniqueRanks.slice(i, i + 4).length === 4) {
        drawOdds = Math.max(drawOdds, 0.17);
      }
    }
    for (let i = 0; i < uniqueRanks.length - 3; i++) {
      const window = uniqueRanks.slice(i, i + 4);
      if (window[3] - window[0] === 4 && window.length === 4) {
        drawOdds = Math.max(drawOdds, 0.08);
      }
    }
  }
  const potOdds = toCall / (potSize + toCall);
  let impliedOdds = potOdds;
  if (drawOdds > 0 && currentMoney > potSize * 1.5) {
    impliedOdds = toCall / (potSize + toCall + potSize * 0.5);
  }

  // Block nuts
  let blockNuts = false;
  if (community.length >= 3) {
    const suitsInBoard = community.map((c) => c.suit);
    for (const suit of ["♠", "♥", "♦", "♣"]) {
      if (suitsInBoard.filter((s) => s === suit).length >= 3) {
        if (myHand.some((card) => card.suit === suit && card.rank === "A")) {
          blockNuts = true;
        }
      }
    }
  }

  // --- Adaptive logic ---
  let bluff = false;
  let bluffChance = 0.3 + 0.2 * (6 - activePlayers);

  // Table aggression adaptation
  let aggression = 2.0;
  if (tableAggression > 0.7) {
    aggression *= 0.8; // Tighten up vs aggressive table
    bluffChance *= 0.8;
  } else if (tableAggression < 0.4) {
    aggression *= 1.2; // Loosen up vs passive table
    bluffChance *= 1.2;
  }

  // Table tightness adaptation
  if (tableTightness > 0.7) {
    bluffChance += 0.15 * positionFactor; // Steal more vs tight table
    aggression *= 1.1;
  } else if (tableTightness < 0.4) {
    bluffChance -= 0.1;
    aggression *= 0.95;
  }

  // Position adaptation
  bluffChance *= positionFactor;
  aggression *= positionFactor;

  // Short-handed adaptation
  if (activePlayers <= 3) {
    aggression *= 1.15;
    bluffChance += 0.08;
  }

  // Pot size adaptation
  if (potSize > currentMoney * 1.2 && !isLatePosition) {
    aggression *= 0.8; // Be more careful in big pots out of position
    bluffChance *= 0.8;
  }

  // Other factors
  if (isLatePosition) bluffChance += 0.05;
  if (drawOdds > 0) bluffChance += 0.1;
  if (blockNuts) bluffChance += 0.08;

  // Final bluff calculation
  if (Math.random() < bluffChance && boardDanger === 0) bluff = true;

  // Raise amount adapts to position and aggression
  let raiseAmount = minRaiseAmount;
  if (handEval.handRank >= 6) {
    raiseAmount = Math.min(currentMoney, Math.max(minRaiseAmount, Math.floor(potSize * 0.75 * aggression)));
  } else if (handEval.handRank >= 4) {
    raiseAmount = Math.min(currentMoney, Math.max(minRaiseAmount, Math.floor(potSize * 0.5 * aggression)));
  } else if (bluff) {
    raiseAmount = Math.min(currentMoney, Math.max(minRaiseAmount, Math.floor(potSize * 0.4 * aggression)));
  } else {
    raiseAmount = Math.min(currentMoney, minRaiseAmount);
  }
  raiseAmount = Math.floor(raiseAmount / 10) * 10;
  if (raiseAmount < minRaiseAmount) raiseAmount = minRaiseAmount;

  const hasShowdownValue = handEval.handRank >= 4 && handEval.handRank < 6;
  const likelyBluff = tableAggression > 0.7 && boardDanger > 0 && toCall > 0;
  if (hasShowdownValue && likelyBluff && toCall <= currentMoney * 0.2) {
    return { action: "call" };
  }
  if (Math.random() < 0.03) return { action: "fold" };
  if (playerFolded.value[index]) return { action: "fold" };
  if (currentMoney <= toCall) {
    if (handEval.handRank >= 5 || bluff) return { action: "all-in" };
    return { action: "fold" };
  }
  if (drawOdds > 0 && impliedOdds < drawOdds && toCall <= currentMoney * 0.3) {
    return { action: "call" };
  }
  if (bluff && toCall === 0 && currentMoney > raiseAmount) {
    return { action: "raise", amount: raiseAmount };
  }
  if (handEval.handRank >= 4 && Math.random() < 0.6 * aggression) {
    if (toCall === 0) return { action: "raise", amount: raiseAmount };
    if (toCall <= raiseAmount) return { action: "call" };
    return { action: "fold" };
  }
  if (hasShowdownValue) {
    if (toCall === 0 && Math.random() < 0.2 * aggression && !boardDanger) return { action: "raise", amount: raiseAmount };
    if (toCall <= raiseAmount) return { action: "call" };
    return { action: "fold" };
  }
  if (toCall === 0) return { action: "check" };
  if (toCall <= minRaiseAmount && Math.random() < 0.6 * aggression) return { action: "call" };
  if (bluff && toCall <= raiseAmount) return { action: "call" };
  return { action: "fold" };
}
