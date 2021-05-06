import { Point2D } from './positionable';

export interface Moveable {
  direction: Point2D;
  speed: Point2D;
}

const createMoveable = (
  xDir: number,
  yDir: number,
  xSpeed: number,
  ySpeed: number
): Moveable => ({
  direction: [xDir, yDir],
  speed: [xSpeed, ySpeed],
});

export default createMoveable;
