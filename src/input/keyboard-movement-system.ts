import { Point2D } from '../positionable';
import createSystem from '../system/system';
import { addVectors, multiplyVectors } from '../vectors';

import { Keyboard } from './keyboard';
import { KeyboardMoveable } from './keyboard-moveable';

const getDirection = (keyboard: Keyboard): Point2D => {
  switch (keyboard.getLastPressedKey()) {
    case 'ArrowLeft':
      return [-1, 0];

    case 'ArrowRight':
      return [1, 0];

    default:
      return [0, 0];
  }
};

const createKeyboardMovementSystem = (keyboard: Keyboard) => (
  component: KeyboardMoveable
) => {
  const direction = getDirection(keyboard);

  component.moveable.direction = component.canMoveTo(
    component.positionable,
    direction
  )
    ? direction
    : [0, 0];

  component.positionable.pos = addVectors(
    component.positionable.pos,
    multiplyVectors(component.moveable.direction, component.moveable.speed)
  );
};

export default (keyboard: Keyboard) =>
  createSystem(createKeyboardMovementSystem(keyboard));
