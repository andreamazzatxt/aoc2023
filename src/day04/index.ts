import run from "aocrunner"
import { commonElements, rangeFrom, timesEach } from "../utils/array.js"
import { Sum } from "../utils/reduce.js"

const parseInput = (rawInput: string) => rawInput
  .split("\n")
  .map((line =>
    line
      .split(": ")[1]
      .split(" | ")
      .map(numbers =>
        numbers
          .split(" ")
          .filter(v => v !== '')
          .map(Number))))


const part1 = (rawInput: string) =>
  parseInput(rawInput)
    .reduce((acc, [winners, ownedNumbers]) => {
      const matches = commonElements([winners, ownedNumbers]).length
      if (!matches) {
        return acc
      }

      let points = 1
      if (matches > 1) timesEach(matches - 1, () => points *= 2)

      return acc + points
    }, 0)


const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return input
    .reduce((acc, [winners, ownedNumbers], i) => {
      const matches = commonElements([winners, ownedNumbers]).length

      if (!matches) {
        return acc
      }

      rangeFrom(matches, i)
        .forEach(card => {
          acc[card] += acc[i];
        })

      return acc
    }, Array(input.length).fill(1))
    .reduce(Sum);
}

run({
  part1: {
    tests: [
      {
        input: `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
