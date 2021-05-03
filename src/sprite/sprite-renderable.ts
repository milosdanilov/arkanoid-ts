import { Positionable } from '../positionable';

export interface SpriteRenderable {
  spriteName: string;
  positionable: Positionable;
}

export const createSpriteRenderable = (
  spriteName: string,
  positionable: Positionable
): SpriteRenderable => ({
  spriteName,
  positionable,
});
