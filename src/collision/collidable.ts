import { Moveable } from '../moveable';
import { Positionable } from '../positionable';

interface CanCollideWithVaus {
  name: 'vaus';
  positionable: Positionable;
}

interface CanCollideWithField {
  name: 'field';
}

interface CanCollideWithBlocks {
  name: 'blocks';
  positionable: Positionable[];
}

export type CanCollideWith =
  | CanCollideWithVaus
  | CanCollideWithField
  | CanCollideWithBlocks;

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
