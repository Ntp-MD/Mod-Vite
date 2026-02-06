/**
 * Test Helpers for Poker Game
 */

/**
 * Create a controlled game state for testing
 */
export function setupTestGame(options = {}) {
  const { currentPlayerIndex = 0, playerMoneyOverride = null, phase = "betting" } = options;

  return {
    currentPlayerIndex,
    playerMoneyOverride,
    phase,
  };
}

/**
 * Wait for player's turn in async game flow
 */
export async function waitForPlayerTurn(currentPlayer, timeout = 5000) {
  const startTime = Date.now();

  while (currentPlayer.value !== 0) {
    if (Date.now() - startTime > timeout) {
      throw new Error("Timeout waiting for player turn");
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

/**
 * Create card object for testing
 */
export function createCard(rank, suit) {
  return { rank, suit };
}

/**
 * Create a specific hand for testing
 */
export function createTestHand(cards) {
  return cards.map(([rank, suit]) => createCard(rank, suit));
}

/**
 * Mock game state
 */
export function mockGameState(state) {
  return {
    pot: state.pot || 0,
    gamePhase: state.gamePhase || "idle",
    playerMoney: state.playerMoney || [],
    currentPlayer: state.currentPlayer || 0,
    ...state,
  };
}
