import run from "aocrunner"
import { NEW_LINE, SPACES, rangeFrom } from "../utils/index.js"

const parseInput = (rawInput: string) => {
  const [time, distance] = rawInput.split(NEW_LINE)
    .map(line => line
      .split(':')[1]
      .trim()
      .split(SPACES))

  return {
    part1: time.map((t, i) => [+t, +distance[i]]),
    part2: [+time.join(''), +distance.join('')]
  }
}

const part1 = (rawInput: string) => {
  const races = parseInput(rawInput).part1

  const winningResults = races.map(([time, distance]) =>
    rangeFrom(time, 1, true)
      .map((pushTime) => pushTime * (time - pushTime))
      .filter(r => r > distance))

  return winningResults.reduce((acc, times) => acc * times.length, 1)

}
const part2 = (rawInput: string) => {
  const [time, distance] = parseInput(rawInput).part2

  const results = rangeFrom(time, 1, true)
    .map((pushTime) => pushTime * (time - pushTime))

  return results.filter(r => r > distance).length
}

run({
  part1: {
    tests: [
      {
        input: `
Time:      7  15   30
Distance:  9  40  200`,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
Time:      7  15   30
Distance:  9  40  200`,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
