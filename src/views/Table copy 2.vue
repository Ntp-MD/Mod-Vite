<style scoped>
@import url(/src/css/Table.css);
</style>
<template>
  <div>
    <div class="TableBody">
      <div class="PlayerTable">
        <div v-for="(name, i) in playerNames" :key="i" class="PlayerDetail" :class="{ active: i === currentPlayer, folded: playerFolded[i] }">
          <div>
            {{ name }}
            <span class="text-gray-400 text-sm">({{ playerPositions[i] }})</span>
          </div>
          <div v-if="i === 0 || !playerFolded[i]" class="GroupCard">
            <div v-for="(card, index) in hands[i]" :key="index" class="card" :class="cardClass(card)">{{ card.rank }}{{ card.suit }}</div>
          </div>
          <div>Money: ${{ playerMoney[i] }}</div>
          <div>Bet: ${{ playerBets[i] }}</div>
          <div>{{ playerDialog[i] }}</div>
        </div>
      </div>

      <div class="TableBoard">
        <div class="TableSetting">
          <label>
            Number of Players:
            <input type="number" v-model.number="numPlayers" min="4" max="6" />
          </label>

          <div>
            <label>
              Starting Money:
              <input type="number" v-model.number="startingMoney" min="1000" />
            </label>
          </div>
          <button @click="startGame">Start</button>

          <!-- Debug button -->
          <button @click="logGameState">Log Game State</button>
        </div>

        <div class="TableFlob">
          <div class="TableFlopCard GroupCard" v-if="flop && flop.length && ['flop', 'turn', 'river', 'showdown'].includes(gamePhase)">
            <div v-for="(card, index) in flop" :key="index" class="card" :class="cardClass(card)">{{ card.rank }}{{ card.suit }}</div>
          </div>
          <div class="PoolMoney">{{ pot }}$</div>
        </div>
        <div class="PlayerActionControl">
          <div class="PlayerActionGroup1">
            <button :disabled="!canCheck" @click="playerAction('check')">Check</button>
            <button :disabled="!canCall" @click="playerAction('call', callAmount)">
              {{ `Call $${callAmount}` }}
            </button>
            <button @click="playerAction('raise', raiseInput)">Raise ${{ raiseInput }}</button>
            <button @click="playerAction('fold')">Fold</button>
            <button @click="playerAction('allin')">All In</button>
          </div>

          <div class="PlayerActionGroup2">
            <div class="ChipControl">
              <div v-for="chip in customChips" :key="chip" class="Chip">
                <button @click="adjustRaise(-chip)">-</button>
                <button :class="{ selected: raiseInput === chip }">{{ chip }}</button>
                <button @click="adjustRaise(chip)">+</button>
              </div>
            </div>
          </div>
        </div>
        <div class="TimelineLog">
          <div>Action Timeline</div>
          <div v-for="round in logRounds" :key="round.round">
            <div class="font-bold">Round {{ round.round }}</div>
            <ul class="">
              <li v-for="(msg, idx) in round.turns" :key="idx">{{ msg }}</li>
            </ul>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

function createDeck() {
  const suits = ["♠", "♥", "♦", "♣"];
  const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  const deck = [];
  for (const s of suits) {
    for (const r of ranks) {
      deck.push({ rank: r, suit: s });
    }
  }
  return deck;
}

function shuffle(deck) {
  const d = [...deck];
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
}

const numPlayers = ref(5);
const startingMoney = ref(1000);

const players = ref([]);
const deck = ref([]);
const communityCards = ref([]);
const pot = ref(0);
const currentBet = ref(0);
const currentPlayer = ref(0);
const gameOver = ref(false);
const logMessages = ref([]);
const raiseInput = ref(10);
const customChips = [10, 20, 30, 50, 100];

const currentDealerIndex = ref(0);
const gamePhase = ref("pre-flop");

function adjustRaise(amount) {
  const newAmount = raiseInput.value + amount;
  raiseInput.value = Math.min(Math.max(1, newAmount), 1000);
}

function log(msg) {
  logMessages.value.unshift(msg);
  if (logMessages.value.length > 10) logMessages.value.pop();
}

const playerPositions = computed(() => {
  const positions = [];
  const n = players.value.length;
  if (n === 0) return positions;
  const dealer = currentDealerIndex.value;
  for (let i = 0; i < n; i++) {
    if (i === dealer) positions.push("D");
    else if (i === (dealer + 1) % n) positions.push("SB");
    else if (i === (dealer + 2) % n) positions.push("BB");
    else positions.push("UTG");
  }
  return positions;
});

function startGame() {
  pot.value = 0;
  communityCards.value = [];
  currentBet.value = 0;
  currentPlayer.value = 0;
  gameOver.value = false;
  logMessages.value = [];
  gamePhase.value = "pre-flop";

  deck.value = shuffle(createDeck());

  players.value = [];
  currentDealerIndex.value = 0;

  players.value.push({
    name: "You",
    money: startingMoney.value,
    hand: [],
    bet: 0,
    folded: false,
    isHuman: true,
  });

  for (let i = 1; i < numPlayers.value; i++) {
    players.value.push({
      name: `AI ${i}`,
      money: startingMoney.value,
      hand: [],
      bet: 0,
      folded: false,
      isHuman: false,
    });
  }

  for (const p of players.value) {
    p.hand = deck.value.splice(0, 2);
    p.bet = 0;
    p.folded = false;
  }

  // Post blinds (fixed 10 for simplicity)
  for (const p of players.value) {
    const blind = Math.min(10, p.money);
    p.money -= blind;
    p.bet = blind;
    pot.value += blind;
  }
  currentBet.value = 10;

  log("Game started. Cards dealt.");
  log("All players posted $10 blind.");

  // ถ้า currentPlayer ไม่ใช่ผู้เล่น ให้ AI เริ่มเล่น
  if (!players.value[currentPlayer.value].isHuman) {
    runAITurn();
  }
}

function nextPlayerTurn() {
  do {
    currentPlayer.value = (currentPlayer.value + 1) % players.value.length;
  } while (players.value[currentPlayer.value].folded);
}

function isRoundOver() {
  const activePlayers = players.value.filter((p) => !p.folded);
  if (activePlayers.length === 1) return true;

  const maxBet = Math.max(...players.value.map((p) => (p.folded ? 0 : p.bet)));
  return players.value.every((p) => p.folded || p.bet === maxBet);
}

function resetBets() {
  for (const p of players.value) {
    p.bet = 0;
  }
  currentBet.value = 0;
}

function nextPhase() {
  if (gamePhase.value === "pre-flop") {
    communityCards.value = []; // reset community cards ก่อนแจก flop
    communityCards.value.push(...deck.value.splice(0, 3)); // แจก flop 3 ใบ
    gamePhase.value = "flop";
    log("Flop dealt.");
  } else if (gamePhase.value === "flop") {
    communityCards.value.push(deck.value.shift()); // แจก turn 1 ใบ
    gamePhase.value = "turn";
    log("Turn dealt.");
  } else if (gamePhase.value === "turn") {
    communityCards.value.push(deck.value.shift()); // แจก river 1 ใบ
    gamePhase.value = "river";
    log("River dealt.");
  } else if (gamePhase.value === "river") {
    gamePhase.value = "showdown";
    finishRound();
    return;
  }

  resetBets();
  currentPlayer.value = (currentDealerIndex.value + 1) % players.value.length;

  if (!players.value[currentPlayer.value].isHuman) {
    runAITurn();
  }
}

function finishRound() {
  log("Round finished.");

  const activePlayers = players.value.filter((p) => !p.folded);
  if (activePlayers.length === 1) {
    const winner = activePlayers[0];
    winner.money += pot.value;
    log(`${winner.name} wins the pot of $${pot.value} by default.`);
    pot.value = 0;
    gameOver.value = true;
    return;
  }

  function rankValue(r) {
    if (r === "J") return 11;
    if (r === "Q") return 12;
    if (r === "K") return 13;
    if (r === "A") return 14;
    return parseInt(r);
  }

  let bestPlayer = null;
  let bestScore = -1;
  for (const p of activePlayers) {
    const totalScore = p.hand.concat(communityCards.value).reduce((a, c) => a + rankValue(c.rank), 0);
    if (totalScore > bestScore) {
      bestScore = totalScore;
      bestPlayer = p;
    }
  }

  bestPlayer.money += pot.value;
  log(`${bestPlayer.name} wins the pot of $${pot.value} with score ${bestScore}.`);
  pot.value = 0;
  gameOver.value = true;
}

function playerAction(action, amount = 0) {
  if (gameOver.value) return;
  const p = players.value[currentPlayer.value];
  if (p.isHuman === false) return; // ให้เฉพาะผู้เล่นมนุษย์เล่นผ่านฟังก์ชันนี้
  if (p.folded) return;

  switch (action) {
    case "fold":
      p.folded = true;
      log("You folded.");
      break;
    case "call": {
      const toCall = currentBet.value - p.bet;
      const callAmount = Math.min(toCall, p.money);
      p.money -= callAmount;
      p.bet += callAmount;
      pot.value += callAmount;
      log(`You called $${callAmount}.`);
      break;
    }
    case "raise": {
      const toCall = currentBet.value - p.bet;
      const totalRaise = toCall + amount;
      if (p.money >= totalRaise) {
        p.money -= totalRaise;
        p.bet += totalRaise;
        pot.value += totalRaise;
        currentBet.value = p.bet;
        log(`You raised to $${p.bet}.`);
      } else {
        log("Not enough money to raise.");
        return;
      }
      break;
    }
    case "check":
      if (p.bet === currentBet.value) {
        log("You checked.");
      } else {
        log("Cannot check, you need to call or fold.");
        return;
      }
      break;
    case "allin": {
      pot.value += p.money;
      p.bet += p.money;
      currentBet.value = Math.max(currentBet.value, p.bet);
      log(`You went all-in with $${p.money}.`);
      p.money = 0;
      break;
    }
    default:
      return;
  }

  if (isRoundOver()) {
    if (gamePhase.value === "river" || gamePhase.value === "showdown") {
      finishRound();
    } else {
      nextPhase();
    }
    return;
  }

  nextPlayerTurn();

  // เรียก AI เล่นถ้าผู้เล่นคนถัดไปเป็น AI
  if (!players.value[currentPlayer.value].isHuman) {
    runAITurn();
  }
}

function runAITurn() {
  if (gameOver.value) return;
  const p = players.value[currentPlayer.value];
  if (p.isHuman) return;

  if (p.folded) {
    nextPlayerTurn();
    runAITurn();
    return;
  }

  // AI logic ง่ายๆ: ถ้า currentBet > p.bet ต้อง call, ถ้าเงินเหลือเยอะลอง raise เล็กน้อย
  const toCall = currentBet.value - p.bet;

  if (toCall > 0 && p.money > toCall) {
    // call หรือ raise แบบสุ่ม
    if (p.money > toCall + 20 && Math.random() < 0.3) {
      // raise
      const raiseAmount = 20;
      p.money -= toCall + raiseAmount;
      p.bet += toCall + raiseAmount;
      pot.value += toCall + raiseAmount;
      currentBet.value = p.bet;
      log(`${p.name} raised to $${p.bet}.`);
    } else {
      // call
      p.money -= toCall;
      p.bet += toCall;
      pot.value += toCall;
      log(`${p.name} called $${toCall}.`);
    }
  } else if (toCall > 0 && p.money <= toCall) {
    // all-in call
    pot.value += p.money;
    p.bet += p.money;
    currentBet.value = Math.max(currentBet.value, p.bet);
    log(`${p.name} called all-in with $${p.money}.`);
    p.money = 0;
  } else {
    // check
    log(`${p.name} checked.`);
  }

  if (isRoundOver()) {
    if (gamePhase.value === "river" || gamePhase.value === "showdown") {
      finishRound();
      return;
    } else {
      nextPhase();
      return;
    }
  }

  nextPlayerTurn();

  // เรียก AI เล่นต่อถ้าผู้เล่นคนถัดไปยังเป็น AI
  if (!players.value[currentPlayer.value].isHuman) {
    runAITurn();
  }
}

const playerNames = computed(() => players.value.map((p) => p.name));
const playerMoney = computed(() => players.value.map((p) => p.money));
const playerBets = computed(() => players.value.map((p) => p.bet));
const playerFolded = computed(() => players.value.map((p) => p.folded));
const hands = computed(() => players.value.map((p) => p.hand));
const playerDialog = ref(new Array(6).fill(""));

const flop = computed(() => {
  if (!["flop", "turn", "river", "showdown"].includes(gamePhase.value)) return [];

  if (gamePhase.value === "flop") {
    return communityCards.value.slice(0, 3);
  } else if (gamePhase.value === "turn") {
    return communityCards.value.slice(0, 4);
  } else if (gamePhase.value === "river" || gamePhase.value === "showdown") {
    return communityCards.value.slice(0, 5);
  }
  return [];
});

const potAmount = computed(() => pot.value);

const callAmount = computed(() => {
  const p = players.value[currentPlayer.value];
  if (!p) return 0;
  return currentBet.value - p.bet;
});

const canCall = computed(() => {
  const p = players.value[currentPlayer.value];
  if (!p) return false;
  return !p.folded && p.money >= currentBet.value - p.bet;
});

const canCheck = computed(() => {
  const p = players.value[currentPlayer.value];
  if (!p) return false;
  return !p.folded && p.bet === currentBet.value;
});

function cardClass(card) {
  if (!card) return "";
  if (card.suit === "♥" || card.suit === "♦") return "redCard";
  return "blackCard";
}

function logGameState() {
  console.log({
    players: players.value,
    pot: pot.value,
    currentBet: currentBet.value,
    currentPlayer: currentPlayer.value,
    gamePhase: gamePhase.value,
    communityCards: communityCards.value,
  });
}
</script>
