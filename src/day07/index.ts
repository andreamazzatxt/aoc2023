import run from "aocrunner"
import { NEW_LINE, SPACES, unique, containsTimes } from "../utils/index.js"

const parseInput = (rawInput: string) => rawInput.split(NEW_LINE).map(v => v.split(SPACES))

const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reverse()

const cardsWithJoker = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'].reverse()

const getScoreByType = (hand: string, withJoker = false) => {

  if (withJoker && hand.includes('J')) {
    return cards.filter(c => c !== 'J').reduce((acc, c) => {
      const score = getScoreByType(hand.replace(/J/g, c))
      if (score > acc) {
        return score
      }
      return acc
    }, 0)
  }

  const uniqueCards = unique(hand.split(''))
  // 5 of a kind
  if (uniqueCards.length === 1) return 6

  if (uniqueCards.length === 2) {
    // 4 of a kind
    if (uniqueCards.some(c => containsTimes(hand, c) === 4)) return 5

    //Full house
    return 4
  }

  if (uniqueCards.length === 3) {
    // 3 of a kind
    if (uniqueCards.some(c => containsTimes(hand, c) === 3)) return 3

    // 2 pair 
    return 2
  }

  // 1 pair
  if (uniqueCards.length === 4) return 1

  // High card
  return 0
}

const compareByOrder = (a: string, b: string, _cards: string[]) => {
  for (let i = 0; i < 5; i++) {
    const scoreA = _cards.indexOf(a[i])
    const scoreB = _cards.indexOf(b[i])
    if (scoreA !== scoreB) {
      return scoreA - scoreB
    }
  }
}

const part1 = (rawInput: string) => {
  const hands = parseInput(rawInput)

  const sorted = hands.sort(([a], [b]) => {
    const scoreA = getScoreByType(a)
    const scoreB = getScoreByType(b)

    return scoreA !== scoreB
      ? scoreA - scoreB
      : compareByOrder(a, b, cards)
  })

  return sorted.reduce((acc, [, bid], i) => acc + (+bid * (i + 1)), 0)
}

const part2 = (rawInput: string) => {
  const hands = parseInput(rawInput)

  const sorted = hands.sort(([a], [b]) => {
    const scoreA = getScoreByType(a, true)
    const scoreB = getScoreByType(b, true)

    return scoreA !== scoreB
      ? scoreA - scoreB
      : compareByOrder(a, b, cardsWithJoker)

  })

  return sorted.reduce((acc, [, bid], i) => acc + (+bid * (i + 1)), 0)
}

run({
  part1: {
    tests: [
      {
        input: `
        32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483`,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483`,
        expected: 5905,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
