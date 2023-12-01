import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n").map((line) => line.trim())

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return input.map(line => {
    return line.split('')
      .map(char => isNaN(+char) ? '' : char)
      .filter(char => char !== '')
  }).map((line) => {
    const first = line.at(0)
    const last = line.at(-1)
    return +`${first}${last ?? last}`
  }).reduce((acc, curr) => acc + curr, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const numbers = {
    one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9
  }

  const result = input.map((line) => {
    let first: number | undefined
    let last: number | undefined

    for (let i = 0; i < line.length; i++) {
      const scan = line.slice(0, i)
      const numberCandidate = Object.entries(numbers)
        .find(([number, digit]) => scan.includes(number) || scan.includes(digit.toString()))
      if (numberCandidate) {
        first = numberCandidate[1]
        break
      }
    }

    for (let i = line.length; i > 0; i--) {
      const scan = line.slice(i)
      const numberCandidate = Object.entries(numbers)
        .find(([number, digit]) => scan.includes(number) || scan.includes(digit.toString()))
      if (numberCandidate) {
        last = numberCandidate[1]
        break
      }
    }

    return `${first ?? last}${last ?? first}`
  })



  return result.reduce((acc, curr) => acc + +curr, 0)
}

run({
  part1: {
    tests: [
      {
        input: `1abc2
         pqr3stu8vwx
         a1b2c3d4e5f
         treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
         eightwothree
         abcone2threexyz
         xtwone3four
         4nineeightseven2
         zoneight234
         7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
