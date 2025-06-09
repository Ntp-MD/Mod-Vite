import { ref, computed } from "vue";

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
const CostRound = 10;
const numPlayers = ref(6);
const startingMoney = ref(1000);
const dealerPosition = ref(0);
export const playerNames = ref([]);
export const playerMoney = ref([]);
export const playerBets = ref([]);
export const playerFolded = ref([]);
const playerDialog = ref([]);
export const playerPositions = ref([]);
const hasActed = ref([]);
export const raiseChips = [10, 20, 50, 100];
export const minRaiseAmount = 10;
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

export const canRaise = computed(() => playerMoney.value[0] > currentMaxBet.value - (playerBets.value[0] || 0));

export const canFold = computed(() => {
  if (gamePhase.value === "idle") {
    return false;
  }
  return true;
});

export const canAll = computed(() => playerMoney.value[0] > 0 && gamePhase.value !== "idle" && gamePhase.value !== "showdown");

const lastRaiser = ref(null);

/* ============ Utility Functions ============ */
function addLog(message) {
  if (!roundLogs.value[currentRound.value - 1]) {
    roundLogs.value[currentRound.value - 1] = [];
  }
  roundLogs.value[currentRound.value - 1].push(message);
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
  const rankMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 11, Q: 12, K: 13, A: 14 };
  const counts = {};
  const suits = {};
  const values = hand.map((c) => rankMap[c.rank]).sort((a, b) => a - b);

  for (const card of hand) {
    const val = rankMap[card.rank];
    counts[val] = (counts[val] || 0) + 1;
    suits[card.suit] = (suits[card.suit] || 0) + 1;
  }

  const isFlush = Object.values(suits).some((v) => v >= 5);
  let flushSuit = null;
  if (isFlush) {
    for (const suit in suits) {
      if (suits[suit] >= 5) {
        flushSuit = suit;
        break;
      }
    }
  }

  const cardsForStraightCheck = isFlush ? hand.filter((c) => c.suit === flushSuit) : hand;
  const straightValues = cardsForStraightCheck.map((c) => rankMap[c.rank]).sort((a, b) => a - b);

  let uniqueStraightValues = [...new Set(straightValues)].sort((a, b) => a - b);

  let isStraight = false;
  let straightHighCard = 0;

  if (uniqueStraightValues.length >= 5) {
    for (let i = uniqueStraightValues.length - 1; i >= 4; i--) {
      if (uniqueStraightValues[i] - uniqueStraightValues[i - 4] === 4) {
        isStraight = true;
        straightHighCard = uniqueStraightValues[i];
        break;
      }
    }
    if (
      !isStraight &&
      uniqueStraightValues.includes(14) &&
      uniqueStraightValues.includes(2) &&
      uniqueStraightValues.includes(3) &&
      uniqueStraightValues.includes(4) &&
      uniqueStraightValues.includes(5)
    ) {
      isStraight = true;
      straightHighCard = 5;
    }
  }

  const valueCounts = Object.values(counts).sort((a, b) => b - a);

  let handRank = 0;
  let handName = "High Card";

  if (isFlush && isStraight && straightHighCard === 14) {
    handRank = 10;
    handName = "Royal Flush";
  } else if (isFlush && isStraight) {
    handRank = 9;
    handName = "Straight Flush";
  } else if (valueCounts[0] === 4) {
    handRank = 8;
    handName = "Four of a Kind";
  } else if (valueCounts[0] === 3 && valueCounts[1] >= 2) {
    handRank = 7;
    handName = "Full House";
  } else if (isFlush) {
    handRank = 6;
    handName = "Flush";
  } else if (isStraight) {
    handRank = 5;
    handName = "Straight";
  } else if (valueCounts[0] === 3) {
    handRank = 4;
    handName = "Three of a Kind";
  } else if (valueCounts[0] === 2 && valueCounts[1] === 2) {
    handRank = 3;
    handName = "Two Pair";
  } else if (valueCounts[0] === 2) {
    handRank = 2;
    handName = "One Pair";
  }

  return { handName, handRank, highCard: Math.max(...values), values };
}

function assignPositions() {
  dealerPosition.value = Math.floor(Math.random() * numPlayers.value);
  const labels = ["Dealer", "SB", "BB", "UTG", "MP", "CO"];
  for (let i = 0; i < numPlayers.value; i++) {
    const relative = (i - dealerPosition.value + numPlayers.value) % numPlayers.value;
    playerPositions.value[i] = labels[relative] || `P${i}`;
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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
  playerMoney.value = Array(numPlayers.value).fill(startingMoney.value);
  playerBets.value = Array(numPlayers.value).fill(0);
  playerFolded.value = Array(numPlayers.value).fill(false);
  playerDialog.value = Array(numPlayers.value).fill("");
  hasActed.value = Array(numPlayers.value).fill(false);

  assignPositions();

  const smallBlindAmount = CostRound * 1;
  const bigBlindAmount = CostRound * 2;

  const sbIndex = (dealerPosition.value + 1) % numPlayers.value;
  const bbIndex = (dealerPosition.value + 2) % numPlayers.value;
  addLog(`--- Round ${currentRound.value} ---`);

  const sbAmountToPost = Math.min(smallBlindAmount, playerMoney.value[sbIndex]);
  if (sbAmountToPost > 0) {
    playerMoney.value[sbIndex] -= sbAmountToPost;
    playerBets.value[sbIndex] += sbAmountToPost;
    pot.value += sbAmountToPost;
    addLog(`${playerNames.value[sbIndex]} posts small blind: ${sbAmountToPost}$`);
  }

  const bbAmountToPost = Math.min(bigBlindAmount, playerMoney.value[bbIndex]);
  if (bbAmountToPost > 0) {
    playerMoney.value[bbIndex] -= bbAmountToPost;
    playerBets.value[bbIndex] += bbAmountToPost;
    pot.value += bbAmountToPost;
    addLog(`${playerNames.value[bbIndex]} posts big blind: ${bbAmountToPost}$`);
  }

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

export function startNewRound() {
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
  addLog(`--- Round ${currentRound.value} ---`);

  const smallBlindAmount = CostRound;
  const bigBlindAmount = CostRound * 2;

  let sbIndex, bbIndex;

  if (numPlayers.value === 2) {
    sbIndex = dealerPosition.value;
    bbIndex = (dealerPosition.value + 1) % numPlayers.value;
  } else {
    sbIndex = (dealerPosition.value + 1) % numPlayers.value;
    bbIndex = (dealerPosition.value + 2) % numPlayers.value;
  }

  const actualSmallBlind = Math.min(smallBlindAmount, playerMoney.value[sbIndex] + (playerBets.value[sbIndex] || 0));
  playerMoney.value[sbIndex] -= actualSmallBlind;
  playerBets.value[sbIndex] = (playerBets.value[sbIndex] || 0) + actualSmallBlind;
  pot.value += actualSmallBlind;
  if (actualSmallBlind > 0) {
    addLog(`${playerNames.value[sbIndex]} posts small blind: ${actualSmallBlind}$`);
  }

  const actualBigBlind = Math.min(bigBlindAmount, playerMoney.value[bbIndex] + (playerBets.value[bbIndex] || 0));
  playerMoney.value[bbIndex] -= actualBigBlind;
  playerBets.value[bbIndex] = (playerBets.value[bbIndex] || 0) + actualBigBlind;
  pot.value += actualBigBlind;
  if (actualBigBlind > 0) {
    addLog(`${playerNames.value[bbIndex]} posts big blind: ${actualBigBlind}$`);
  }

  currentMaxBet.value = playerBets.value[bbIndex];
  currentPlayer.value = (bbIndex + 1) % numPlayers.value;

  nextTurn();
}

function proceedToNextPhase() {
  playerBets.value = Array(numPlayers.value).fill(0);
  currentMaxBet.value = 0;
  lastRaiser.value = null;

  let logMessage = "";
  let roundEnded = false;

  if (gamePhase.value === "betting") {
    dealInitialFlop();
    logMessage = "--- Flop ---";
  } else if (gamePhase.value === "flop") {
    revealTurnCard();
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
        const gameActuallyEnded = proceedToNextPhase(); // This resets hasActed for new phase
        if (!gameActuallyEnded) {
          // Game continues to a new street (flop, turn, river)
          // Check if we need to auto-run the rest of the board (all remaining active players are all-in or only one has chips)
          const activePlayersInHand = playerMoney.value.map((_, i) => i).filter((i) => !playerFolded.value[i]);
          const playersWhoCanBet = activePlayersInHand.filter((i) => playerMoney.value[i] > 0);

          if (activePlayersInHand.length > 1 && playersWhoCanBet.length <= 1 && gamePhase.value !== "showdown") {
            // More than one player in hand, but at most one can still bet (others all-in).
            // -> Run out the board by quickly proceeding to the next phase.
            setTimeout(nextTurn, 100); // Fast-forward.
          } else {
            setTimeout(nextTurn, 500); // Normal progression for new betting round.
          }
        }
        return; // Exit nextTurn
      }

      currentPlayer.value = (cp + 1) % numPlayers.value;
    }

    if (currentPlayer.value === 0 && playerMoney.value[0] > 0 && !hasActed.value[0] && !playerFolded.value[0]) {
      return;
    }

    try {
      const aiDecision = getAIAction(currentPlayer.value);
      await new Promise((resolve) => setTimeout(resolve, 500));
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
        // Similar logic for auto-running board or normal progression
        const activePlayersInHand = playerMoney.value.map((_, i) => i).filter((i) => !playerFolded.value[i]);
        const playersWhoCanBet = activePlayersInHand.filter((i) => playerMoney.value[i] > 0);
        if (activePlayersInHand.length > 1 && playersWhoCanBet.length <= 1 && gamePhase.value !== "showdown") {
          setTimeout(nextTurn, 100);
        } else {
          setTimeout(nextTurn, 500);
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

export function playerAction(action, amount = 0) {
  if (currentPlayer.value !== 0) return;

  let msg = "";
  if (action === "fold") {
    playerFolded.value[0] = true;
    msg = "You folded.";
  } else if (action === "check") {
    if (!canCheck.value) {
      addLog("You cannot check, there is a bet to call or action is not on you.");
      return;
    }
    msg = "You checked.";
  } else if (action === "call") {
    if (!canCall.value) {
      addLog("You cannot call (not enough money, no bet to call, or action is not on you).");
      return;
    }
    const call = callAmount.value;
    playerMoney.value[0] -= call;
    playerBets.value[0] += call;
    pot.value += call;
    msg = `You called $${call}`;
  } else if (action === "raise") {
    if (!canRaise.value) {
      addLog("You cannot raise (e.g. not enough funds above the call amount, or action is not on you).");
      return;
    }
    const call = callAmount.value;
    const raise = Math.max(minRaiseAmount, amount);
    const total = call + raise;

    if (playerMoney.value[0] < total) {
      addLog("Not enough money for this specific raise amount.");
      return;
    }

    playerMoney.value[0] -= total;
    playerBets.value[0] += total;
    pot.value += total;
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

  setTimeout(() => nextTurn(), 500);
}

function getAIAction(index) {
  const bet = playerBets.value[index];
  const toCall = currentMaxBet.value - bet;
  const money = playerMoney.value[index];
  const potSize = pot.value;
  const aggressionFactor = Math.random() * 0.4 + 0.6;

  const aiFullHand = hands.value[index].concat(flop.value);
  const handEval = evaluateHand(aiFullHand);
  const rank = handEval.handRank;

  if (playerFolded.value[index]) return { action: "fold" };

  if (money < toCall && toCall > 0) {
    const callAllInChance = rank / 10 + (potSize / (potSize + money)) * 0.5;
    if (money > 0 && Math.random() < callAllInChance) {
      return { action: "call" };
    }
    return { action: "fold" };
  }

  const calculateRaiseAmount = () => {
    let baseRaiseRatio;
    if (rank >= 8) {
      baseRaiseRatio = 0.7 + Math.random() * 0.6;
    } else if (rank >= 5) {
      baseRaiseRatio = 0.4 + Math.random() * 0.4;
    } else if (rank >= 2) {
      baseRaiseRatio = 0.3 + Math.random() * 0.25;
    } else {
      baseRaiseRatio = 0.25 + Math.random() * 0.3;
    }

    let raiseAmount = potSize * baseRaiseRatio;
    raiseAmount *= 1 + (aggressionFactor - 0.5) * 0.5;
    return Math.max(minRaiseAmount, Math.round(raiseAmount / 5) * 5);
  };

  if (rank >= 8) {
    if (toCall === 0) {
      return Math.random() < 0.9 + aggressionFactor * 0.1 ? { action: "raise", amount: calculateRaiseAmount() } : { action: "check" }; // Very high chance to bet/raise
    } else {
      return Math.random() < 0.85 + aggressionFactor * 0.15 ? { action: "raise", amount: calculateRaiseAmount() } : { action: "call" }; // Very high chance to re-raise, otherwise call
    }
  } else if (rank >= 5) {
    if (toCall === 0) {
      return Math.random() < 0.7 + aggressionFactor * 0.2 ? { action: "raise", amount: calculateRaiseAmount() } : { action: "check" };
    } else {
      if (toCall <= money * (0.6 + aggressionFactor * 0.15)) {
        return Math.random() < 0.65 + aggressionFactor * 0.2 ? { action: "raise", amount: calculateRaiseAmount() } : { action: "call" };
      } else if (toCall <= money * (0.8 + aggressionFactor * 0.1)) {
        return Math.random() < 0.5 + aggressionFactor * 0.2 ? { action: "call" } : { action: "fold" };
      } else {
        return Math.random() < 0.2 + aggressionFactor * 0.1 ? { action: "call" } : { action: "fold" };
      }
    }
  } else if (rank >= 2) {
    if (toCall === 0) {
      return Math.random() < 0.5 + aggressionFactor * 0.3 ? { action: "raise", amount: calculateRaiseAmount() } : { action: "check" };
    } else if (toCall <= money * 0.25) {
      return Math.random() < 0.6 + aggressionFactor * 0.2 ? { action: "call" } : { action: "fold" };
    } else {
      return Math.random() < 0.3 + aggressionFactor * 0.2 ? { action: "call" } : { action: "fold" };
    }
  } else {
    if (toCall === 0) {
      return Math.random() < 0.3 + aggressionFactor * 0.2 ? { action: "raise", amount: calculateRaiseAmount() } : { action: "check" };
    } else if (toCall <= money * 0.15) {
      return Math.random() < 0.3 + aggressionFactor * 0.2 ? { action: "call" } : { action: "fold" };
    } else {
      return { action: "fold" };
    }
  }
}

function handleAction(i, actionDecision) {
  const { action, amount: intendedAdditionalRaiseAmount } = actionDecision; // amount is the *additional* raise AI wants

  const playerChips = playerMoney.value[i];
  const currentBetOnTable = playerBets.value[i] || 0;
  const costToCall = currentMaxBet.value - currentBetOnTable;

  if (action === "fold") {
    playerFolded.value[i] = true;
    addLog(`${playerNames.value[i]} folds.`);
  } else if (action === "raise") {
    const affordableAdditionalRaise = playerChips - costToCall;
    let actualAdditionalRaise = Math.min(intendedAdditionalRaiseAmount, affordableAdditionalRaise);

    if (playerChips > costToCall + actualAdditionalRaise) {
      actualAdditionalRaise = Math.max(minRaiseAmount, actualAdditionalRaise);
    }

    if (actualAdditionalRaise <= 0 && costToCall === 0) {
      addLog(`${playerNames.value[i]} checks.`);
    } else if (actualAdditionalRaise < 0) {
      playerFolded.value[i] = true;
      addLog(`${playerNames.value[i]} folds (unable to complete raise).`);
    } else {
      const totalBetThisAction = costToCall + actualAdditionalRaise;

      playerMoney.value[i] -= totalBetThisAction;
      playerBets.value[i] += totalBetThisAction;
      pot.value += totalBetThisAction;
      currentMaxBet.value = playerBets.value[i]; // A raise always sets the new max bet
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
      addLog(`${playerNames.value[i]} calls $${costToCall}`);
    } else {
      // All-in call
      const allInAmount = playerChips;
      pot.value += allInAmount;
      playerBets.value[i] += allInAmount;
      playerMoney.value[i] = 0;
      addLog(`${playerNames.value[i]} calls ALL-IN with $${allInAmount}`);
    }
  } else if (action === "check") {
    if (costToCall > 0) {
      // Cannot check if there's a bet to call
      playerFolded.value[i] = true;
      addLog(`${playerNames.value[i]} (AI) attempts to check facing a bet of $${costToCall}, and folds.`);
    } else {
      addLog(`${playerNames.value[i]} checks.`);
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
        handEvaluation: evaluateHand(fullHand), // Contains { handName, handRank, ... }
      });
    }
  }

  // Sort by rank (higher better)
  activePlayers.sort((a, b) => b.handEvaluation.handRank - a.handEvaluation.handRank);

  const bestRankValue = activePlayers.length > 0 ? activePlayers[0].handEvaluation.handRank : -1;
  const winners = activePlayers.filter((p) => p.handEvaluation.handRank === bestRankValue);

  // Divide pot
  const potShare = winners.length > 0 ? Math.floor(pot.value / winners.length) : 0;
  winners.forEach((w) => {
    playerMoney.value[w.index] += potShare;
    addLog(`${playerNames.value[w.index]} wins with ${w.handEvaluation.handName} and receives $${potShare}`);
  });

  // Remainder (if any) goes to the first winner
  const remainder = winners.length > 0 ? pot.value % winners.length : pot.value;
  if (remainder > 0 && winners.length > 0) {
    // Ensure there's a winner to give remainder to
    playerMoney.value[winners[0].index] += remainder;
    addLog(`${playerNames.value[winners[0].index]} receives an extra $${remainder} from remainder`);
  } else if (remainder > 0 && winners.length === 0 && activePlayers.length === 1) {
    // Edge case: if pot was not 0, but no "winners" (e.g. everyone folded but one), that one active player gets the remainder.
    playerMoney.value[activePlayers[0].index] += remainder;
    addLog(`${playerNames.value[activePlayers[0].index]} receives $${remainder} as the only remaining player.`);
  }

  pot.value = 0;

  addLog(`--- End of Round ${currentRound.value} ---`);

  // Automatically start new round after delay
  /*
  setTimeout(() => startNewRound(), 1500);
  */
}

/* ============ Raise Control ============ */
export function increaseRaise(amount) {
  raiseInput.value = Math.min(maxRaiseAmount.value, raiseInput.value + amount);
}
export function decreaseRaise(amount) {
  raiseInput.value = Math.max(minRaiseAmount, raiseInput.value - amount);
}
export function setRaise(amount) {
  raiseInput.value = amount;
}
