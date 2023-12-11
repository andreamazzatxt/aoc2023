import { range } from "./array.js"
import { AdiacentType, Coord } from "./types.js"

export const adiacents = (a: Coord, b: Coord) => {
  return (
    range(a.x - 1, a.x + 1).includes(b.x) &&
    range(a.y - 1, a.y + 1).includes(b.y)
  )
}


export const getAdiacents = <T>({ x, y }: Coord, matrix: T[][]) => {
  const top: AdiacentType<T> =
    { value: matrix[y - 1]?.[x], coord: { x, y: y - 1 } }
  const bottom: AdiacentType<T> =
    { value: matrix[y + 1]?.[x], coord: { x, y: y + 1 } }
  const left: AdiacentType<T> =
    { value: matrix[y]?.[x - 1], coord: { x: x - 1, y } }
  const right: AdiacentType<T> =
    { value: matrix[y]?.[x + 1], coord: { x: x + 1, y } }
  const topRight: AdiacentType<T> =
    { value: matrix[y - 1]?.[x + 1], coord: { x: x + 1, y: y - 1 } }
  const topLeft: AdiacentType<T> =
    { value: matrix[y - 1]?.[x - 1], coord: { x: x - 1, y: y - 1 } }
  const bottomRight: AdiacentType<T> =
    { value: matrix[y + 1]?.[x + 1], coord: { x: x + 1, y: y + 1 } }
  const bottomLeft: AdiacentType<T> =
    { value: matrix[y + 1]?.[x - 1], coord: { x: x - 1, y: y + 1 } }

  return { top, bottom, left, right, topRight, topLeft, bottomRight, bottomLeft }
}

export const matrixSearch = <T>(lookup: T, matrix: T[][]) => {
  let result: Coord[] = []
  matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === lookup) {
        result.push({ x, y })
      }
    })
  })
  return result
}

export const matrixForEach = <T>(
  matrix: T[][],
  callback: (cell: T, row: T[], column: T[], x: number, y: number) => void,
) => {
  range(0, matrix.length - 1).forEach((y) => {
    const row = matrix[y]
    range(0, row.length - 1).forEach((x) => {
      const column = matrix.map((l) => l[x])
      const cell = matrix[y][x]
      callback(cell, row, column, x, y)
    })
  })
}


export const manhattan = (a: Coord, b: Coord) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y)