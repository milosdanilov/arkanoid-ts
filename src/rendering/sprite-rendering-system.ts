import { SpriteRenderable } from '../sprite/sprite-renderable';
import { SpriteSheet } from '../sprite/sprite-sheet';

import createSystem from '../system/system';

const createSpriteRendering = (
  context: CanvasRenderingContext2D,
  spriteSheet: SpriteSheet
) => (component: SpriteRenderable) => {
  const sprite = spriteSheet.get(component.spriteName);

  if (!sprite) {
    throw new Error(`Sprite ${component.spriteName} not found!`);
  }

  const [x, y] = component.positionable.pos;
  const [w, h] = component.positionable.size;

  context.restore();

  if (component.hasShadow) {
    context.save();
    context.shadowColor = '#000';
    context.shadowBlur = 0;
    context.shadowOffsetX = 4;
    context.shadowOffsetY = 4;
  }

  context.drawImage(sprite, x, y, w, h);
};

export default (
  context: CanvasRenderingContext2D,
  spriteSheet: SpriteSheet
) => {
  return createSystem(createSpriteRendering(context, spriteSheet));
};
