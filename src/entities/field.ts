import { createPositionable } from '../positionable';
import { System } from '../system/system';

import {
  createSpriteRenderable,
  SpriteRenderable,
} from '../sprite/sprite-renderable';

const createFieldBinder = (
  spriteRenderingSystem: System<SpriteRenderable>
) => {
  const positionable = createPositionable(0, 0, 224, 240);

  const spriteRenderable = createSpriteRenderable(
    'blue-honeycomb-field-0',
    positionable
  );

  spriteRenderingSystem.register(spriteRenderable);
};

export default createFieldBinder;