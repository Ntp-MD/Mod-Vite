<template>
  <div class="Table">
    <div class="Table-setting" v-if="gamePhase === 'idle'">
      <div>
        <label
          >Number of Players:
          <input type="number" v-model.number="numPlayers" min="2" max="6" />
        </label>
      </div>
      <div>
        <label
          >Difficulty:
          <select v-model="difficulty">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
      </div>
      <div>
        <label
          >Starting Money:
          <input type="number" v-model.number="startingMoney" min="100" />
        </label>
      </div>
      <button @click="startGame">Start New Round</button>
    </div>

    <div class="game-log">
      <div class="game-log-table">
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class="table-flob"></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
      </div>
      <div class="player-money">
        <div v-for="(money, index) in playerMoney" :key="index">{{ playerNames[index] }}: ${{ money }}</div>
      </div>
      <div v-for="(line, index) in log" :key="index">{{ line }}</div>
    </div>

    <div class="Table-action" v-if="(gamePhase === 'betting' || gamePhase === 'flop') && currentPlayer === 0">
      <button @click="playerAction('check')">Check</button>
      <button @click="playerAction('call')">Call</button>
      <button @click="playerAction('fold')">Fold</button>
      <button @click="customBet(1 / 3)">Bet 1/3</button>
      <button @click="customBet(2 / 3)">Bet 2/3</button>
      <button @click="customBet(1)">All-in</button>
      <div class="chip-buttons">
        <button @click="chipBet(10)">$10</button>
        <button @click="chipBet(20)">$20</button>
        <button @click="chipBet(50)">$50</button>
        <button @click="chipBet(100)">$100</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const log = ref([]);
const deck = ref([]);
const hands = ref({});
const playerNames = ref([]);
const playerMoney = ref([]);
const playerBets = ref([]);
const playerFolded = ref([]);
const pot = ref(0);
const currentPlayer = ref(0);
const gamePhase = ref("idle");
const flop = ref([]);
const currentMaxBet = ref(0);

const numPlayers = ref(3);
const difficulty = ref("medium");
const startingMoney = ref(500);

function startGame() {
  log.value = [];
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

  playerNames.value.forEach((name, i) => {
    log.value.push(`${name} hand: ` + formatHand(hands.value[i]));
  });

  nextTurn();
}

function nextTurn() {
  if (playerFolded.value.filter((f) => !f).length <= 1) {
    gamePhase.value = "showdown";
    determineWinner();
    return;
  }

  if (currentPlayer.value >= playerNames.value.length) {
    if (gamePhase.value === "betting") {
      dealInitialFlop();
      return;
    } else if (gamePhase.value === "flop" && flop.value.length < 5) {
      revealNextFlopCard();
      return;
    } else {
      gamePhase.value = "showdown";
      determineWinner();
      return;
    }
  }

  if (playerFolded.value[currentPlayer.value]) {
    currentPlayer.value++;
    nextTurn();
    return;
  }

  if (currentPlayer.value !== 0) {
    const action = getAIAction(currentPlayer.value);
    log.value.push(`${playerNames.value[currentPlayer.value]} chooses to ${action}`);
    handleAction(currentPlayer.value, action);
    currentPlayer.value++;
    nextTurn();
  }
}

function playerAction(action) {
  log.value.push(`${playerNames.value[0]} chooses to ${action}`);
  handleAction(0, action);
  currentPlayer.value++;
  nextTurn();
}

function customBet(fraction) {
  const amount = Math.floor(playerMoney.value[0] * fraction);
  if (amount <= 0) return;
  log.value.push(`${playerNames.value[0]} bets $${amount}`);
  playerMoney.value[0] -= amount;
  playerBets.value[0] += amount;
  currentMaxBet.value = Math.max(currentMaxBet.value, playerBets.value[0]);
  pot.value += amount;
  currentPlayer.value++;
  nextTurn();
}

function chipBet(amount) {
  if (playerMoney.value[0] < amount) return;
  log.value.push(`${playerNames.value[0]} bets $${amount}`);
  playerMoney.value[0] -= amount;
  playerBets.value[0] += amount;
  currentMaxBet.value = Math.max(currentMaxBet.value, playerBets.value[0]);
  pot.value += amount;
  currentPlayer.value++;
  nextTurn();
}

function handleAction(playerIndex, action) {
  if (action === "fold") {
    playerFolded.value[playerIndex] = true;
  } else if (action === "raise") {
    const raiseAmount = 20;
    playerMoney.value[playerIndex] -= raiseAmount;
    playerBets.value[playerIndex] += raiseAmount;
    currentMaxBet.value = Math.max(currentMaxBet.value, playerBets.value[playerIndex]);
    pot.value += raiseAmount;
  } else if (action === "call") {
    const callAmount = currentMaxBet.value - playerBets.value[playerIndex];
    playerMoney.value[playerIndex] -= callAmount;
    playerBets.value[playerIndex] += callAmount;
    pot.value += callAmount;
  } else if (action === "check") {
    // do nothing
  }
}

function getAIAction(index) {
  const handValue = evaluateHand(hands.value[index]);
  const callAmount = currentMaxBet.value - playerBets.value[index];

  if (playerMoney.value[index] < callAmount) return "fold";

  if (callAmount === 0) {
    if (handValue > 20) return "raise";
    if (handValue > 15) return "check";
    return "check";
  } else {
    if (handValue > 22) return "raise";
    if (handValue > 15) return "call";
    return "fold";
  }
}

function dealInitialFlop() {
  flop.value = deck.value.splice(0, 3);
  log.value.push(`\nFlop: ${formatHand(flop.value)}`);
  currentPlayer.value = 0;
  gamePhase.value = "flop";
  nextTurn();
}

function revealNextFlopCard() {
  const nextCard = deck.value.splice(0, 1)[0];
  flop.value.push(nextCard);
  log.value.push(`\nNew flop card: ${nextCard.rank}${nextCard.suit}`);
  currentPlayer.value = 0;
  nextTurn();
}

function determineWinner() {
  const scores = playerNames.value
    .map((name, i) => {
      const combined = hands.value[i].concat(flop.value);
      return {
        name,
        score: evaluateHand(combined),
        folded: playerFolded.value[i],
        index: i,
      };
    })
    .filter((p) => !p.folded)
    .sort((a, b) => b.score - a.score);

  const winner = scores[0];
  playerMoney.value[winner.index] += pot.value;
  log.value.push(`\nWinner: ${winner.name}, wins $${pot.value}`);
  gamePhase.value = "idle";
}

function createShuffledDeck() {
  const suits = ["♠", "♥", "♦", "♣"];
  const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  const cards = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      cards.push({ rank, suit });
    }
  }
  return cards.sort(() => Math.random() - 0.5);
}

function dealHands(playerCount, cardsPerHand) {
  const result = {};
  for (let i = 0; i < playerCount; i++) {
    result[i] = deck.value.splice(0, cardsPerHand);
  }
  return result;
}

function formatHand(hand) {
  return hand.map((card) => card.rank + card.suit).join(" ");
}

function evaluateHand(hand) {
  const rankMap = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };
  return hand.reduce((total, card) => total + rankMap[card.rank], 0);
}
</script>
