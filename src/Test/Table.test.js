import { ref } from "vue";
import { proceedToNextPhase, nextTurn, playerAction, getAIAction } from "./Table.test"; // adjust path accordingly

// Mocks for reactive variables used in the main logic
let numPlayers, playerMoney, playerFolded, playerBets, currentPlayer;
let gamePhase, hasActed, dealerPosition, currentMaxBet, lastRaiser;
let pot, callAmount, canCheck, canCall, canRaise, canAll;
let playerNames, hands, flop, minRaiseAmount;

beforeEach(() => {
  numPlayers = ref(2);
  playerMoney = ref([1000, 1000]);
  playerFolded = ref([false, false]);
  playerBets = ref([0, 0]);
  currentPlayer = ref(0);
  gamePhase = ref("betting");
  hasActed = ref([false, false]);
  dealerPosition = ref(1);
  currentMaxBet = ref(0);
  lastRaiser = ref(null);
  pot = ref(0);
  callAmount = ref(0);
  canCheck = ref(true);
  canCall = ref(true);
  canRaise = ref(true);
  canAll = ref(true);
  playerNames = ref(["You", "AI"]);
  hands = ref([
    ["2H", "3D"],
    ["4S", "5C"],
  ]);
  flop = ref(["6H", "7D", "8S"]);
  minRaiseAmount = 20;

  // Inject refs into logic or mock game context if needed
});

describe("Poker game logic", () => {
  test("Player fold sets folded state", () => {
    playerAction("fold");
    expect(playerFolded.value[0]).toBe(true);
  });

  test("Player call deducts money and adds to pot", () => {
    currentMaxBet.value = 100;
    playerBets.value[0] = 50;
    callAmount.value = 50;
    canCall.value = true;

    playerAction("call");

    expect(playerMoney.value[0]).toBe(950);
    expect(pot.value).toBe(50);
    expect(playerBets.value[0]).toBe(100);
  });

  test("AI makes valid decision", () => {
    const aiAction = getAIAction(1);
    expect(["fold", "call", "raise", "check"]).toContain(aiAction.action);
  });

  test("proceedToNextPhase progresses to flop", () => {
    gamePhase.value = "betting";
    const ended = proceedToNextPhase();
    expect(gamePhase.value).toBe("flop");
    expect(ended).toBe(false);
  });

  test("proceedToNextPhase reaches showdown", () => {
    gamePhase.value = "river";
    const ended = proceedToNextPhase();
    expect(gamePhase.value).toBe("showdown");
    expect(ended).toBe(true);
  });
});
