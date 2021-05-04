import { createPositionable } from '../positionable';
import { System } from '../system/system';

import {
  createSpriteRenderable,
  SpriteRenderable,
} from '../sprite/sprite-renderable';

import { SPRITE_FIELD_HEIGHT, SPRITE_FIELD_WIDTH } from './field';

export const SPRITE_VAUS = {
  NORMAL_WIDTH: 32,
  NORMAL_HEIGHT: 8,
};

export const VAUS_DEFAULT_POS = {
  x: (SPRITE_FIELD_WIDTH - SPRITE_VAUS.NORMAL_WIDTH) / 2,
  y: SPRITE_FIELD_HEIGHT - 24,
};

const createVausBinder = (spriteRenderingSystem: System<SpriteRenderable>) => {
  const positionable = createPositionable(
    VAUS_DEFAULT_POS.x,
    VAUS_DEFAULT_POS.y,
    SPRITE_VAUS.NORMAL_WIDTH,
    SPRITE_VAUS.NORMAL_HEIGHT
  );

  const spriteRenderable = createSpriteRenderable(
    'vaus-normal-0',
    positionable
  );

  spriteRenderingSystem.register(spriteRenderable);
};

export default createVausBinder;
