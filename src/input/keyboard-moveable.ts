import { Moveable } from '../moveable';
import { Point2D, Positionable } from '../positionable';

export type CanMoveTo = (
  currentPositionable: Positionable,
  direction: Point2D
) => boolean;

export interface KeyboardMoveable {
  positionable: Positionable;
  moveable: Moveable;
  canMoveTo: CanMoveTo;
}

const createKeyboardMoveable = (
  positionable: Positionable,
  moveable: Moveable,
  canMoveTo: CanMoveTo
): KeyboardMoveable => ({
  positionable,
  moveable,
  canMoveTo,
});

export default createKeyboardMoveable;
