import { createPositionable, Positionable, Point2D } from '../positionable';
import { System } from '../system/system';

import { SpriteDefinition } from '../sprite/sprite-sheet';
import {
  createSpriteRenderable,
  SpriteRenderable,
} from '../sprite/sprite-renderable';

import {
  createSpriteAnimatable,
  SpriteAnimatable,
} from '../sprite/sprite-animatable';

import {
  isOutOfBounds,
  SPRITE_FIELD_HEIGHT,
  SPRITE_FIELD_WIDTH,
} from './field';
import { addVectors } from '../vectors';
import createKeyboardMoveable, { KeyboardMoveable } from '../input/keyboard-moveable';
import createMoveable from '../moveable';

export const VAUS_NORMAL_SPRITE = {
  width: 32,
  height: 8,
  sequenceLength: 6,
  prefix: 'vaus-normal',
};

export const VAUS_DEFAULT_POS = {
  x: (SPRITE_FIELD_WIDTH - VAUS_NORMAL_SPRITE.width) / 2,
  y: SPRITE_FIELD_HEIGHT - 24,
};

export const vausSpriteSheetDefinitions: SpriteDefinition[] = Array.from({
  length: VAUS_NORMAL_SPRITE.sequenceLength,
}).map((_, frame) => ({
  name: `${VAUS_NORMAL_SPRITE.prefix}-${frame}`,
  dimensions: [
    32,
    frame * VAUS_NORMAL_SPRITE.height,
    VAUS_NORMAL_SPRITE.width,
    VAUS_NORMAL_SPRITE.height,
  ],
}));

const createVausBinder = (
  spriteRenderingSystem: System<SpriteRenderable>,
  spriteAnimatableSystem: System<SpriteAnimatable>,
  keyboardMovementSystem: System<KeyboardMoveable>
) => {
  const positionable = createPositionable(
    VAUS_DEFAULT_POS.x,
    VAUS_DEFAULT_POS.y,
    VAUS_NORMAL_SPRITE.width,
    VAUS_NORMAL_SPRITE.height
  );

  const spriteRenderable = createSpriteRenderable(
    `${VAUS_NORMAL_SPRITE.prefix}-0`,
    positionable,
    true
  );

  const spriteAnimatable = createSpriteAnimatable(
    spriteRenderable,
    192,
    VAUS_NORMAL_SPRITE.sequenceLength,
    VAUS_NORMAL_SPRITE.prefix
  );

  const moveable = createMoveable(0, 0, 2, 0);
  const keyboardMoveable = createKeyboardMoveable(positionable, moveable, canMoveTo);

  spriteRenderingSystem.register(spriteRenderable);
  spriteAnimatableSystem.register(spriteAnimatable);
  keyboardMovementSystem.register(keyboardMoveable);
};

export const canMoveTo = (
  currentPositionable: Positionable,
  direction: Point2D
) => {
  const { pos, size } = currentPositionable;

  const target = addVectors(pos, direction);

  return !isOutOfBounds(target, size);
};

export default createVausBinder;
