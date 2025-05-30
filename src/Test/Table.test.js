// src/__tests__/Table.test.js
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  // Game State Refs
  roundLogs,
  hands,
  flop,
  pot,
  currentPlayer,
  gamePhase,
  currentMaxBet,
  raiseInput,
  playerNames,
  playerMoney,
  playerBets,
  playerFolded,
  playerPositions,
  hasActed,
  // Constants
  minRaiseAmount,
  // Computed
  callAmount,
  canCheck,
  canCall,
  canRaise,
  canAll,
  // Core Functions
  startGame,
  resetGame,
  startNewRound,
  playerAction,
  nextTurn, // You might not call this directly often, but through playerAction
  // Utility
  getSuitClass, // Less critical for logic bugs, but can be tested
  // Refs for game settings (these are not exported, so tests will use their defaults)
  // numPlayers (defaults to 6), startingMoney (defaults to 500), CostRound (defaults to 10)
} from "../js/Table.js"; // Adjust path if your test file is elsewhere

// Mock setTimeout and clearTimeout to control async flow in tests
vi.useFakeTimers();

describe("Poker Game Logic - Table.js", () => {
  // Helper to get default number of players if not exported
  const DEFAULT_NUM_PLAYERS = 6; // Based on your Table.js
  const DEFAULT_STARTING_MONEY = 500; // Based on your Table.js
  const DEFAULT_COST_ROUND = 10;

  beforeEach(() => {
    // Reset all relevant game state before each test to ensure independence
    // This is crucial!
    gamePhase.value = "idle"; // Start from a known state
    roundLogs.value = [];
    hands.value = {};
    flop.value = [];
    pot.value = 0;
    currentPlayer.value = 0;
    currentMaxBet.value = 0;
    raiseInput.value = minRaiseAmount;
    playerNames.value = [];
    playerMoney.value = [];
    playerBets.value = [];
    playerFolded.value = [];
    playerPositions.value = [];
    hasActed.value = [];
    // deck.value would also need reset if you were testing dealHands directly after a game
    // For most tests, startGame() will handle deck creation.
  });

  afterEach(() => {
    vi.clearAllTimers(); // Clear any pending timers
  });

  describe("startGame", () => {
    it("should initialize game state for a new game", () => {
      startGame();

      expect(gamePhase.value).toBe("betting");
      expect(playerNames.value.length).toBe(DEFAULT_NUM_PLAYERS);
      expect(playerMoney.value.length).toBe(DEFAULT_NUM_PLAYERS);
      expect(playerMoney.value[0]).toBe(DEFAULT_STARTING_MONEY - (playerBets.value[0] || 0)); // Account for potential blind
      expect(hands.value[0].length).toBe(2); // Player 0 has 2 cards
      expect(Object.keys(hands.value).length).toBe(DEFAULT_NUM_PLAYERS);

      // Check blinds and pot (this is a bit complex due to random dealer)
      // For a more deterministic test, you might need to mock Math.random or dealerPosition
      expect(pot.value).toBeGreaterThan(0); // Blinds should be posted
      const smallBlind = DEFAULT_COST_ROUND;
      const bigBlind = DEFAULT_COST_ROUND * 2;
      // Sum of posted blinds (some players might be all-in on blinds)
      const totalBlindsPosted = playerBets.value.reduce((sum, bet) => sum + bet, 0);
      expect(pot.value).toBe(totalBlindsPosted);

      // currentPlayer should be after Big Blind
      // This also depends on dealerPosition, making it tricky without mocking
      // For now, just check it's a valid index
      expect(currentPlayer.value).toBeGreaterThanOrEqual(0);
      expect(currentPlayer.value).toBeLessThan(DEFAULT_NUM_PLAYERS);

      // Timers: startGame calls nextTurn which might use setTimeout
      vi.runAllTimers(); // Ensure any initial AI turns (if applicable) are processed
    });
  });

  describe("resetGame", () => {
    it("should reset the game to idle state", () => {
      startGame(); // Get some state
      vi.runAllTimers();
      resetGame();

      expect(gamePhase.value).toBe("idle");
      expect(playerNames.value.length).toBe(0);
      expect(playerMoney.value.length).toBe(0);
      expect(pot.value).toBe(0);
      expect(flop.value.length).toBe(0);
      expect(roundLogs.value[0][0]).toContain("Game reset");
    });
  });

  describe("playerAction - Fold", () => {
    it("should mark player 0 as folded and advance turn", () => {
      startGame(); // Player 0 might be SB, BB, or UTG etc.
      vi.runAllTimers(); // Let initial blinds and turns resolve until it's potentially player 0's turn

      // To make this test deterministic, we need to ensure it's player 0's turn
      // This is a common challenge in testing stateful game loops.
      // For a simple fold test, we can force it if player 0 is not folded.
      if (!playerFolded.value[0]) {
        currentPlayer.value = 0; // Manually set to player 0's turn for this test
        playerAction("fold");
        expect(playerFolded.value[0]).toBe(true);
        expect(roundLogs.value[0].some((log) => log.includes("You folded."))).toBe(true);

        // Check if turn advanced (currentPlayer should not be 0 anymore unless only 2 players and other folded)
        // This depends on nextTurn logic
        vi.runAllTimers(); // Allow nextTurn to process
        // Add more assertions here based on expected next player or game phase
      }
    });
  });

  describe("playerAction - Check", () => {
    it("should allow player 0 to check if no bet is faced and it is their turn", () => {
      startGame();
      // Manipulate state so player 0 is current, and currentMaxBet equals their bet (e.g., player 0 is BB and action checks around)
      // This setup is key for a good test.
      // Example: Assume player 0 is Big Blind.
      // Let's find the BB. dealerPosition is random.
      // For simplicity, let's assume a scenario where player 0 *can* check.
      // A more robust test would set up this scenario explicitly.

      // Simplified scenario: Manually set player 0 to be able to check
      currentPlayer.value = 0;
      playerBets.value[0] = currentMaxBet.value; // e.g., both are 20 (BB) or 0 (first to act post-flop)
      hasActed.value[0] = false;
      playerFolded.value[0] = false;

      if (canCheck.value) {
        // Use the computed to ensure test setup is valid for the action
        playerAction("check");
        expect(roundLogs.value[0].some((log) => log.includes("You checked."))).toBe(true);
        expect(hasActed.value[0]).toBe(true);
        vi.runAllTimers();
        // Assert currentPlayer changed or phase changed
      } else {
        // This part of the test might indicate an issue with test setup if canCheck is false
        console.warn("Test setup for 'check' might be invalid as canCheck.value is false.");
      }
    });

    it("should NOT allow player 0 to check if facing a bet", () => {
      startGame();
      // Setup: Player 0 is current, currentMaxBet is > player 0's current bet
      currentPlayer.value = 0;
      playerBets.value[0] = 0; // Player 0 has bet 0
      currentMaxBet.value = 20; // But there's a bet of 20 to call
      hasActed.value[0] = false;
      playerFolded.value[0] = false;

      expect(canCheck.value).toBe(false); // Verify our computed property
      playerAction("check"); // Attempt to check

      // Check that the action was prevented
      expect(roundLogs.value[0].some((log) => log.includes("You cannot check"))).toBe(true);
      expect(hasActed.value[0]).toBe(false); // Should not have acted
      // Pot and player money should be unchanged from this illegal action
    });
  });

  // TODO: Add more tests for:
  // - Call (valid, all-in call, not enough money)
  // - Raise (valid, all-in raise, not enough money, less than minRaise)
  // - All-in (as a call, as an opening bet, as a raise)
  // - nextTurn logic:
  //   - Skipping folded players
  //   - Auto-acting all-in players on new streets
  //   - Ending betting round correctly (all acted or bets equalized)
  // - proceedToNextPhase:
  //   - Dealing flop, turn, river
  //   - Setting correct firstToAct post-flop
  // - evaluateHand (with various hand inputs)
  // - determineWinner (single winner, split pot)
});
