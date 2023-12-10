import run from "aocrunner"
import { Coord, NEW_LINE, getAdiacents, matrixForEach } from "../utils/index.js"

const parseInput = (rawInput: string) => rawInput.split(NEW_LINE).map(l => l.split(''))

type Direction = 'N' | 'S' | 'E' | 'W'

type Step = { direction: Direction, coord: Coord, pipe: string, count: number }

const pipesToDirection = {
  //NORTH - SOUTH
  '|': (direction: Direction) => direction,
  //EAST - WEST
  '-': (direction: Direction) => direction,
  //NORTH - EAST
  'L': (direction: Direction) => direction === 'S' ? 'E' : 'N',
  //NORTH - WEST
  'J': (direction: Direction) => direction === 'S' ? 'W' : 'N',
  //SOUTH - WEAST
  '7': (direction: Direction) => direction === 'N' ? 'W' : 'S',
  //SOUTH - EAST
  'F': (direction: Direction) => direction === 'N' ? 'E' : 'S',
}

const getNextPipeCoord = (direction: Direction, coord: Coord) => {
  switch (direction) {
    case 'N':
      return { ...coord, y: coord.y - 1 }
    case 'S':
      return { ...coord, y: coord.y + 1 }
    case 'E':
      return { ...coord, x: coord.x + 1 }
    case 'W':
      return { ...coord, x: coord.x - 1 }
  }
}

const findStart = (pipes: string[][]) => {
  for (let y = 0; y < pipes.length; y++) {
    for (let x = 0; x < pipes[y].length; x++) {
      if (pipes[y][x] === 'S') {
        return [x, y]
      }
    }
  }
}


const getSecondsStepsWithDirections = (start: number[], pipes: string[][]) => {
  const { top, bottom, left, right } = getAdiacents({ x: start[0], y: start[1] }, pipes)

  const steps: Step[] = []

  if (top.value && top.value !== '.') {
    steps.push({ direction: pipesToDirection[top.value]('N'), coord: top.coord, count: 1, pipe: top.value })
  }
  if (bottom.value && bottom.value !== '.') {
    steps.push({ direction: pipesToDirection[bottom.value]('S'), coord: bottom.coord, count: 1, pipe: bottom.value })
  }
  if (left.value && left.value !== '.') {
    steps.push({ direction: pipesToDirection[left.value]('W'), coord: left.coord, count: 1, pipe: left.value })
  }
  if (right.value && right.value !== '.') {
    steps.push({ direction: pipesToDirection[right.value]('E'), coord: right.coord, count: 1, pipe: right.value })
  }

  return steps
}

const processStep = (step: Step, pipes: string[][]) => {
  const nextCoord = getNextPipeCoord(step.direction, step.coord)
  const nextPipe = pipes[nextCoord.y][nextCoord.x]
  const nextDirection = pipesToDirection[nextPipe](step.direction)
  step.coord = nextCoord
  step.direction = nextDirection
  step.pipe = nextPipe
  step.count++
}


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const start = findStart(input)
  const [first, second] = getSecondsStepsWithDirections(start, input)

  while (first.coord.x !== second.coord.x || first.coord.y !== second.coord.y) {
    processStep(first, input)
    processStep(second, input)
  }

  return first.count
}

const part2 = (rawInput: string) => {
  const input = parseInput(
    rawInput)
  const start = findStart(input)
  const [first, second] = getSecondsStepsWithDirections(start, input)
  const loopCoord = [first.coord, second.coord, { x: start[0], y: start[1] }]
  while (first.coord.x !== second.coord.x || first.coord.y !== second.coord.y) {

    processStep(first, input)
    processStep(second, input)

    loopCoord.push(first.coord)
    if (!loopCoord.some(coord => coord.x === second.coord.x && coord.y === second.coord.y)) {
      loopCoord.push(second.coord)
    }
  }


  let candidates = []

  matrixForEach(input, (___, _, __, x, y) => {
    if (loopCoord.some(coord => coord.x === x && coord.y === y)) {
      return
    }
    const leftIntersections = loopCoord.filter((loop) => y === loop.y && x !== loop.x && loop.x < x)
      .filter((coord) => ['|', 'J', 'L', 'S'].includes(input[coord.y][coord.x]))


    if (leftIntersections.length % 2 !== 0) {
      candidates.push({ x, y })
    }

  })


  return candidates.length
}

run({
  part1: {
    tests: [
      {
        input: `
        .....
        .S-7.
        .|.|.
        .L-J.
        .....`,
        expected: 4,
      },
      {
        input: `
        ..F7.
        .FJ|.
        SJ.L7
        |F--J
        LJ...`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L
`,
        expected: 10,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
