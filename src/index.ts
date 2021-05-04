import createSpriteSheet from './sprite/sprite-sheet';
import createSpriteRenderSystem from './rendering/sprite-rendering-system';
import bindField from './entities/field';
import bindVaus from './entities/vaus';

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
  const fieldSprites = await loadSpriteSheet('./assets/fields.png');

  const fieldSpriteSheet = await createSpriteSheet(fieldSprites, [
    { name: 'blue-honeycomb-field-0', dimensions: [0, 0, 224, 240] },
    // { name: 'blue-honeycomb-field-1', dimensions: [] },
    // { name: 'green-field-0', dimensions: [] },
    // { name: 'green-field-1', dimensions: [] },
    // { name: 'blue-robotic-field-0', dimensions: [] },
    // { name: 'blue-robotic-field-1', dimensions: [] },
    // { name: 'red-robotic-field-0', dimensions: [] },
    // { name: 'red-robotic-field-1', dimensions: [] },
    // { name: 'doh-field', dimensions: [] },
  ]);

  const vausSprites = await loadSpriteSheet('./assets/vaus.png');

  const vausSpriteSheet = await createSpriteSheet(vausSprites, [
    { name: 'vaus-normal-0', dimensions: [32, 8, 32, 8] },
  ]);

  const spriteSheet = new Map([
    ...fieldSpriteSheet.entries(),
    ...vausSpriteSheet.entries(),
  ]);

  const spriteRenderSystem = createSpriteRenderSystem(context, spriteSheet);

  bindField(spriteRenderSystem);
  bindVaus(spriteRenderSystem);

  const loop = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    spriteRenderSystem.update();

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
})();
