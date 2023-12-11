import run from "aocrunner"
import { Coord, NEW_LINE, Sum, getCombinations, manhattan, matrixForEach, matrixSearch } from "../utils/index.js"

const parseInput = (rawInput: string) => rawInput.split(NEW_LINE).map(line => line.split(''))


const getEmptyRowsAndCols = (input: string[][]) => {
  const rowsToExpand: number[] = []

  for (let i = 0; i < input.length; i++) {
    const currentRow = input[i]
    if (currentRow.every(v => v === '.')) {
      rowsToExpand.push(i)
    }
  }

  const colsToExpand: number[] = []
  for (let k = 0; k < input[0].length; k++) {
    const currentCol = input.map(row => row[k])
    if (currentCol.every(v => v === '.')) {
      colsToExpand.push(k)
    }
  }

  return { rowsToExpand, colsToExpand }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const { rowsToExpand, colsToExpand } = getEmptyRowsAndCols(input)
  const galaxies = matrixSearch('#', input)
  const distances = getCombinations(galaxies)
    .map(([a, b]) => {
      const expandedCols = colsToExpand
        .filter(col => col > Math.min(a.x, b.x) && col < Math.max(a.x, b.x)).length
      const expandedRows = rowsToExpand
        .filter(row => row > Math.min(a.y, b.y) && row < Math.max(a.y, b.y)).length

      return manhattan(a, b) + expandedCols + expandedRows
    })
  return distances.reduce(Sum)
}

const part2 = (rawInput: string) => {
  const MULTIPLIER = 1000000 - 1
  const input = parseInput(rawInput)

  const { rowsToExpand, colsToExpand } = getEmptyRowsAndCols(input)
  const galaxies = matrixSearch('#', input)
  const distances = getCombinations(galaxies)
    .map(([a, b]) => {
      const expandedCols = colsToExpand
        .filter(col => col > Math.min(a.x, b.x) && col < Math.max(a.x, b.x)).length * MULTIPLIER
      const expandedRows = rowsToExpand
        .filter(row => row > Math.min(a.y, b.y) && row < Math.max(a.y, b.y)).length * MULTIPLIER

      return manhattan(a, b) + expandedCols + expandedRows
    })
  return distances.reduce(Sum)
}

run({
  part1: {
    tests: [
      {
        input: `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`,
        expected: 374,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // Test case for part 2 was provided with a 10x multiplier 
      //       {
      //         input: `
      // ...#......
      // .......#..
      // #.........
      // ..........
      // ......#...
      // .#........
      // .........#
      // ..........
      // .......#..
      // #...#.....`,
      //         expected: 1030,
      //       },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
