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
          <div>({{ playerPositions[i] }})</div>
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
    <div class="TableBoard">
      <div class="TimelineLog">
        <div v-for="(round, index) in roundLogs" :key="index" class="RoundLog">
          <div>Round {{ index + 1 }}</div>
          <div>
            <div v-for="(entry, i) in round" :key="i">{{ entry }}</div>
          </div>
        </div>
      </div>
      <div class="PlayerAction">
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
        <div class="ActionButton">
          <button :disabled="!canCheck" @click="playerAction('check')">Check</button>
          <button :disabled="!canCall" @click="playerAction('call', callAmount)">{{ `Call $${callAmount}` }}</button>
          <button :disabled="!canRaise" @click="playerAction('raise', raiseInput)">Raise ${{ raiseInput }}</button>
          <button :disabled="!canGoAllIn" @click="playerAction('all-in')">All-In</button>
          <button @click="playerAction('fold')">Fold</button>
        </div>
        <div class="ChipGroup">
          <div v-for="chip in raiseChips" :key="chip" class="ChipControl">
            <button @click="decreaseRaise(chip)">-</button>
            <button @click="setRaise(chip)">${{ chip }}</button>
            <button @click="increaseRaise(chip)">+</button>
          </div>
        </div>
        <div class="TableSetting">
          <button @click="startGame" :disabled="gamePhase !== 'idle'">Start Game</button>
          <button @click="startNewRound">Next Round</button>
          <button @click="resetGame">Reset</button>
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
const raiseInput = ref(5);
const CostRound = 5;
const numPlayers = ref(6);
const startingMoney = ref(5000);
const dealerPosition = ref(0);
const playerNames = ref([]);
const playerMoney = ref([]);
const playerBets = ref([]);
const playerFolded = ref([]);
const playerDialog = ref([]);
const playerPositions = ref([]);
const playerOrder = ref([]);
const hasActed = ref([]);

/* ============ Constants ============ */
const raiseChips = [5, 10, 20, 50, 100, 200];
const minRaiseAmount = 5;

/* ============ Computed ============ */
const callAmount = computed(() => Math.max(0, currentMaxBet.value - (playerBets.value[0] || 0)));

const maxRaiseAmount = computed(() => playerMoney.value[0] + (playerBets.value[0] || 0));

const canCheck = computed(() => currentMaxBet.value === (playerBets.value[0] || 0));

const canCall = computed(
  () => currentMaxBet.value > (playerBets.value[0] || 0) && playerMoney.value[0] >= currentMaxBet.value - (playerBets.value[0] || 0)
);

const canRaise = computed(() => playerMoney.value[0] > currentMaxBet.value - (playerBets.value[0] || 0));

const canGoAllIn = computed(() => playerMoney.value[0] > 0 && gamePhase.value !== "idle" && gamePhase.value !== "showdown");

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
  const rankMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 11, Q: 12, K: 13, A: 14 };
  const counts = {};
  const suits = {};
  const values = hand.map((c) => rankMap[c.rank]).sort((a, b) => a - b);

  for (const card of hand) {
    const val = rankMap[card.rank];
    counts[val] = (counts[val] || 0) + 1;
    suits[card.suit] = (suits[card.suit] || 0) + 1;
  }

  const isFlush = Object.values(suits).some((v) => v >= 5); // Check for 5 or more cards of the same suit
  let flushSuit = null;
  if (isFlush) {
    for (const suit in suits) {
      if (suits[suit] >= 5) {
        flushSuit = suit;
        break;
      }
    }
  }

  // Filter for flush cards if a flush exists, otherwise use all cards for straight check
  const cardsForStraightCheck = isFlush ? hand.filter((c) => c.suit === flushSuit) : hand;
  const straightValues = cardsForStraightCheck.map((c) => rankMap[c.rank]).sort((a, b) => a - b);

  let uniqueStraightValues = [...new Set(straightValues)].sort((a, b) => a - b); // Remove duplicates for straight check

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
    // Check for A-5 straight (wheel)
    if (
      !isStraight &&
      uniqueStraightValues.includes(14) &&
      uniqueStraightValues.includes(2) &&
      uniqueStraightValues.includes(3) &&
      uniqueStraightValues.includes(4) &&
      uniqueStraightValues.includes(5)
    ) {
      isStraight = true;
      straightHighCard = 5; // Ace plays low
    }
  }

  const valueCounts = Object.values(counts).sort((a, b) => b - a);

  let handRank = 0;
  let handName = "High Card";

  if (isFlush && isStraight && straightHighCard === 14) {
    // Royal Flush (Ace high straight flush)
    handRank = 10;
    handName = "Royal Flush";
  } else if (isFlush && isStraight) {
    handRank = 9;
    handName = "Straight Flush";
  } else if (valueCounts[0] === 4) {
    handRank = 8;
    handName = "Four of a Kind";
  } else if (valueCounts[0] === 3 && valueCounts[1] >= 2) {
    // Full House (can be 3 and 3, or 3 and 2)
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
  playerOrder.value = shuffleArray([...Array(numPlayers.value).keys()]);
  playerNames.value = Array.from({ length: numPlayers.value }, (_, i) => (i === 0 ? "You" : `AI ${i}`));
  hands.value = dealHands(numPlayers.value, 2);
  playerMoney.value = Array(numPlayers.value).fill(startingMoney.value);
  playerBets.value = Array(numPlayers.value).fill(0);
  playerFolded.value = Array(numPlayers.value).fill(false);
  playerDialog.value = Array(numPlayers.value).fill("");
  hasActed.value = Array(numPlayers.value).fill(false);

  assignPositions();

  const smallBlind = CostRound * 1;
  const bigBlind = CostRound * 2;

  const sbIndex = (dealerPosition.value + 1) % numPlayers.value;
  const bbIndex = (dealerPosition.value + 2) % numPlayers.value;
  addLog(`--- Round ${currentRound.value} ---`);
  playerMoney.value[sbIndex] -= smallBlind;
  playerBets.value[sbIndex] = smallBlind;
  pot.value += smallBlind;
  addLog(`${playerNames.value[sbIndex]} posts small blind: ${smallBlind}$`);

  playerMoney.value[bbIndex] -= bigBlind;
  playerBets.value[bbIndex] = bigBlind;
  pot.value += bigBlind;
  addLog(`${playerNames.value[bbIndex]} posts big blind: ${bigBlind}$`);

  currentMaxBet.value = bigBlind;
  currentPlayer.value = (bbIndex + 1) % numPlayers.value;

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

  for (let i = 0; i < numPlayers.value; i++) {
    playerMoney.value[i] -= CostRound;
    playerBets.value[i] = CostRound;
    pot.value += CostRound;
    addLog(`${playerNames.value[i]} posts ${CostRound}$`);
  }
  currentMaxBet.value = CostRound;
  addLog(`--- Round ${currentRound.value} ---`);
  currentPlayer.value = 0;
  nextTurn();
}

function proceedToNextPhase() {
  hasActed.value = Array(numPlayers.value).fill(false);
  playerBets.value = Array(numPlayers.value).fill(0);
  currentMaxBet.value = 0;
  lastRaiser.value = null;

  if (gamePhase.value === "betting") {
    dealInitialFlop();
    addLog("--- Flop ---");
    gamePhase.value = "flop";
  } else if (gamePhase.value === "flop") {
    revealTurnCard();
    addLog("--- Turn ---");
    gamePhase.value = "turn";
  } else if (gamePhase.value === "turn") {
    revealRiverCard();
    addLog("--- River ---");
    gamePhase.value = "river";
  } else if (gamePhase.value === "river") {
    gamePhase.value = "showdown";
    determineWinner();
    return true; // signal end of game
  }

  currentPlayer.value = 0;
  return false; // game continues
}

let isRunning = false; // <-- Put this at the top of your module/script, outside the function

async function nextTurn() {
  if (isRunning) return;
  isRunning = true;

  try {
    // Outer try for the whole function
    // Inner loop to find the next player to act or to end the betting round
    while (true) {
      // Only one player left (others folded)
      if (playerFolded.value.filter((f) => !f).length <= 1) {
        gamePhase.value = "showdown";
        determineWinner();
        return; // Exits nextTurn, finally will run
      }

      // Check if the current player needs to act
      // Ensure currentPlayer.value is valid index before accessing arrays
      if (
        currentPlayer.value >= 0 &&
        currentPlayer.value < numPlayers.value &&
        !playerFolded.value[currentPlayer.value] &&
        !hasActed.value[currentPlayer.value]
      ) {
        break; // Found an active player who hasn't acted yet in this betting round.
      }

      // Move to the next player
      currentPlayer.value = (currentPlayer.value + 1) % numPlayers.value;

      // Check if all active players have acted (i.e., betting round is complete)
      if (hasActed.value.every((acted, i) => acted || playerFolded.value[i])) {
        const ended = proceedToNextPhase(); // This resets hasActed for the new phase
        if (!ended) {
          // If the game didn't end (e.g., moved to flop, turn, river), schedule nextTurn for the new phase
          setTimeout(nextTurn, 500);
        }
        return; // Exits nextTurn, finally will run
      }
    } // End of while(true) loop for finding current player / ending betting round

    // If it's the human player's turn, exit and wait for their action
    if (currentPlayer.value === 0) {
      return; // Exits nextTurn, finally will run. Human action will call nextTurn again.
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

    // Check if betting round is over (e.g., if AI's action completed the betting)
    if (hasActed.value.every((acted, i) => acted || playerFolded.value[i])) {
      const ended = proceedToNextPhase();
      if (!ended) {
        setTimeout(nextTurn, 500);
      }
      return; // Exits nextTurn, finally will run
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
    // Reset hasActed for other players as this is a raise
    hasActed.value = hasActed.value.map((_, idx) => {
      if (idx === 0) return true; // The raiser (player 0) has acted
      if (playerFolded.value[idx]) return true; // Folded players remain acted/folded
      return false; // Other active players need to act again
    });
  } else if (action === "all-in") {
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
    lastRaiser.value = 0;
    msg = `You raised $${raise} (to $${playerBets.value[0]})`;
    if (action === "raise") {
      hasActed.value = hasActed.value.map((_, idx) => {
        if (idx === 0) return true; // The raiser (player 0) has acted
        if (playerFolded.value[idx]) return true; // Folded players remain acted/folded
        return false; // Other active players need to act again
      });
    }
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
  const aggressionFactor = Math.random() * 0.4 + 0.3; // AI personality: 0.3 (less aggressive) to 0.7 (more aggressive)

  const aiFullHand = hands.value[index].concat(flop.value);
  const handEval = evaluateHand(aiFullHand); // { handName, handRank, highCard, values }
  const rank = handEval.handRank;

  if (playerFolded.value[index]) return { action: "fold" };

  // If AI cannot afford to call the current bet, it can only fold or go all-in (call).
  if (money < toCall && toCall > 0) {
    // Decide whether to make an all-in call or fold
    // More likely to call all-in with better hands or if the amount is very small part of pot
    const callAllInChance = rank / 4 + (potSize / (potSize + money)) * 0.5; // Further Adjusted: even more willing to call all-in
    if (money > 0 && Math.random() < callAllInChance) {
      return { action: "call" }; // This will be an all-in call
    }
    return { action: "fold" };
  }

  const calculateRaiseAmount = () => {
    let baseRaiseRatio; // Ratio of pot to raise
    if (rank >= 8) {
      baseRaiseRatio = 0.7 + Math.random() * 0.6;
    } // 70-130% of pot for monsters
    else if (rank >= 5) {
      baseRaiseRatio = 0.4 + Math.random() * 0.4;
    } // 40-80% for strong hands
    else if (rank >= 2) {
      baseRaiseRatio = 0.25 + Math.random() * 0.25;
    } // 25-50% for medium (value/semi-bluff)
    else {
      baseRaiseRatio = 0.2 + Math.random() * 0.35;
    } // 20-40% for bluffs

    let raiseAmount = potSize * baseRaiseRatio;
    raiseAmount *= 1 + (aggressionFactor - 0.5) * 0.5; // Adjust by aggression (+/- 25%)

    // Ensure raise is at least minRaiseAmount and rounded
    return Math.max(minRaiseAmount, Math.round(raiseAmount / 5) * 5);
  };

  // AI can afford to call, or toCall is 0
  if (rank >= 8) {
    // Very Strong Hand (Four of a Kind+)
    if (toCall === 0) {
      // Option to check or bet
      return Math.random() < 0.9 + aggressionFactor * 0.1 ? { action: "raise", amount: calculateRaiseAmount() } : { action: "check" }; // Very high chance to bet/raise
    } else {
      // Facing a bet
      return Math.random() < 0.85 + aggressionFactor * 0.15 ? { action: "raise", amount: calculateRaiseAmount() } : { action: "call" }; // Very high chance to re-raise, otherwise call
    }
  } else if (rank >= 5) {
    // Strong Hand (Straight, Flush, Full House)
    if (toCall === 0) {
      return Math.random() < 0.7 + aggressionFactor * 0.2 ? { action: "raise", amount: calculateRaiseAmount() } : { action: "check" };
    } else {
      if (toCall <= money * (0.6 + aggressionFactor * 0.15)) {
        // Call is relatively small
        return Math.random() < 0.65 + aggressionFactor * 0.2 ? { action: "raise", amount: calculateRaiseAmount() } : { action: "call" };
      } else if (toCall <= money * (0.8 + aggressionFactor * 0.1)) {
        // Moderate call
        const rand = Math.random();
        if (rand < 0.3 + aggressionFactor * 0.1) return { action: "raise", amount: calculateRaiseAmount() }; // Small chance to re-raise
        else if (rand < 0.95 + aggressionFactor * 0.05) return { action: "call" }; // Very high chance to call
        else return { action: "fold" }; // Very small chance to fold
      } else {
        // Expensive call
        return Math.random() < 0.5 + aggressionFactor * 0.2 ? { action: "call" } : { action: "fold" }; // Decent chance to call expensive bets
      }
    }
  } else if (rank >= 2) {
    // Medium Hand (Pair, Two Pair, Three of a Kind)
    if (toCall === 0) {
      return Math.random() < 0.45 + aggressionFactor * 0.2 ? { action: "raise", amount: calculateRaiseAmount() } : { action: "check" }; // Increased semi-bluff/value bet
    } else {
      if (toCall <= money * (0.3 + aggressionFactor * 0.1)) {
        // Cheap call
        const rand = Math.random();
        if (rand < 0.2 + aggressionFactor * 0.15) return { action: "raise", amount: calculateRaiseAmount() }; // Increased semi-bluff raises
        if (rand < 0.9 + aggressionFactor * 0.1) return { action: "call" }; // Increased call likelihood
        return { action: "fold" };
      } else if (toCall <= money * (0.7 + aggressionFactor * 0.1)) {
        // Moderate call
        return Math.random() < 0.85 + aggressionFactor * 0.15 ? { action: "call" } : { action: "fold" }; // Significantly more likely to call
      } else {
        // Expensive call
        return Math.random() < 0.35 + aggressionFactor * 0.1 ? { action: "call" } : { action: "fold" }; // Small chance to call expensive bets
      }
    }
  } else {
    // Weak Hand (High Card)
    if (toCall === 0) {
      // Option to check or bluff
      return Math.random() < 0.2 + aggressionFactor * 0.15 ? { action: "raise", amount: calculateRaiseAmount() } : { action: "check" }; // Increased bluffing
    } else {
      // Only call if very cheap (good pot odds) or occasionally bluff call
      if (toCall <= money * (0.2 + aggressionFactor * 0.05) && toCall < potSize * 0.3) {
        // Willing to call slightly larger "very cheap" bets
        return Math.random() < 0.6 + aggressionFactor * 0.2 ? { action: "call" } : { action: "fold" }; // More likely to call
      }
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
        handEvaluation: evaluateHand(fullHand), // Contains { handName, handRank, ... }
      });
    }
  }

  // Sort by rank (higher better)
  activePlayers.sort((a, b) => b.handEvaluation.handRank - a.handEvaluation.handRank);

  const bestRankValue = activePlayers.length > 0 ? activePlayers[0].handEvaluation.handRank : -1;
  const winners = activePlayers.filter((p) => p.handEvaluation.handRank === bestRankValue);

  // Divide pot
  const potShare = Math.floor(pot.value / winners.length);
  winners.forEach((w) => {
    playerMoney.value[w.index] += potShare;
    addLog(`${playerNames.value[w.index]} wins with ${w.handEvaluation.handName} and receives $${potShare}`);
  });

  // Remainder (if any) goes to the first winner
  const remainder = pot.value % winners.length;
  if (remainder > 0 && winners.length > 0) {
    // Ensure there's a winner to give remainder to
    playerMoney.value[winners[0].index] += remainder;
    addLog(`${playerNames.value[winners[0].index]} receives an extra $${remainder} from remainder`);
  }

  pot.value = 0;

  addLog(`--- End of Round ${currentRound.value} ---`);

  /*
  // Automatically start new round after delay
  setTimeout(() => startNewRound(), 5000);
  */
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
