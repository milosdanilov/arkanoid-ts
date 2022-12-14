import createSpriteSheet from './sprite/sprite-sheet';
import createSpriteRenderSystem from './rendering/sprite-rendering-system';
import spriteAnimationSystem from './rendering/sprite-animation-system';
import bindField, { fieldSpriteSheetDefinitions } from './entities/field';
import bindVaus, { vausSpriteSheetDefinitions } from './entities/vaus';
import { blockSpriteSheetDefinitions } from './entities/blocks/block';
import bindBlocks from './entities/blocks/blocks';
import createKeyboard from './input/keyboard';
import createKeyboardMovementSystem from './input/keyboard-movement-system';
import bindBall, { ballSpriteSheetDefinition } from './entities/ball';
import autoMovementSystem from './movement/auto-movement-system';
import collisionSystem from './collision/collision-system';

const canvas = document.body.querySelector<HTMLCanvasElement>('#game');

if (!canvas) {
  throw new Error('Game canvas could not be found in the DOM!');
}

const context = canvas.getContext('2d');

if (!context) {
  throw new Error('Canvas context does not exist!');
}

const loadSpriteSheet = (srcPath: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const sheet = new Image();
    sheet.onload = () => resolve(sheet);
    sheet.onerror = reject;
    sheet.src = srcPath;
  });
};

context.imageSmoothingEnabled = false;

(async () => {
  const fieldSpriteSheet = await loadSpriteSheet(
    './assets/fields.png'
  ).then((sprite) => createSpriteSheet(sprite, fieldSpriteSheetDefinitions));

  const vausSpriteSheet = await loadSpriteSheet(
    './assets/vaus.png'
  ).then((sprite) =>
    createSpriteSheet(sprite, [
      ...vausSpriteSheetDefinitions,
      ballSpriteSheetDefinition,
    ])
  );

  const blockSpriteSheet = await loadSpriteSheet(
    './assets/blocks.png'
  ).then((sprite) => createSpriteSheet(sprite, blockSpriteSheetDefinitions));

  const spriteSheet = new Map([
    ...fieldSpriteSheet.entries(),
    ...vausSpriteSheet.entries(),
    ...blockSpriteSheet.entries(),
  ]);

  const spriteRenderSystem = createSpriteRenderSystem(context, spriteSheet);

  const keyboard = createKeyboard(window, ['ArrowLeft', 'ArrowRight']);
  const keyboardMovementSystem = createKeyboardMovementSystem(keyboard);

  bindField(spriteRenderSystem);
  const blocksPositionables = bindBlocks(spriteRenderSystem);

  const [vausPositionable] = bindVaus(
    spriteRenderSystem,
    spriteAnimationSystem,
    keyboardMovementSystem
  );

  bindBall(spriteRenderSystem, autoMovementSystem, collisionSystem, [
    {
      name: 'vaus',
      positionable: vausPositionable,
    },
    {
      name: 'field',
    },
    {
      name: 'blocks',
      positionable: blocksPositionables.reduce((acc, curr) => acc.concat(curr), [])
    },
  ]);

  const loop = (time: number) => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    spriteRenderSystem.update(time);
    spriteAnimationSystem.update(time);
    keyboardMovementSystem.update(time);
    autoMovementSystem.update(time);
    collisionSystem.update(time);

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
})();
