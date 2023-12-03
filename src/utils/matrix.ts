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