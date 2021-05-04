import { Positionable } from '../positionable';

export interface SpriteRenderable {
  spriteName: string;
  positionable: Positionable;
  hasShadow: boolean;
}

export const createSpriteRenderable = (
  spriteName: string,
  positionable: Positionable,
  hasShadow: boolean = false
): SpriteRenderable => ({
  spriteName,
  positionable,
  hasShadow,
});
