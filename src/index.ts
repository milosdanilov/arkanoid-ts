import createSpriteSheet from './sprite/sprite-sheet';
import createSpriteRenderSystem from './rendering/sprite-rendering-system';
import spriteAnimationSystem from './rendering/sprite-animation-system';
import bindField, { fieldSpriteSheetDefinitions } from './entities/field';
import bindVaus, { vausSpriteSheetDefinitions } from './entities/vaus';
import { blockSpriteSheetDefinitions } from './entities/blocks/block';
import bindBlocks from './entities/blocks/blocks';

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
  ).then((sprite) => createSpriteSheet(sprite, vausSpriteSheetDefinitions));

  const blockSpriteSheet = await loadSpriteSheet(
    './assets/blocks.png'
  ).then((sprite) => createSpriteSheet(sprite, blockSpriteSheetDefinitions));

  const spriteSheet = new Map([
    ...fieldSpriteSheet.entries(),
    ...vausSpriteSheet.entries(),
    ...blockSpriteSheet.entries(),
  ]);

  const spriteRenderSystem = createSpriteRenderSystem(context, spriteSheet);

  bindField(spriteRenderSystem);
  bindVaus(spriteRenderSystem, spriteAnimationSystem);
  bindBlocks(spriteRenderSystem);

  const loop = (time: number) => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    spriteRenderSystem.update(time);
    spriteAnimationSystem.update(time);

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
})();
