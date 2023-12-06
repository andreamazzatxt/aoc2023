import run from "aocrunner"
import { EMPTY_LINE, NEW_LINE, groupIn, rangeFrom } from "../utils/index.js"

const parseInput = (rawInput: string) => {
  const seeds = rawInput.split(EMPTY_LINE)[0].split(': ')[1].split(' ').filter(n => n !== '').map(Number)
  const maps = rawInput.split(EMPTY_LINE).slice(1).map(
    (map) => {
      const [type, ...rest] = map.split(NEW_LINE)

      return {
        type: type.split(' ')[0],
        ranges: rest.map(line => line.split(' ').filter(n => n !== '').map(Number))
      }

    }
  )




  return { seeds, maps }
}


const getDestination = ([destination, source]: number[], element: number) => {
  return element - source + destination
}

const isInRange = ([_, source, rangeLength]: number[], element: number) =>
  source <= element && element <= source + rangeLength - 1


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)


  const locations = input.seeds.map(seed => {
    let result = seed

    input.maps.map(({ ranges }) => {
      const [filteredRange] = ranges.filter(r => isInRange(r, result))

      result = filteredRange ? getDestination(filteredRange, result) : result
    })
    return result
  })


  return Math.min(...locations)
}


// BRUTE FORCE SOLUTION VERY SLOW (4.3 H) 
const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let minLocation: number

  groupIn(input.seeds, 2).forEach(([start, size], i, a) => {
    console.log('processing: ' + start + ' ' + size, i + 1, '/', a.length)
    for (let seed = start; seed < start + size; seed++) {
      let result = seed

      input.maps.map(({ ranges }) => {
        const [filteredRange] = ranges.filter(r => isInRange(r, result))

        result = filteredRange ? getDestination(filteredRange, result) : result
      })

      minLocation = minLocation === undefined || minLocation > result ? result : minLocation
    }
  })

  return minLocation

}

run({
  part1: {
    tests: [
      {
        input: `
        seeds: 79 14 55 13

        seed-to-soil map:
        50 98 2
        52 50 48
        
        soil-to-fertilizer map:
        0 15 37
        37 52 2
        39 0 15
        
        fertilizer-to-water map:
        49 53 8
        0 11 42
        42 0 7
        57 7 4
        
        water-to-light map:
        88 18 7
        18 25 70
        
        light-to-temperature map:
        45 77 23
        81 45 19
        68 64 13
        
        temperature-to-humidity map:
        0 69 1
        1 0 69
        
        humidity-to-location map:
        60 56 37
        56 93 4`,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        seeds: 79 14 55 13

        seed-to-soil map:
        50 98 2
        52 50 48
        
        soil-to-fertilizer map:
        0 15 37
        37 52 2
        39 0 15
        
        fertilizer-to-water map:
        49 53 8
        0 11 42
        42 0 7
        57 7 4
        
        water-to-light map:
        88 18 7
        18 25 70
        
        light-to-temperature map:
        45 77 23
        81 45 19
        68 64 13
        
        temperature-to-humidity map:
        0 69 1
        1 0 69
        
        humidity-to-location map:
        60 56 37
        56 93 4`,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
