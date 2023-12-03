export interface Coord {
  x: number
  y: number
}


export interface AdiacentType<T> {
  value: T,
  coord: Coord
}