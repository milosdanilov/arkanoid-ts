export type Point2D = [number, number];

export interface Positionable {
  pos: Point2D;
  size: Point2D;
}

export const createPositionable = (
  x: number,
  y: number,
  width: number,
  height: number
): Positionable => ({
  pos: [x, y],
  size: [width, height],
});
