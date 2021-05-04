import { SpriteRenderable } from './sprite-renderable';

export interface SpriteAnimatable {
  spriteRenderable: SpriteRenderable;
  frame: number;
  frameRateMs: number;
  sequenceLength: number;
  spritePrefix: string;
}

export const createSpriteAnimatable = (
  spriteRenderable: SpriteRenderable,
  frameRateMs: number,
  sequenceLength: number,
  spritePrefix: string
): SpriteAnimatable => ({
  spriteRenderable,
  frame: 0,
  frameRateMs,
  sequenceLength,
  spritePrefix,
});