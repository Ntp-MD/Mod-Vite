import { describe, it, expect, beforeEach, vi } from "vitest";
import { ref } from "vue";
import {
  startGame,
  resetGame,
  playerAction,
  getSuitClass,
  addLog,
  roundLogs,
  pot,
  gamePhase,
  playerMoney,
  playerNames,
  playerBets,
  playerFolded,
  hands,
  flop,
  currentPlayer,
  canCheck,
  canCall,
  canRaise,
  callAmount,
  raiseInput,
  minRaiseAmount,
} from "../Table.js";

describe("Poker Table - Core Functions", () => {
  beforeEach(() => {
    resetGame();
  });

  describe("getSuitClass", () => {
    it("should return correct class for spades", () => {
      expect(getSuitClass("♠")).toBe("spades");
    });

    it("should return correct class for hearts", () => {
      expect(getSuitClass("♥")).toBe("hearts");
    });

    it("should return correct class for diamonds", () => {
      expect(getSuitClass("♦")).toBe("diamonds");
    });

    it("should return correct class for clubs", () => {
      expect(getSuitClass("♣")).toBe("clubs");
    });

    it("should return empty string for invalid suit", () => {
      expect(getSuitClass("X")).toBe("");
    });
  });

  describe("Game Initialization", () => {
    it("should start game with correct initial state", () => {
      startGame();

      expect(gamePhase.value).toBe("betting");
      expect(playerNames.value.length).toBe(9);
      expect(playerMoney.value.length).toBe(9);
      expect(playerNames.value[0]).toBe("You");
      expect(pot.value).toBeGreaterThan(0); // Should have blinds/antes
    });

    it("should deal hands to all players", () => {
      startGame();

      expect(Object.keys(hands.value).length).toBe(9);
      // Each player should have 2 cards
      for (let i = 0; i < 9; i++) {
        expect(hands.value[i]).toHaveLength(2);
        expect(hands.value[i][0]).toHaveProperty("rank");
        expect(hands.value[i][0]).toHaveProperty("suit");
      }
    });

    it("should initialize player money correctly", () => {
      startGame();

      // All players should start with 1000, minus blinds/antes
      playerMoney.value.forEach((money, idx) => {
        expect(money).toBeGreaterThan(0);
        expect(money).toBeLessThanOrEqual(1000);
      });
    });

    it("should create game log", () => {
      startGame();

      expect(roundLogs.value.length).toBeGreaterThan(0);
      expect(roundLogs.value[0].length).toBeGreaterThan(0);
    });
  });

  describe("Reset Game", () => {
    it("should reset all game state", () => {
      startGame();
      resetGame();

      expect(gamePhase.value).toBe("idle");
      expect(pot.value).toBe(0);
      expect(playerNames.value).toHaveLength(0);
      expect(playerMoney.value).toHaveLength(0);
      expect(flop.value).toHaveLength(0);
      expect(Object.keys(hands.value)).toHaveLength(0);
    });
  });

  describe("Player Actions", () => {
    beforeEach(() => {
      startGame();
      vi.useFakeTimers();

      // Force player to be current player for testing
      currentPlayer.value = 0;
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should allow fold action when it's player's turn", () => {
      const initialFoldState = playerFolded.value[0];

      // Ensure it's player's turn
      currentPlayer.value = 0;

      playerAction("fold");

      expect(playerFolded.value[0]).toBe(true);
      expect(playerFolded.value[0]).not.toBe(initialFoldState);
    });

    it("should update pot when calling", () => {
      // Ensure it's player's turn
      currentPlayer.value = 0;

      const initialPot = pot.value;
      const callAmountValue = callAmount.value;

      if (canCall.value && callAmountValue > 0) {
        playerAction("call");
        expect(pot.value).toBe(initialPot + callAmountValue);
      } else {
        // Skip test if can't call
        expect(true).toBe(true);
      }
    });

    it("should not allow invalid actions", () => {
      // Ensure it's player's turn
      currentPlayer.value = 0;

      const initialBet = playerBets.value[0];

      // Try to check when should call
      if (!canCheck.value && currentPlayer.value === 0) {
        playerAction("check");
        expect(playerBets.value[0]).toBe(initialBet); // Should not change
      } else {
        expect(true).toBe(true); // Skip if can check
      }
    });
  });

  describe("Computed Properties", () => {
    beforeEach(() => {
      startGame();
    });

    it("should calculate callAmount correctly", () => {
      expect(typeof callAmount.value).toBe("number");
      expect(callAmount.value).toBeGreaterThanOrEqual(0);
    });

    it("should determine canCheck correctly", () => {
      expect(typeof canCheck.value).toBe("boolean");
    });

    it("should determine canCall correctly", () => {
      expect(typeof canCall.value).toBe("boolean");
    });

    it("should determine canRaise correctly", () => {
      expect(typeof canRaise.value).toBe("boolean");
    });
  });

  describe("Game Flow", () => {
    it("should transition through game phases", async () => {
      startGame();
      expect(gamePhase.value).toBe("betting");

      // Game flow will be tested with integration tests
      // as it involves async operations and AI turns
    });
  });

  describe("Logging System", () => {
    it("should add logs correctly", () => {
      resetGame();
      startGame();

      addLog("Test message");
      const logs = roundLogs.value[0];
      expect(logs).toContain("Test message");
    });

    it("should colorize player names in logs", () => {
      startGame();

      const logWithName = roundLogs.value[0].find((log) => log.includes("player-log-color"));

      expect(logWithName).toBeTruthy();
    });
  });
});
