import { createPositionable, Point2D } from '../positionable';
import { System } from '../system/system';

import { SpriteDefinition } from '../sprite/sprite-sheet';

import {
  createSpriteRenderable,
  SpriteRenderable,
} from '../sprite/sprite-renderable';

export const SPRITE_FIELD_WIDTH = 224;
export const SPRITE_FIELD_HEIGHT = 240;

export const SPRITE_FIELD_OFFSET_BOUND = 8;
export const SPRITE_FIELD_RIGHT_BOUND = 216;
export const SPRITE_FIELD_UPPER_BOUND = 8;

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

export const isOutOfBounds = (target: Point2D, size: Point2D) => {
  return isOutOfBoundsX(target, size) && isOutOfBoundsY(target, size);
};

export const isOutOfBoundsX = (target: Point2D, size: Point2D) => {
  const [xPoint, _yPoint] = target;
  const [width, _height] = size;

  return (
    xPoint < SPRITE_FIELD_OFFSET_BOUND ||
    xPoint > SPRITE_FIELD_RIGHT_BOUND ||
    xPoint + width > SPRITE_FIELD_RIGHT_BOUND
  );
};

export const isOutOfBoundsY = (target: Point2D, size: Point2D) => {
  const [_xPoint, yPoint] = target;
  const [_width, _height] = size;

  return yPoint < SPRITE_FIELD_UPPER_BOUND;
};

export default createFieldBinder;
