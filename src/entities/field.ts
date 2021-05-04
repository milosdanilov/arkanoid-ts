import { createPositionable } from '../positionable';
import { System } from '../system/system';

import { SpriteDefinition } from '../sprite/sprite-sheet';

import {
  createSpriteRenderable,
  SpriteRenderable,
} from '../sprite/sprite-renderable';

export const SPRITE_FIELD_WIDTH = 224;
export const SPRITE_FIELD_HEIGHT = 240;

export const fieldSpriteSheetDefinitions: SpriteDefinition[] = [
  {
    name: 'blue-honeycomb-field-0',
    dimensions: [0, 0, SPRITE_FIELD_WIDTH, SPRITE_FIELD_HEIGHT],
  },
  // { name: 'blue-honeycomb-field-1', dimensions: [] },
  // { name: 'green-field-0', dimensions: [] },
  // { name: 'green-field-1', dimensions: [] },
  // { name: 'blue-robotic-field-0', dimensions: [] },
  // { name: 'blue-robotic-field-1', dimensions: [] },
  // { name: 'red-robotic-field-0', dimensions: [] },
  // { name: 'red-robotic-field-1', dimensions: [] },
  // { name: 'doh-field', dimensions: [] },
];

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
