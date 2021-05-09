import { Moveable } from '../moveable';
import { Positionable } from '../positionable';

export interface AutoMoveable {
  positionable: Positionable;
  moveable: Moveable;
}

const createAutoMoveable = (
  positionable: Positionable,
  moveable: Moveable
): AutoMoveable => ({
  positionable,
  moveable,
});

export default createAutoMoveable;
