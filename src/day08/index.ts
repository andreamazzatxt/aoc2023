import run from "aocrunner"
import { EMPTY_LINE, NEW_LINE, lcm } from "../utils/index.js"

type Node = {
  L: string,
  R: string
}

const parseInput = (rawInput: string) => {
  const [instructions, _nodes] = rawInput.split(EMPTY_LINE)

  const nodes = _nodes.split(NEW_LINE).reduce((acc, line) => {
    const [node, _directions] = line.split(' = ')

    const [L, R] = _directions.replace(/\(|\)/g, '').split(', ')

    return acc.set(node, { L, R })

  }, new Map<string, Node>())

  return {
    instructions, nodes
  }
}

const part1 = (rawInput: string) => {
  const { instructions, nodes } = parseInput(rawInput)

  const memo = { steps: 0, index: 0, node: 'AAA' }

  while (memo.node !== 'ZZZ') {
    let instruction = instructions.at(memo.index)

    if (!instruction) {
      memo.index = 0
      instruction = instructions.at(memo.index)
    }

    memo.node = nodes.get(memo.node)[instruction]
    memo.index++
    memo.steps++
  }

  return memo.steps
}

const part2 = (rawInput: string) => {
  const { instructions, nodes } = parseInput(rawInput)

  const memo = { steps: 0, index: 0, nodes: [...nodes.keys()].filter(key => key.endsWith('A')) }

  const endedNodes = memo.nodes
    .reduce((acc, _, i) =>
      acc.set(i, undefined), new Map<number, number>())

  while ([...endedNodes.values()].some(v => !v)) {
    memo.nodes.forEach((node, i) => node.endsWith('Z') && endedNodes.set(i, memo.steps))

    let instruction = instructions.at(memo.index)

    if (!instruction) {
      memo.index = 0
      instruction = instructions.at(memo.index)
    }

    memo.nodes = memo.nodes.map(node => nodes.get(node)[instruction])
    memo.index++
    memo.steps++
  }


  return [...endedNodes.values()].reduce(lcm)
}

run({
  part1: {
    tests: [
      {
        input: `
        LLR

        AAA = (BBB, BBB)
        BBB = (AAA, ZZZ)
        ZZZ = (ZZZ, ZZZ)`,
        expected: 6,
      },
      {
        input: `
        RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
