import { createPositionable } from '../positionable';
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

import { SPRITE_FIELD_HEIGHT, SPRITE_FIELD_WIDTH } from './field';

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
  spriteAnimatableSystem: System<SpriteAnimatable>
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

  spriteRenderingSystem.register(spriteRenderable);
  spriteAnimatableSystem.register(spriteAnimatable);
};

export default createVausBinder;
