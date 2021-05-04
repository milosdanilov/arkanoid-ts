import { createPositionable } from '../positionable';
import { System } from '../system/system';

import {
  createSpriteRenderable,
  SpriteRenderable,
} from '../sprite/sprite-renderable';

export const SPRITE_FIELD_WIDTH = 224;
export const SPRITE_FIELD_HEIGHT = 240;

const createFieldBinder = (spriteRenderingSystem: System<SpriteRenderable>) => {
  const positionable = createPositionable(
    0,
    0,
    SPRITE_FIELD_WIDTH,
    SPRITE_FIELD_HEIGHT
  );

  const spriteRenderable = createSpriteRenderable(
    'blue-honeycomb-field-0',
    positionable
  );

  spriteRenderingSystem.register(spriteRenderable);
};

export default createFieldBinder;
