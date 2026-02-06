import { describe, it, expect } from "vitest";

// Since evaluateHand is private, we'll test it indirectly
// or export it for testing purposes
// For now, let's create test helper to evaluate hands

/**
 * Helper function to create card objects
 */
function createCard(rank, suit) {
  return { rank, suit };
}

/**
 * Mock evaluateHand function (copy from Table.js for testing)
 */
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

function evaluateHand(hand) {
  const ranks = hand.map((c) => getRankValue(c.rank));
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

describe("Hand Evaluation", () => {
  describe("Royal Flush", () => {
    it("should detect Royal Flush", () => {
      const hand = [createCard("A", "♠"), createCard("K", "♠"), createCard("Q", "♠"), createCard("J", "♠"), createCard("10", "♠")];

      const result = evaluateHand(hand);
      expect(result.handName).toBe("Royal Flush");
      expect(result.handRank).toBe(10);
    });
  });

  describe("Straight Flush", () => {
    it("should detect Straight Flush", () => {
      const hand = [createCard("9", "♥"), createCard("8", "♥"), createCard("7", "♥"), createCard("6", "♥"), createCard("5", "♥")];

      const result = evaluateHand(hand);
      expect(result.handName).toBe("Straight Flush");
      expect(result.handRank).toBe(9);
    });

    it("should detect low Straight Flush (A-2-3-4-5)", () => {
      const hand = [createCard("A", "♦"), createCard("2", "♦"), createCard("3", "♦"), createCard("4", "♦"), createCard("5", "♦")];

      const result = evaluateHand(hand);
      expect(result.handName).toBe("Straight Flush");
      expect(result.handRank).toBe(9);
    });
  });

  describe("Four of a Kind", () => {
    it("should detect Four of a Kind", () => {
      const hand = [createCard("K", "♠"), createCard("K", "♥"), createCard("K", "♦"), createCard("K", "♣"), createCard("2", "♠")];

      const result = evaluateHand(hand);
      expect(result.handName).toBe("Four of a Kind");
      expect(result.handRank).toBe(8);
    });
  });

  describe("Full House", () => {
    it("should detect Full House", () => {
      const hand = [createCard("A", "♠"), createCard("A", "♥"), createCard("A", "♦"), createCard("K", "♠"), createCard("K", "♥")];

      const result = evaluateHand(hand);
      expect(result.handName).toBe("Full House");
      expect(result.handRank).toBe(7);
    });
  });

  describe("Flush", () => {
    it("should detect Flush", () => {
      const hand = [createCard("K", "♣"), createCard("10", "♣"), createCard("7", "♣"), createCard("5", "♣"), createCard("2", "♣")];

      const result = evaluateHand(hand);
      expect(result.handName).toBe("Flush");
      expect(result.handRank).toBe(6);
    });
  });

  describe("Straight", () => {
    it("should detect Straight", () => {
      const hand = [createCard("10", "♠"), createCard("9", "♥"), createCard("8", "♦"), createCard("7", "♣"), createCard("6", "♠")];

      const result = evaluateHand(hand);
      expect(result.handName).toBe("Straight");
      expect(result.handRank).toBe(5);
    });

    it("should detect low Straight (A-2-3-4-5)", () => {
      const hand = [createCard("A", "♠"), createCard("2", "♥"), createCard("3", "♦"), createCard("4", "♣"), createCard("5", "♠")];

      const result = evaluateHand(hand);
      expect(result.handName).toBe("Straight");
      expect(result.handRank).toBe(5);
    });
  });

  describe("Three of a Kind", () => {
    it("should detect Three of a Kind", () => {
      const hand = [createCard("Q", "♠"), createCard("Q", "♥"), createCard("Q", "♦"), createCard("9", "♣"), createCard("2", "♠")];

      const result = evaluateHand(hand);
      expect(result.handName).toBe("Three of a Kind");
      expect(result.handRank).toBe(4);
    });
  });

  describe("Two Pair", () => {
    it("should detect Two Pair", () => {
      const hand = [createCard("J", "♠"), createCard("J", "♥"), createCard("8", "♦"), createCard("8", "♣"), createCard("3", "♠")];

      const result = evaluateHand(hand);
      expect(result.handName).toBe("Two Pair");
      expect(result.handRank).toBe(3);
    });
  });

  describe("One Pair", () => {
    it("should detect One Pair", () => {
      const hand = [createCard("10", "♠"), createCard("10", "♥"), createCard("K", "♦"), createCard("7", "♣"), createCard("2", "♠")];

      const result = evaluateHand(hand);
      expect(result.handName).toBe("One Pair");
      expect(result.handRank).toBe(2);
    });
  });

  describe("High Card", () => {
    it("should detect High Card", () => {
      const hand = [createCard("A", "♠"), createCard("J", "♥"), createCard("9", "♦"), createCard("5", "♣"), createCard("2", "♠")];

      const result = evaluateHand(hand);
      expect(result.handName).toBe("High Card");
      expect(result.handRank).toBe(1);
    });
  });

  describe("7-Card Hands (Texas Hold'em)", () => {
    it("should find best 5-card hand from 7 cards", () => {
      const hand = [
        // Player's 2 cards
        createCard("A", "♠"),
        createCard("A", "♥"),
        // Community 5 cards
        createCard("A", "♦"),
        createCard("K", "♠"),
        createCard("K", "♥"),
        createCard("2", "♣"),
        createCard("3", "♠"),
      ];

      const result = evaluateHand(hand);
      expect(result.handName).toBe("Full House");
      expect(result.handRank).toBe(7);
    });

    it("should detect flush from 7 cards", () => {
      const hand = [
        createCard("A", "♥"),
        createCard("2", "♣"),
        createCard("K", "♥"),
        createCard("Q", "♥"),
        createCard("J", "♥"),
        createCard("9", "♥"),
        createCard("3", "♠"),
      ];

      const result = evaluateHand(hand);
      expect(result.handName).toBe("Flush");
      expect(result.handRank).toBe(6);
    });
  });
});
