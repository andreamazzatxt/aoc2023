import run from "aocrunner"
import { NEW_LINE, SPACES, Sum, timesEach } from "../utils/index.js"

const parseInput = (rawInput: string) => rawInput.split(NEW_LINE).map(line => line.split(SPACES).map(Number))

const getSequences = (history: number[]) => {
  const acc = [[...history]]
  let current = [...history]

  while (!current.every((v) => v === 0)) {
    const next: number[] = []
    timesEach(current.length - 1, i => next.push(current[i + 1] - current[i]))
    current = [...next]
    acc.push([...next])
  }

  return acc.reverse()
}



const part1 = (rawInput: string) =>
  parseInput(rawInput).map((value) =>
    getSequences(value)
      .reduce((acc, sequence) => sequence.at(-1) + acc, 0)
  ).reduce(Sum)




const part2 = (rawInput: string) =>
  parseInput(rawInput).map((value) =>
    getSequences(value)
      .reduce((acc, sequence) => sequence.at(0) - acc, 0)
  ).reduce(Sum)

run({
  part1: {
    tests: [
      {
        input: `
        0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
        expected: 114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
