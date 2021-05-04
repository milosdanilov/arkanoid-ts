import { SpriteAnimatable } from '../sprite/sprite-animatable';
import createSystem from '../system/system';

const createSpriteAnimationSystem = () => {
  let lastFrameTimeMs = 0;

  return (spriteAnimatable: SpriteAnimatable, time: number) => {
    const isLastFrame = () => {
      return spriteAnimatable.frame === spriteAnimatable.sequenceLength - 1;
    };

    const advanceFrame = () => {
      spriteAnimatable.frame = isLastFrame() ? 0 : spriteAnimatable.frame + 1;
      spriteAnimatable.spriteRenderable.spriteName = `${spriteAnimatable.spritePrefix}-${spriteAnimatable.frame}`;
    };

    if (time - lastFrameTimeMs > spriteAnimatable.frameRateMs) {
      advanceFrame();
      lastFrameTimeMs = time;
    }
  };
};

export default createSystem(createSpriteAnimationSystem());
