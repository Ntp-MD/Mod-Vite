/* ================== Imports ================== */
import { ref, computed } from "vue";

/* ============ Reactive State / Refs ============ */
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
const roundEnded = ref(true); // initially true to allow the first round

export const playerNames = ref([]);
export const playerMoney = ref([]);
export const playerBets = ref([]);
export const playerFolded = ref([]);
const playerDialog = ref([]);
export const playerPositions = ref([]);
const hasActed = ref([]);

/* ============ Constants ============ */
export const raiseChips = [10, 20, 50, 100];
export const minRaiseAmount = 10;

/* ============ Computed ============ */
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
  return true; // Folding is generally always allowed when game is active and it's your turn
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
  const allValues = hand.map((c) => rankMap[c.rank]);

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
  const uniqueStraightValues = [...new Set(straightValues)];

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
    if (!isStraight && uniqueStraightValues.includes(14) && [2, 3, 4, 5].every((v) => uniqueStraightValues.includes(v))) {
      isStraight = true;
      straightHighCard = 5;
    }
  }

  const grouped = Object.entries(counts).map(([val, count]) => ({ val: +val, count }));
  grouped.sort((a, b) => b.count - a.count || b.val - a.val); // Sort by frequency, then value
  const valueCounts = grouped.map((g) => g.count);

  let handRank = 0;
  let handName = "High Card";
  let finalValues = [];

  if (isFlush && isStraight && straightHighCard === 14) {
    handRank = 10;
    handName = "Royal Flush";
    finalValues = [14, 13, 12, 11, 10];
  } else if (isFlush) {
    const suitedCards = hand
      .filter((c) => c.suit === flushSuit)
      .map((c) => rankMap[c.rank])
      .sort((a, b) => b - a);

    const uniqueSuited = [...new Set(suitedCards)].sort((a, b) => a - b);

    let sfHigh = 0;
    for (let i = uniqueSuited.length - 1; i >= 4; i--) {
      if (uniqueSuited[i] - uniqueSuited[i - 4] === 4) {
        sfHigh = uniqueSuited[i];
        break;
      }
    }

    // Wheel check (A-2-3-4-5)
    if (sfHigh === 0 && uniqueSuited.includes(14) && [2, 3, 4, 5].every((v) => uniqueSuited.includes(v))) {
      sfHigh = 5;
    }

    if (sfHigh) {
      handRank = sfHigh === 14 ? 10 : 9;
      handName = sfHigh === 14 ? "Royal Flush" : "Straight Flush";
      finalValues = [sfHigh, sfHigh - 1, sfHigh - 2, sfHigh - 3, sfHigh - 4];
    }
  } else if (valueCounts[0] === 4) {
    handRank = 8;
    handName = "Four of a Kind";
    const four = grouped[0].val;
    const kicker = Math.max(...allValues.filter((v) => v !== four));
    finalValues = [four, kicker];
  } else if (valueCounts[0] === 3 && valueCounts[1] >= 2) {
    handRank = 7;
    handName = "Full House";
    const trips = grouped[0].val;
    const pair = grouped.find((g) => g.count >= 2 && g.val !== trips).val;
    finalValues = [trips, pair];
  } else if (isFlush) {
    handRank = 6;
    handName = "Flush";
    const flushCards = hand
      .filter((c) => c.suit === flushSuit)
      .map((c) => rankMap[c.rank])
      .sort((a, b) => b - a);
    finalValues = flushCards.slice(0, 5);
  } else if (isStraight) {
    handRank = 5;
    handName = "Straight";
    finalValues = [straightHighCard];
  } else if (valueCounts[0] === 3) {
    handRank = 4;
    handName = "Three of a Kind";
    const trips = grouped[0].val;
    const kickers = allValues.filter((v) => v !== trips).sort((a, b) => b - a);
    finalValues = [trips, ...kickers.slice(0, 2)];
  } else if (valueCounts[0] === 2 && valueCounts[1] === 2) {
    handRank = 3;
    handName = "Two Pair";
    const pair1 = grouped[0].val;
    const pair2 = grouped[1].val;
    const kicker = Math.max(...allValues.filter((v) => v !== pair1 && v !== pair2));
    finalValues = [pair1, pair2, kicker];
  } else if (valueCounts[0] === 2) {
    handRank = 2;
    handName = "One Pair";
    const pair = grouped[0].val;
    const kickers = allValues.filter((v) => v !== pair).sort((a, b) => b - a);
    finalValues = [pair, ...kickers.slice(0, 3)];
  } else {
    handRank = 1;
    handName = "High Card";
    finalValues = allValues.sort((a, b) => b - a).slice(0, 5);
  }

  return { handName, handRank, values: finalValues };
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
  // Find indexes of players with money > 0
  const activeIndexes = playerMoney.value.map((money, i) => (money > 0 ? i : -1)).filter((i) => i !== -1);

  // Filter all player-related arrays to keep only active players
  playerMoney.value = activeIndexes.map((i) => playerMoney.value[i]);
  playerNames.value = activeIndexes.map((i) => playerNames.value[i]);
  playerBets.value = activeIndexes.map((i) => playerBets.value[i] || 0);
  playerFolded.value = activeIndexes.map((i) => playerFolded.value[i] || false);
  playerDialog.value = activeIndexes.map((i) => playerDialog.value[i] || "");
  hasActed.value = activeIndexes.map((i) => hasActed.value[i] || false);
  hands.value = activeIndexes.map((i) => hands.value[i]); // hands for each player

  // Update number of players
  numPlayers.value = playerMoney.value.length;
}

/* ============ Game Setup & Reset ============ */
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

  // Post Small Blind (capped at player's money, playerBets are 0 at this stage)
  const sbAmountToPost = Math.min(smallBlindAmount, playerMoney.value[sbIndex]);
  if (sbAmountToPost > 0) {
    playerMoney.value[sbIndex] -= sbAmountToPost;
    playerBets.value[sbIndex] += sbAmountToPost; // playerBets are 0 at this point in startNewRound
    pot.value += sbAmountToPost;
    addLog(`${playerNames.value[sbIndex]} posts small blind: ${sbAmountToPost}$`);
  }

  // Post Big Blind (capped at player's money, playerBets are 0 at this stage)
  const bbAmountToPost = Math.min(bigBlindAmount, playerMoney.value[bbIndex]);
  if (bbAmountToPost > 0) {
    playerMoney.value[bbIndex] -= bbAmountToPost;
    playerBets.value[bbIndex] += bbAmountToPost; // playerBets are 0 at this point in startNewRound
    pot.value += bbAmountToPost;
    addLog(`${playerNames.value[bbIndex]} posts big blind: ${bbAmountToPost}$`);
  }

  currentMaxBet.value = playerBets.value[bbIndex]; // BB sets the current max bet
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
  if (!roundEnded.value) {
    addLog("Cannot start a new round before the current one ends.");
    return;
  }

  roundEnded.value = false; // mark new round as started
  removeBrokePlayers();

  if (numPlayers.value < 2) {
    addLog("Not enough players to continue the game.");
    roundEnded.value = true;
    return;
  }

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
}

function proceedToNextPhase() {
  // Reset for the new betting round
  playerBets.value = Array(numPlayers.value).fill(0);
  currentMaxBet.value = 0;
  lastRaiser.value = null;
  // hasActed is reset by the deal/reveal functions below

  let logMessage = "";
  let roundEnded = false;

  if (gamePhase.value === "betting") {
    dealInitialFlop(); // Sets gamePhase to "flop", resets hasActed
    logMessage = "--- Flop ---";
  } else if (gamePhase.value === "flop") {
    revealTurnCard(); // Sets gamePhase to "turn", resets hasActed
    logMessage = "--- Turn ---";
  } else if (gamePhase.value === "turn") {
    revealRiverCard(); // Sets gamePhase to "river", resets hasActed
    logMessage = "--- River ---";
  } else if (gamePhase.value === "river") {
    gamePhase.value = "showdown";
    determineWinner();
    roundEnded = true;
  } else {
    console.error("proceedToNextPhase called with unexpected gamePhase:", gamePhase.value);
    roundEnded = true; // Halt progression
  }

  if (logMessage) {
    addLog(logMessage);
  }

  if (roundEnded) {
    return true; // Signal end of game (round) or error halt
  }

  // Determine who acts first in the new betting round (post-flop, post-turn, post-river)
  let firstToAct = -1;
  let startIndex;

  if (numPlayers.value === 2) {
    // Heads-up: Dealer (SB) acts first post-flop.
    startIndex = dealerPosition.value;
  } else {
    // 3+ players: SB (or first active player to dealer's left) acts first post-flop.
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
    // This should be caught by nextTurn's check for <=1 active players.
    console.error("CRITICAL: No active player found to start new betting round in proceedToNextPhase.");
  }

  return false; // Game continues to the new betting round
}

let isRunning = false; // <-- Put this at the top of your module/script, outside the function

async function nextTurn() {
  if (isRunning) return;
  isRunning = true;

  try {
    // Outer try for the whole function
    // Inner loop to find the next player to act or to end the betting round
    while (true) {
      const cp = currentPlayer.value;

      // Condition A: Only one non-folded player left?
      if (playerFolded.value.filter((f) => !f).length <= 1) {
        if (gamePhase.value !== "showdown") {
          // Avoid re-determining winner if already in showdown
          gamePhase.value = "showdown";
          determineWinner();
        }
        return;
      }

      // Condition B: Is current player folded?
      if (playerFolded.value[cp]) {
        currentPlayer.value = (cp + 1) % numPlayers.value;
        continue; // Move to next player, re-evaluate from top of while
      }

      // Condition C: Is current player all-in AND not yet marked as acted for this street?
      if (playerMoney.value[cp] === 0 && !playerFolded.value[cp] && !hasActed.value[cp]) {
        hasActed.value[cp] = true; // All-in player "acts" by default (effectively checks)
        // Do not break. The loop will continue to check if the round is over or move to the next player.
      }
      // Condition D: Is current player NOT all-in, NOT folded, and NOT acted?
      else if (playerMoney.value[cp] > 0 && !playerFolded.value[cp] && !hasActed.value[cp]) {
        // This player (human or AI) needs to make a decision.
        break; // Exit while loop, proceed to player/AI action section.
      }
      // If player has already acted, or was just marked acted because all-in, or is folded (handled by B),
      // then we check if the betting round is over.

      // Condition E: Is the betting round over?
      // (All non-folded players have either acted or are all-in and thus considered acted for the street)
      let roundOver = true;
      for (let i = 0; i < numPlayers.value; i++) {
        if (
          !playerFolded.value[i] && // Player is in the hand
          playerMoney.value[i] > 0 && // Player has chips to bet
          !hasActed.value[i]
        ) {
          // Player has not yet acted this street
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

      // If round is not over, and we didn't break for current player to act, move to the next player.
      currentPlayer.value = (cp + 1) % numPlayers.value;
    } // End of while(true) loop

    // If it's the human player's turn, exit and wait for their action
    // The while loop ensures that if player 0 is current, they have money and haven't acted.
    if (currentPlayer.value === 0 && playerMoney.value[0] > 0 && !hasActed.value[0] && !playerFolded.value[0]) {
      return; // Wait for human input
    }

    // AI's turn
    try {
      // Inner try for AI specific actions
      const aiDecision = getAIAction(currentPlayer.value);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate AI thinking
      handleAction(currentPlayer.value, aiDecision); // This also sets hasActed for the AI
    } catch (error) {
      console.error(`Error during AI ${playerNames.value[currentPlayer.value]}'s turn:`, error);
      addLog(`Error for ${playerNames.value[currentPlayer.value]}. They are folded due to an error.`);
      // Gracefully handle AI error: fold the AI and mark as acted
      if (currentPlayer.value >= 0 && currentPlayer.value < numPlayers.value) {
        playerFolded.value[currentPlayer.value] = true;
        hasActed.value[currentPlayer.value] = true; // Mark as acted (by folding due to error)
      }
      // The game will attempt to continue with this AI folded.
    }

    // AI's action is complete. Now check if the betting round is over or continue to the next player.

    // After AI action, check if the round is over.
    // This check is similar to Condition E in the while loop.
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

    // Betting round is not over, move to the next player and schedule nextTurn
    currentPlayer.value = (currentPlayer.value + 1) % numPlayers.value;
    setTimeout(nextTurn, 200); // Schedule the next turn processing
    // Note: isRunning will be set to false in the finally block.
    // The next call to nextTurn will start its logic with this new currentPlayer.
  } catch (e) {
    // Catch any unexpected error from the main try block of nextTurn
    console.error("Critical error in nextTurn game logic:", e);
    addLog("A critical error occurred. Game progression might be halted.");
    // isRunning will be set to false by the finally block.
    // The game might be frozen here if the error corrupted state or broke the setTimeout chain.
  } finally {
    isRunning = false; // Crucial: ensure isRunning is reset regardless of how the function exits.
  }
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
    // Reset hasActed for other players as this is a raise
    hasActed.value = hasActed.value.map((_, idx) => {
      if (idx === 0) return true; // The raiser (player 0) has acted
      if (playerFolded.value[idx]) return true; // Folded players remain acted/folded
      return false; // Other active players need to act again
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
      // Reset hasActed for other players as this is effectively a raise
      hasActed.value = hasActed.value.map((_, idx) => (idx === 0 || playerFolded.value[idx] ? true : false));
      msg += ", raising the bet!";
    }
    // The following two lines seem to be a copy-paste error from the 'raise' block and were causing issues.
    // lastRaiser.value = 0; // Already set if it's a raise
    // msg = `You raised $${raise} (to $${playerBets.value[0]})`; // Overwrites the all-in message
    // The hasActed reset for 'raise' was also duplicated here.
  }

  addLog(msg);
  hasActed.value[0] = true;
  currentPlayer.value = (currentPlayer.value + 1) % numPlayers.value;

  setTimeout(() => nextTurn(), 500);
}
/* ============ AI Decision Logic ============ */
function getAIAction(index) {
  const bet = playerBets.value[index];
  const toCall = currentMaxBet.value - bet;
  const money = playerMoney.value[index];
  const potSize = pot.value;
  const gamePhaseName = gamePhase.value; // "pre-flop", "flop", "turn", "river"
  const aggressionFactor = Math.random() * 0.4 + 0.6; // 0.6–1.0

  const aiFullHand = hands.value[index].concat(flop.value);
  const handEval = evaluateHand(aiFullHand);
  const rank = handEval.handRank;

  if (playerFolded.value[index]) return { action: "fold" };

  // Phase multipliers
  const phaseAggressionMultiplier =
    {
      "pre-flop": 0.6,
      flop: 0.8,
      turn: 1.0,
      river: 1.1,
    }[gamePhaseName] || 1.0;

  const adjustedAggression = aggressionFactor * phaseAggressionMultiplier;

  // All-in decision if short-stacked
  if (money < toCall && toCall > 0) {
    const callAllInChance = rank / 10 + (potSize / (potSize + money)) * 0.5;
    if (money > 0 && Math.random() < callAllInChance * adjustedAggression) {
      return { action: "call" }; // all-in call
    }
    return { action: "fold" };
  }

  const calculateRaiseAmount = () => {
    let baseRaiseRatio;
    if (rank >= 8) baseRaiseRatio = 0.7 + Math.random() * 0.6;
    else if (rank >= 5) baseRaiseRatio = 0.4 + Math.random() * 0.4;
    else if (rank >= 2) baseRaiseRatio = 0.3 + Math.random() * 0.25;
    else baseRaiseRatio = 0.2 + Math.random() * 0.2;

    let raiseAmount = potSize * baseRaiseRatio * adjustedAggression;
    return Math.max(minRaiseAmount, Math.round(raiseAmount / 5) * 5);
  };

  // === Decision Logic by Hand Strength ===
  if (rank >= 8) {
    // Monster
    if (toCall === 0) {
      return Math.random() < 0.9 * adjustedAggression ? { action: "raise", amount: calculateRaiseAmount() } : { action: "check" };
    } else {
      return Math.random() < 0.85 * adjustedAggression ? { action: "raise", amount: calculateRaiseAmount() } : { action: "call" };
    }
  } else if (rank >= 5) {
    // Strong Hand
    if (toCall === 0) {
      return Math.random() < 0.7 * adjustedAggression ? { action: "raise", amount: calculateRaiseAmount() } : { action: "check" };
    } else if (toCall <= money * (0.6 + adjustedAggression * 0.2)) {
      return Math.random() < 0.65 * adjustedAggression ? { action: "raise", amount: calculateRaiseAmount() } : { action: "call" };
    } else if (toCall <= money * (0.85 + adjustedAggression * 0.1)) {
      return Math.random() < 0.5 * adjustedAggression ? { action: "call" } : { action: "fold" };
    } else {
      return Math.random() < 0.25 * adjustedAggression ? { action: "call" } : { action: "fold" };
    }
  } else if (rank >= 2) {
    // Medium Hand
    if (toCall === 0) {
      return Math.random() < 0.5 * adjustedAggression ? { action: "raise", amount: calculateRaiseAmount() } : { action: "check" };
    } else if (toCall <= money * 0.25) {
      return Math.random() < 0.6 * adjustedAggression ? { action: "call" } : { action: "fold" };
    } else {
      return Math.random() < 0.3 * adjustedAggression ? { action: "call" } : { action: "fold" };
    }
  } else {
    // Weak Hand
    if (toCall === 0) {
      return Math.random() < 0.25 * adjustedAggression ? { action: "raise", amount: calculateRaiseAmount() } : { action: "check" };
    } else if (toCall <= money * 0.15) {
      return Math.random() < 0.25 * adjustedAggression ? { action: "call" } : { action: "fold" };
    } else {
      return { action: "fold" };
    }
  }
}

/* ======== Handle AI Actions with Validity Checks ======== */
function handleAction(i, actionDecision) {
  const { action, amount: intendedAdditionalRaiseAmount } = actionDecision; // amount is the *additional* raise AI wants

  const playerChips = playerMoney.value[i];
  const currentBetOnTable = playerBets.value[i] || 0;
  const costToCall = currentMaxBet.value - currentBetOnTable;

  if (action === "fold") {
    playerFolded.value[i] = true;
    addLog(`${playerNames.value[i]} folds.`);
  } else if (action === "raise") {
    // Assumes getAIAction confirmed AI can at least call (playerChips >= costToCall if costToCall > 0)
    // intendedAdditionalRaiseAmount is >= minRaiseAmount

    const affordableAdditionalRaise = playerChips - costToCall; // Max AI can add on top of call
    let actualAdditionalRaise = Math.min(intendedAdditionalRaiseAmount, affordableAdditionalRaise);

    // If not an all-in, ensure raise is at least minRaiseAmount.
    // If it IS an all-in, actualAdditionalRaise can be less than minRaiseAmount.
    if (playerChips > costToCall + actualAdditionalRaise) {
      // Not an all-in raise
      actualAdditionalRaise = Math.max(minRaiseAmount, actualAdditionalRaise);
    }

    if (actualAdditionalRaise <= 0 && costToCall === 0) {
      // Trying to raise 0 or less when no bet to call (e.g. min-betting 0)
      // This should be a check.
      addLog(`${playerNames.value[i]} checks.`);
    } else if (actualAdditionalRaise < 0) {
      // Error case or cannot make a positive raise
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
        handEvaluation: evaluateHand(fullHand),
      });
    }
  }

  if (activePlayers.length === 0) {
    addLog("No active players. Pot remains.");
    return;
  }

  // Sort by rank (higher is better)
  activePlayers.sort((a, b) => b.handEvaluation.handRank - a.handEvaluation.handRank);

  const winner = activePlayers[0];
  playerMoney.value[winner.index] += pot.value;

  addLog(`${playerNames.value[winner.index]} wins with ${winner.handEvaluation.handName} and receives $${pot.value}`);
  pot.value = 0;

  addLog(`--- End of Round ${currentRound.value} ---`);
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
