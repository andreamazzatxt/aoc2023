import run from "aocrunner"

type Game = {
  game: number,
  grabs: { color: string, count: number }[][]
}

const parseInput = (rawInput: string): Game[] => rawInput
  .split("\n")
  .map((line) => {
    const game = +line.split(': ')[0].split(' ')[1]
    const grabs = line.split(': ')[1].split('; ')
      .map((set) =>
        set
          .split(', ')
          .map((cubes) => {
            const color = cubes.split(' ')[1]
            const count = +cubes.split(' ')[0]
            return { color, count }
          })
      )
    return { game, grabs }
  })



const isValidGame = (game: Game) =>
  game.grabs.
    every((set) => set
      .every((cube) => {
        switch (cube.color) {
          case 'red':
            return cube.count <= 12
          case 'blue':
            return cube.count <= 14
          case 'green':
            return cube.count <= 13
        }
      }))


const getHighestGrabs = (game: Game) => {
  let red: number, blue: number, green: number

  game.grabs.forEach((grab) => {
    grab.forEach(({ color, count }) => {
      switch (color) {
        case 'red':
          red = (red !== undefined && red > count) ? red : count
          break
        case 'blue':
          blue = (blue !== undefined && blue > count) ? blue : count
          break
        case 'green':
          green = (green !== undefined && green > count) ? green : count
          break
      }
    })
  })

  return { red, blue, green }
}


const part1 = (rawInput: string) =>
  parseInput(rawInput)
    .filter(isValidGame)
    .reduce((acc, { game }) => acc + game, 0)





const part2 = (rawInput: string) =>
  parseInput(rawInput)
    .map(getHighestGrabs)
    .reduce((acc, { red, blue, green }) => acc + (red * blue * green), 0)


run({
  part1: {
    tests: [
      {
        input: `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
