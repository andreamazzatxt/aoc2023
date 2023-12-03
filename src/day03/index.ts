import run from "aocrunner"
import { matrixForEach, unique } from "../utils/array.js"
import { getAdiacents } from "../utils/matrix.js"
import { AdiacentType, Coord } from "../utils/types.js"

type Gear = AdiacentType<string>

interface Number extends Coord {
  value: string;
  gears: Gear[];
}

const parseInput = (rawInput: string) => rawInput
  .split("\n")
  .map((line) => line.split(""))

const checkIsPartNumber = ({ x, y }, input: string[][]) =>
  Object.values(getAdiacents({ x, y }, input))
    .some(({ value }) =>
      value !== undefined
      && value !== '.'
      && isNaN(+value))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let currentNumber = []
  const numbers: number[] = []

  matrixForEach(input, (cell, row, _, x, y) => {
    if (isNaN(+cell)) {
      return
    }

    currentNumber
      .push({ x, y, value: cell, isPartNumber: checkIsPartNumber({ x, y }, input) })

    if (!isNaN(+ row[x + 1])) {
      return
    }

    if (currentNumber.some(c => c.isPartNumber)) {
      numbers.push(+currentNumber.map(({ value }) => value).join(''))
    }

    currentNumber = []
  })


  return numbers.reduce((acc, n) => acc + n, 0)
}


const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let currentNumber: Number[] = []
  const numbers: Number[][] = []

  matrixForEach(input, (cell, row, _, x, y) => {
    if (isNaN(+cell)) {
      return
    }

    const gears = Object.values(getAdiacents({ x, y }, input))
      .filter(({ value }) => value === '*')

    currentNumber.push({ x, y, value: cell, gears })
    const nextChar = row[x + 1]

    if (isNaN(+nextChar)) {
      numbers.push(currentNumber)
      currentNumber = []
    }
  })

  const parsednumbers = numbers
    .map(number => ({
      value: +number.map(({ value }) => value).join(''),
      gears: unique(number.flatMap(({ gears }) => gears))
    }))

  const gearsMap = new Map<string, number[]>()

  parsednumbers.forEach(({ value, gears }) => gears.forEach(gear => {
    const id = `${gear.coord.x},${gear.coord.y}`
    if (!gearsMap.has(id)) {
      gearsMap.set(id, [value])
    } else {
      gearsMap.set(id, [...gearsMap.get(id), value])
    }
  }))


  return [...gearsMap.values()]
    .reduce((acc, n) =>
      unique(n).length !== 2
        ? acc
        : acc + unique(n)
          .reduce((acc, v) => acc * v, 1),
      0)
}

run({
  part1: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
