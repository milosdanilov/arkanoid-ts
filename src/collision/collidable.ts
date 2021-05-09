import { Moveable } from '../moveable';
import { Positionable } from '../positionable';

type CanCollideWithName = 'vaus' | 'field';

export interface CanCollideWith {
  name: CanCollideWithName;
  positionable: Positionable;
}

export type CheckCollision = (
  positionable: Positionable,
  moveable: Moveable
) => void;

export interface Collidable {
  positionable: Positionable;
  moveable: Moveable;
  checkCollision: CheckCollision;
}

const createCollidable = (
  positionable: Positionable,
  moveable: Moveable,
  checkCollision: CheckCollision
): Collidable => ({
  positionable,
  moveable,
  checkCollision,
});

export default createCollidable;
